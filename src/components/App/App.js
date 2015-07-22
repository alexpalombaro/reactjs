import './App.scss';
import React, { PropTypes } from 'react';

import { RouteHandler } from 'react-router';

import Header from '../Header'; //eslint-disable-line no-unused-vars
import Navbar from '../Navbar';

import AppStore from '../../stores/AppStore.js';

//
// Component Class
// -----------------------------------------------------------------------------

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navHidden: false,
            navHeight: 0
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

    render() {
        var styles = {
            marginTop: (this.state.navHeight + 15) + 'px'
        };

        return (
            <div className="App">
                <Navbar ref="nav" hidden={this.state.navHidden}/>

                <div className="content" style={styles}>
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
        var totalY = AppStore.getScrollTotal('y');
        if (this.state.navHidden && totalY < -80) {
            this.setState({navHidden: false});
        } else if (!this.state.navHidden && totalY > 120) {
            this.setState({navHidden: true});
        }

        var navHeight = React.findDOMNode(this.refs.nav).firstChild.clientHeight;
        if (this.state.navHeight !== navHeight) {
            this.setState({navHeight});
        }
    }

}

export default App;
