import React from 'react';
import { Route, NotFoundRoute, DefaultRoute } from 'react-router';
import App from '../components/App';
import NotFoundPage from '../components/NotFoundPage';
import About from '../components/About';
import Project from '../components/Project';

const routes = (
    <Route handler={App}>
        <DefaultRoute name="home" handler={About}/>
        <Route name="about" handler={About}/>
        <Route name="project" path="/:projectId" handler={Project}/>
        <NotFoundRoute handler={NotFoundPage}/>
    </Route>
);

export default routes;
