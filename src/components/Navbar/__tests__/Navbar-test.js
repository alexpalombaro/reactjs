/* globals describe, it, expect */

import Navbar from '../Navbar.js';
import React from 'react/addons';
import jsdom from 'jsdom';

var TestUtils = React.addons.TestUtils;

describe('Navbar', () => {
    it('create DOM element', () => {
        var navbar = TestUtils.renderIntoDocument(<Navbar/>);
    });
});
