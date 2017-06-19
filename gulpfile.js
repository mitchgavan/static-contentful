const gulp = require('gulp');
const del = require('del');
const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
// const contentful = require('contentful');
const fs = require('fs');

gulp.task('clean', function () {
  del('./build/**');
});

gulp.task('metalsmith', ['clean'], function () {
  return gulp.src('./src/**')
    .pipe(metalsmith({
      use: [
        markdown(),
        layouts({engine: 'handlebars'})
      ]
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**', ['metalsmith']);
});
