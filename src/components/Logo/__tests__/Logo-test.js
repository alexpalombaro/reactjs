/* globals describe, it, expect */

import Logo from '../Logo.js';

var helloWorld = function () {
    return 'Hello world!';
};

describe('Hello world', () => {
    it('says hello', () => {
        expect(helloWorld()).toEqual('Hello world!');
    });
});
