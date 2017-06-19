const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
// const contentful = require('contentful');

module.exports = (gulp, $) => {
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
      .pipe(gulp.dest('./build'));
  };
};
