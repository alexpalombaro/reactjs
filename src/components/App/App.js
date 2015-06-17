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
                    <Link to="about" className="btn">About</Link>
                    <Link to="info" className="btn">Info</Link>
                </div>
                <RouteHandler/>
            </div>
        );
    }
}

export default App;
