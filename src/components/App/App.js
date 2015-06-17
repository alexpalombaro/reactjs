/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import './App.scss';
import React, { PropTypes } from 'react';
import invariant from 'react/lib/invariant';
import AppStore from '../../stores/AppStore';
import setViewport from './setViewport';

import { Link } from 'react-router';

class App {

    constructor() {
    }

    static propTypes = {
        path: PropTypes.string.isRequired,
        viewport: PropTypes.object.isRequired,
        onSetTitle: PropTypes.func.isRequired,
        onSetMeta: PropTypes.func.isRequired,
        onPageNotFound: PropTypes.func.isRequired
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    shouldComponentUpdate(nextProps) {
        return this.props.path !== nextProps.path ||
            this.props.viewport !== nextProps.viewport;
    }

    render() {
        //var page = AppStore.getPage(this.props.path);
        //invariant(page !== undefined, 'Failed to load page content.');
        //this.props.onSetTitle(page.title);
        //
        //if (page.type === 'notfound') {
        //    this.props.onPageNotFound();
        //    return React.createElement(NotFoundPage, page);
        //}
        return (
            <div className="App">
                <h1>Hello React Router</h1>
                <div className="links">
                    <Link to="about">About</Link>
                    <Link to="info">Info</Link>
                </div>
            </div>
        );
    }
}


export default setViewport(App);
