const config = require('../config');

module.exports = (gulp, $) => {
  return () => {
    return gulp.src(`${config.paths.scripts}/**/*.js`)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  };
};
