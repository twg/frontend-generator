/*
 * Watch all the things
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function(){

  watch(paths.styles.watch, function(){
    gulp.start('styles');
  });

  watch(paths.scripts.watch, function(){
    gulp.start('scripts');
  });

  watch(paths.templates.watch, function(){
    gulp.start('templates');
  });

});
