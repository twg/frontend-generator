/*
 * Process application styles.
 */
 
var paths = require('./paths.js');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('styles', ['clean', 'clean:styles', 'vendor:styles'], function(){

  return gulp.src(paths.styles.src)

    .pipe(sourcemaps.init())

    .pipe(stylus({
      cache: false,
      compress: true
    }).on('error', notify.onError({
      title: 'Stylus Error',
      message: "\n<%= appError %>"
    })))

    .pipe(autoprefixer())

    .pipe(sourcemaps.write('.'))

    .pipe(concat('styles.css'))

    .pipe(gulp.dest(paths.styles.dest));

});

gulp.task('vendor:styles', ['clean'], function(){

  return gulp.src(paths.vendor.styles.src)

    .pipe(rename({
      extname: '.styl'
    }))

    .pipe(gulp.dest(paths.vendor.styles.dest));

});
