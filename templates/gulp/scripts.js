/*
 * Concat and uglify the scripts.
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var order = require('gulp-order');

gulp.task('scripts', ['clean', 'clean:scripts', 'vendor:scripts'], function(){

  return gulp.src(paths.scripts.src)

    .pipe(order([
      'src/scripts/vendor/**/*.js',
      paths.scripts.src
    ], {base: '.'}))

    .pipe(concat({path: 'scripts.js', cwd: ''}))

    .pipe(uglify().on('error', notify.onError({
      title: 'Uglify Error',
      message: "\n<%= appError %>"
    })))

    .pipe(gulp.dest(paths.scripts.dest));

});

gulp.task('vendor:scripts', ['clean'], function(){

  return gulp.src(paths.vendor.scripts.src)
    .pipe(gulp.dest(paths.vendor.scripts.dest));

});
