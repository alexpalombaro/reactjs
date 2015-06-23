import React from 'react';
import { Route, NotFoundRoute, DefaultRoute } from 'react-router';
import App from '../components/App';
import About from '../components/About';
import Info from '../components/Info';
import NotFoundPage from '../components/NotFoundPage';

const routes = (
    <Route handler={App}>
        <DefaultRoute name="home" handler={About}/>
        <Route name="about" handler={About}/>
        <Route name="info" handler={Info}/>
        <NotFoundRoute handler={NotFoundPage}/>
    </Route>
);

export default routes;
