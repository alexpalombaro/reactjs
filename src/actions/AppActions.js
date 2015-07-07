import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

import { canUseDOM } from 'react/lib/ExecutionEnvironment';

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
    },

    loadPage(path, cb) {

        if (canUseDOM && path !== '/') {
            var req = new XMLHttpRequest();
            new Promise((resolve) => {
                req.onload = resolve;
                req.open('get', '/page' + path, true);
                req.send();
            }).then(() => {
                console.log(req.responseText);
                var resp = JSON.parse(req.responseText);
                Dispatcher.handleAppAction({
                    actionType: ActionTypes.LOAD_PAGE,
                    path: resp.page.path,
                    page: resp.page
                });
                if (cb) {
                    cb();
                }
            }).catch((err) => console.error(err));
        }
    }

};
