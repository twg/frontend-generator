var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp');

gulp.task('build', [
  'styles',
  'vendor:styles',
  'scripts',
  'vendor:scripts',
  'templates',
  'revision'
]);

gulp.task('default', ['build', 'server', 'watch']);
