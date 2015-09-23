'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var webserver = require('gulp-webserver');
// add custom browserify options here
var customBuildOpts = {
  entries: ['./dev/main.js'],
  debug: true
};
var customTestOpts = {
  entries: ['./test/src/app.js'],
  debug: true,
//  standalone: true
};

var buildOpts = assign({}, watchify.args, customBuildOpts);
var testOpts = assign({}, watchify.args, customTestOpts);
var b = watchify(browserify(buildOpts));
var tb = watchify(browserify(testOpts)); 

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('default', ['build', 'build-test', 'run']);
gulp.task('run', ['build', 'build-test'], function (){
	gulp.src('./').pipe(webserver({
		livereload: true,
		fallback: 'test/index.html',
		open: true
	}));
});

gulp.task('build', mainBundle);

gulp.task('build-test', testBundle); // build test harness

b.on('update', mainBundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
tb.on('update', testBundle);
tb.on('log', gutil.log); 

function mainBundle (){
	bundle(b, './dist', 'photational.js');
}

function testBundle (){
	bundle(tb, './test/dist', 'bundle.js');
}

function bundle(b, path, name) {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(name))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(path));
}
