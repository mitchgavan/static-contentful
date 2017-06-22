const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const dataMarkdown = require('./helpers/metalsmith-data-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const contentful = require('contentful-metalsmith');
const config = require('../config');
const handleError = require('./handleError');
const browserSync = require('browser-sync');
const discoverHelpers = require('metalsmith-discover-helpers');

module.exports = (gulp) => {
  return () => {
    return gulp.src('./src/**/*.html')
      .pipe(metalsmith({
        metadata: {
          title: 'Static Contentful Site',
          description: 'It\'s about saying Hello to the World.',
          generator: 'Metalsmith',
          url: 'http://www.metalsmith.io/'
        },
        use: [
          contentful({
            space_id: 'fyk1ycuftkuv',
            access_token: 'd181060a557ba75bf1b3621f4f78cb199e9398a9edc641692e403e7502688386'
          }),
          // discoverHelpers({
          //   directory: config.paths.helpers
          // }),
          permalinks(),
          layouts({
            engine: 'handlebars',
            partials: config.paths.partials
          }),
          markdown(),
          dataMarkdown({
            removeAttributeAfterwards: true
          })
        ]
      }))
      .on('error', handleError)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(browserSync.reload({stream: true}));
  };
};
