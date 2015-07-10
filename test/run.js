var Jasmine = require('jasmine');

var test = new Jasmine();

test.loadConfig(require('./jasmine.config'));

test.execute();

