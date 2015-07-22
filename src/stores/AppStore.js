import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';

//
// Properties
// -----------------------------------------------------------------------------

var CHANGE_EVENT = 'change';

var scrollX = 0;
var scrollY = 0;
var scrollTotalX = 0;
var scrollTotalY = 0;
var width = 1024;
var height = 768;
var pages = {};

//
// Public Model
// -----------------------------------------------------------------------------

var AppStore = Object.assign({}, EventEmitter.prototype, {

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
     * Get the current total scroll value
     * @param {String} [axis] 'x' or 'y'
     * @return {Object|Number} Object with x, y properties or value of x/y
     */
    getScrollTotal(axis) {
        return axis === 'x' ? scrollTotalX :
            axis === 'y' ? scrollTotalY : {x: scrollTotalX, y: scrollTotalY};
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

/**
 *
 * @param current
 * @param updated
 * @param total
 * @returns {number}
 */
var updateScroll = function (current, updated, total) {
    if (updated > current && total > -1) {
        return total + updated - current;
    }

    if (updated < current && total < 1) {
        return total - (current - updated);
    }

    return 0;
};

//
// Action handler
// -----------------------------------------------------------------------------

AppStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.SCROLL_PAGE:
            scrollTotalX = updateScroll(scrollX, action.scrollX, scrollTotalX);
            scrollTotalY = updateScroll(scrollY, action.scrollY, scrollTotalY);
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
            pages = Object.assign(pages, action.data.pages);
            AppStore.emitChange();
            break;

        default:
        // Do nothing

    }

});

export default AppStore;
