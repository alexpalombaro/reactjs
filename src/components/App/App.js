import './App.scss';
import React, { PropTypes } from 'react';

import { RouteHandler } from 'react-router';
import Header from '../Header';
import Navbar from '../Navbar';

class App {

    constructor() {

    }

    static propTypes = {
        onSetTitle: PropTypes.func.isRequired,
        onSetMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="App container">
                <Navbar/>
                <Header/>
                <RouteHandler/>
            </div>
        );
    }
}

export default App;
