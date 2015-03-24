/*
 * Revision files
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var revall = require('gulp-rev-all');
var napkin = require('gulp-rev-napkin');

gulp.task('revision', ['styles', 'scripts', 'vendor:scripts', 'templates', 'clean'], function(){
  return gulp.src('dist/**/*')
    .pipe(revall({
      ignore: ['.html'],
      silent: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(napkin({
      verbose: false
    }));
});
