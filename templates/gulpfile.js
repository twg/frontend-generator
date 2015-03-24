var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp');

gulp.task('build', [
  'styles',
  'scripts',
  'templates',
  'revision'
]);

gulp.task('default', ['build', 'server', 'watch']);
