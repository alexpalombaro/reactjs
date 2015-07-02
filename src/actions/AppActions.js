import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {

    pageScroll() {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.SCROLL_PAGE,
            scrollX: window.pageXOffset,
            scrollY: window.pageYOffset
        });
    },

    resize() {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.RESIZE,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

};
