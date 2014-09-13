var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

function webpackHandler(name, callback) {
  return function (err, stats) {
    if (err) {
      throw new gutil.PluginError(name, err);
    }
    gutil.log(name, stats.toString({
      colors: true
    }));
    callback();
  }
};

gulp.task('build:webpack', function (callback) {
  webpack(webpackConfig, webpackHandler('build:webpack', callback));
});

gulp.task('copy:css', function () {
  gulp.src('css/app.css')
  .pipe(gulp.dest('assets/css/'));
});

gulp.task('copy:images', function () {
  gulp.src('images/**/*')
  .pipe(gulp.dest('assets/images/'));
});

gulp.task('default', [
  'copy:images',
  'copy:css',
  'build:webpack'
]);

gulp.task('watch', ['default'], function () {
  gulp.watch('src/**/*', ['build:webpack']);
  gulp.watch('css/app.css', ['copy:css']);
});
