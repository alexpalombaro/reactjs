import React from 'react';
import {Route} from 'react-router';
import App from '../components/App';
import About from '../components/About';
import Info from '../components/Info';

const routes = (
    <Route handler={App}>
        <Route path="about" handler={About}/>
        <Route path="info" handler={Info}/>
    </Route>
);

export default routes;
