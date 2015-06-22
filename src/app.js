import 'babel/polyfill';

import React from 'react/addons';
import FastClick from 'fastclick';
import AppActions from './actions/AppActions';

import Router from 'react-router';
import routes from './routes';

let path = decodeURI(window.location.pathname);
let setMetaTag = (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    let elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
        if (element.getAttribute('name') === name) {
            element.parentNode.removeChild(element);
        }
    });
    let meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
};

function run() {
    // Render the top-level React component
    let props = {
        onSetTitle: (title) => document.title = title,
        onSetMeta: setMetaTag
    };

    Router.run(routes, Router.HistoryLocation, (Root) => {
        React.render(<Root {...props}/>, document.getElementById('AppContainer'));
    });
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
    new Promise((resolve) => {
        if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', resolve);
        } else {
            window.attachEvent('onload', resolve);
        }
    }).then(() => {
        FastClick.attach(document.body);
        window.addEventListener('scroll', AppActions.pageScroll);
        AppActions.pageScroll(); // update on load
    }),
    new Promise((resolve) => AppActions.loadPage(path, resolve))
]).then(run);
