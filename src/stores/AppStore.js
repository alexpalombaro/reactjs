import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

var CHANGE_EVENT = 'change';

var pages = {};
var loading = false;
var scroll = {x: 0, y: 0};

var AppStore = assign({}, EventEmitter.prototype, {

    isLoading() {
        return loading;
    },

    getPage(path) {
        return path in pages ? pages[path] : {
            title: 'Page Not Found',
            type: 'notfound'
        };
    },

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
     * @param axis can specify 'x' or 'y'
     */
    getScroll(axis) {
        return axis === 'x' ? scroll.x :
            axis === 'y' ? scroll.y : scroll;
    }

});

AppStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.LOAD_PAGE:
            if (action.source === PayloadSources.VIEW_ACTION) {
                loading = true;
            } else {
                loading = false;
                if (!action.err) {
                    pages[action.path] = action.page;
                }
            }
            AppStore.emitChange();
            break;

        case ActionTypes.SCROLL_PAGE:
            scroll.x = action.scrollX;
            scroll.y = action.scrollY;
            AppStore.emitChange();
            break;

        default:
        // Do nothing

    }

});

export default AppStore;
