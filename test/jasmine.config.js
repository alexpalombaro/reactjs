/*eslint-disable camelcase*/

var path = require('path');

console.log(path.resolve(__dirname, '../test'));

module.exports = {
    spec_dir: path.resolve(__dirname, '../test'),
    spec_files: ['temp.js']
    //spec_dir: '../src'
    //spec_files: ['**/__tests__/*.js']
};
