const browserSync = require('browser-sync');
const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
// const contentful = require('contentful');
const config = require('../config');
const handleError = require('./handleError');

module.exports = (gulp, $, options) => {
  return () => {
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
      .on('error', handleError)
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.reload({stream: true}));
  };
};
