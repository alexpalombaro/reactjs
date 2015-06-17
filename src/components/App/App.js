import './App.scss';
import React, { PropTypes } from 'react';

import { RouteHandler, Link } from 'react-router';

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
            <div className="App">
                <h1>Hello React Router</h1>
                <div className="links">
                    <Link to="about">About</Link>
                    <Link to="info">Info</Link>
                </div>
                <RouteHandler/>
            </div>
        );
    }
}

export default App;
