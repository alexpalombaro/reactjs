/*eslint-disable strict*/
'use strict';


module.exports = function (gulp) {

    gulp.task('add-component', function (cb) {

        var prompt = require('prompt');
        var replace = require('gulp-replace');
        var fs = require('fs');

        prompt.start();
        prompt.message = prompt.delimiter = '';
        prompt.get({
            name: 'fileName',
            required: true,
            message: 'Name must not include special chars or spaces and begin with a capital letter',
            description: 'Component name:',
            pattern: /^[A-Z]\w+$/
        }, function (err, result) {
            if (err) {
                return console.log(err);
            }

            var name = result.fileName;
            var dir = './src/components/' + name;
            var files = fs.readdir(dir, function (err, files) {
                if (err) {

                }
            });

            console.log(files);

            /*
            gulp.src('./gulp_tasks/templates/components/!*')
                .pipe(replace(/\$\{name}/g, name))
                .pipe(gulp.dest('./src/components/' + name));
            cb();
*/
        });

    });
};
