const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const runSequence = require('run-sequence');
const $ = require('gulp-load-plugins')();
const config = require('./config');

//Task bases
const serveTask = require('./gulp/serve');
const imagesTask = require('./gulp/images');
const stylesTask = require('./gulp/styles');
const scriptsTask = require('./gulp/scripts');
const lintStylesTask = require('./gulp/lintStyles');
const lintScriptsTask = require('./gulp/lintScripts');
const metalsmithTask = require('./gulp/metalsmith');

//Task definitions

gulp.task('images', imagesTask(gulp, $));

gulp.task('metalsmith', metalsmithTask(gulp, $));

gulp.task('lintStyles', lintStylesTask(gulp, $));

gulp.task('lintScripts', lintScriptsTask(gulp, $));

gulp.task('lint', ['lintStyles', 'lintScripts']);

gulp.task('styles:dev', stylesTask(gulp, $, { config: config.sass.dev, reload: true }));

gulp.task('styles:prod', stylesTask(gulp, $, { config: config.sass.prod, reload: true }));

gulp.task('scripts:dev', scriptsTask(gulp, $, { config: config.webpack.dev, reload: true }));

gulp.task('scripts:prod', scriptsTask(gulp, $, { config: config.webpack.prod, reload: true }));

gulp.task('serve:dev', serveTask(gulp, { env: 'dev' }));

gulp.task('serve:prod', serveTask(gulp, { env: 'prod' }));

gulp.task('serve', ['serve:dev']);

gulp.task('clean', del.bind(null, [config.paths.dist]));

gulp.task('build', (done) => {
  runSequence(['clean'], ['styles:prod', 'scripts:prod', 'metalsmith'], done);
});

gulp.task('default', ['build'], () => {
  return gulp.src(`${config.paths.dist}/**/*`).pipe($.size({gzip: true, showFiles: true, title:'[built]'}));
});
