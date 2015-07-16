/*eslint-disable strict*/
'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

// Settings
var RELEASE = !!argv.release;                 // Minimize and optimize during a build?
var AUTOPREFIXER_BROWSERS = [                 // https://github.com/ai/autoprefixer
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

var src = {};
var watch = false;
var browserSync;

//
// Util
// -----------------------------------------------------------------------------

// The default task
gulp.task('default', ['sync']);

// Clean output directory
gulp.task('clean', del.bind(
    null, ['.tmp', 'build/*', 'build-test/*'], {dot: true}
));

// 3rd party libraries
gulp.task('vendor-font', function () {
    return gulp.src('node_modules/bootstrap-sass/assets/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('vendor-js', function () {
    return gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('build/js'));
});

gulp.task('vendor', ['vendor-font', 'vendor-js'], $.util.noop);

// Static files
gulp.task('assets', function () {
    src.assets = [
        'src/assets/*.*',
        'src/content*/**/*.*',
        'src/templates*/**/*.*'
    ];
    return gulp.src(src.assets)
        .pipe($.changed('build'))
        .pipe(gulp.dest('build'))
        .pipe($.size({title: 'assets'}));
});

// CSS style sheets
gulp.task('styles', function () {
    src.styles = 'src/styles/**/*.{css,scss}';
    return gulp.src('src/styles/styles.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .on('error', console.error.bind(console))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.csscomb())
        .pipe($.if(RELEASE, $.minifyCss()))
        .pipe(gulp.dest('build/css'))
        .pipe($.size({title: 'styles'}));
});

//
// Webpack bundle
// -----------------------------------------------------------------------------

var started = false;
var config = require('./webpack.config.js');
var bundleCallback = function (err, stats, cb) {
    if (err) {
        throw new $.util.PluginError('webpack', err);
    }

    if (argv.verbose) {
        $.util.log('[webpack]', stats.toString({colors: true}));
    }

    if (!started) {
        started = true;
        return cb();
    }
};

// Bundle build
gulp.task('bundle', function (cb) {
    var bundler = webpack(config.build);

    if (watch) {
        bundler.watch(200, function (err, stats) {
            bundleCallback(err, stats, cb);
        });
    } else {
        bundler.run(function (err, stats) {
            bundleCallback(err, stats, cb);
        });
    }
});

// Bundle test
gulp.task('bundle:test', function (cb) {
    var bundler = webpack(config.test);
    bundler.run(function (err, stats) {
        bundleCallback(err, stats, cb);
    });
});

//
// Testing
// -----------------------------------------------------------------------------
gulp.task('test', ['bundle:test'], function () {
    var Jasmine = require('jasmine');
    var instance = new Jasmine();
    instance.loadConfig({
        spec_dir: 'build-test', //eslint-disable-line camelcase
        spec_files: ['tests.js'] //eslint-disable-line camelcase
    });
    instance.execute();
});

//
// Build sequences
// -----------------------------------------------------------------------------

// Build the app from source code
gulp.task('build', ['clean'], function (cb) {
    runSequence(['vendor', 'assets', 'styles', 'bundle'], cb);
});

// Build and start watching for modifications
gulp.task('build:watch', function (cb) {
    watch = true;
    runSequence('build', function () {
        gulp.watch(src.assets, ['assets']);
        gulp.watch(src.styles, ['styles']);
        cb();
    });
});

//
// Server
// -----------------------------------------------------------------------------

// Launch a Node.js/Express server
gulp.task('serve', ['build:watch'], function (cb) {
    src.server = [
        'build/server.js',
        'build/content/**/*',
        'build/templates/**/*'
    ];

    var started = false;
    var cp = require('child_process');
    var assign = require('react/lib/Object.assign');

    var server = (function startup() {
        var child = cp.fork('build/server.js', {
            env: assign({NODE_ENV: 'development'}, process.env)
        });
        child.once('message', function (message) {
            if (message.match(/^online$/)) {
                if (browserSync) {
                    browserSync.reload();
                }
                if (!started) {
                    started = true;
                    gulp.watch(src.server, function () {
                        $.util.log('Restarting development server.');
                        server.kill('SIGTERM');
                        server = startup();
                    });
                    cb();
                }
            }
        });
        return child;
    })();

    process.on('exit', function () {
        server.kill('SIGTERM');
    });
});

// Launch BrowserSync development server
gulp.task('sync', ['serve'], function (cb) {
    browserSync = require('browser-sync');

    browserSync({
        logPrefix: 'RSK',
        proxy: 'localhost:5000',
        browser: 'chrome'
    }, cb);

    process.on('exit', function () {
        browserSync.exit();
    });

    gulp.watch(['build/**/*.*'].concat(
        src.server.map(function (file) {
            return '!' + file;
        })
    ), function (file) {
        browserSync.reload(path.relative(__dirname, file.path));
    });
});

//
// External tasks
// -----------------------------------------------------------------------------

require('./gulp_tasks/add-component')(gulp);
