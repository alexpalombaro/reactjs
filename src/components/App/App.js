import './App.scss';
import React, { PropTypes } from 'react';

import { RouteHandler } from 'react-router';

import Header from '../Header'; //eslint-disable-line no-unused-vars
import Navbar from '../Navbar';

import AppStore from '../../stores/AppStore.js';

import _ from 'lodash';

//
// Component Class
// -----------------------------------------------------------------------------

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navHidden: false,
            navFixedToTop: false
        };

        this._appStoreChangeHandler = this._appStoreChangeHandler.bind(this);
    }

    static propTypes = {
        onSetTitle: PropTypes.func.isRequired,
        onSetMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
        AppStore.onChange(this._appStoreChangeHandler);
        this._appStoreChangeHandler();
    }

    componentWillUnmount() {
        AppStore.offChange(this._appStoreChangeHandler);
    }

    shouldComponentUpdate(props, state) {
        return !_.matches(this.state, state);
    }

    render() {
        return (
            <div className="App">
                <Navbar ref="nav" hidden={this.state.navHidden} fixedToTop={this.state.navFixedToTop}/>

                <div className="content">
                    <RouteHandler/>
                </div>
            </div>
        );
    }

    //
    // Event Handlers
    // -----------------------------------------------------------------------------

    /**
     * Triggered on AppStore change
     * @private
     */
    _appStoreChangeHandler() {
        var navHeight = React.findDOMNode(this.refs.nav).firstChild.clientHeight;
        if (AppStore.getScroll('y') > navHeight && AppStore.getScrollTotal('y') < -80) {
            this.setState({navHidden: false, navFixedToTop: true});
        } else {
            this.setState({navHidden: false, navFixedToTop: false});
        }

    }

}

export default App;
