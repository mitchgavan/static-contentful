const gulp = require('gulp');
const del = require('del');
const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
// const contentful = require('contentful');
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

//Task definitions

gulp.task('images', imagesTask(gulp, $));

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

gulp.task('metalsmith', ['clean'], function () {
  return gulp.src('./src/**')
    .pipe(metalsmith({
      use: [
        markdown(),
        permalinks(),
        layouts({engine: 'handlebars'})
      ],
      metadata: {
        title: "Static Contentful Site",
        description: "It's about saying »Hello« to the World.",
        generator: "Metalsmith",
        url: "http://www.metalsmith.io/"
      },
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**', ['metalsmith']);
});

gulp.task('clean', del.bind(null, [config.paths.dist]));

gulp.task('build', (done) => {
  runSequence(['clean'], ['styles:prod', 'scripts:prod', 'metalsmith'], done);
});

gulp.task('default', ['build'], () => {
  return gulp.src(`${config.paths.dist}/**/*`).pipe($.size({gzip: true, showFiles: true, title:'[built]'}));
});
