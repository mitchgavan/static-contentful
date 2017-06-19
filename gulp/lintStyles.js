const config = require('../config');

module.exports = (gulp, $) => {
  return () => {
    return gulp.src(`${config.paths.styles}/**/*.s+(a|c)ss`)
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe($.sassLint.failOnError());
  };
};
