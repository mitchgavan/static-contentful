const browserSync = require('browser-sync');
const config = require('../config');

module.exports = (gulp, $, options) => {
  return () => {
    return gulp.src(options.config.src)
      .pipe($.plumber())
      .pipe($.if(options.config.sourcemaps, $.sourcemaps.init()))
      .pipe($.sass.sync(options.config).on('error', $.sass.logError))
      .pipe($.autoprefixer(config.sass.autoprefixer))
      .pipe($.if(options.config.sourcemaps, $.sourcemaps.write()))
      .pipe(gulp.dest(`${config.paths.dist}/css`))
      .pipe($.if(options.reload, browserSync.reload({stream: true})));
  };
};
