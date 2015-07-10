import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

//
// Properties
// -----------------------------------------------------------------------------

var CHANGE_EVENT = 'change';

var scrollX = 0;
var scrollY = 0;
var width = 1024;
var height = 768;
var pages = {};

//
// Public Model
// -----------------------------------------------------------------------------

var AppStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        return this.emit(CHANGE_EVENT);
    },

    onChange(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    offChange(callback) {
        this.off(CHANGE_EVENT, callback);
    },

    /**
     * Get the current window scroll position
     * @param {String} [axis] 'x' or 'y'
     * @return {Object|Number} Object with x, y properties or value of x/y
     */
    getScroll(axis) {
        return axis === 'x' ? scrollX :
            axis === 'y' ? scrollY : {x: scrollX, y: scrollY};
    },

    /**
     * Get the current window size
     * @return {Object} Object with width height properties
     */
    getSize() {
        return {width, height};
    },

    /**
     * Get page html content
     * @return {String} Html string
     */
    getPage(path) {
        return path in pages ? pages[path] :
            path === '*' ? pages : null;
    }

});

AppStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.SCROLL_PAGE:
            scrollX = action.scrollX;
            scrollY = action.scrollY;
            AppStore.emitChange();
            break;

        case ActionTypes.RESIZE:
            width = action.width;
            height = action.height;
            AppStore.emitChange();
            break;

        case ActionTypes.LOAD_PAGE:
            pages[action.path] = action.page;
            AppStore.emitChange();
            break;

        case ActionTypes.APP_DATA:
            pages = assign(pages, action.data.pages);
            AppStore.emitChange();
            break;

        default:
        // Do nothing

    }

});

export default AppStore;
