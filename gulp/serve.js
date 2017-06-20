const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const config = require('../config');
const ngrok = require('ngrok');

const tunnel = (error, bsync) => {
  ngrok.connect(bsync.options.get('port'), (_e, url) => {
    console.log(`[NGROK] Started at: ${url}`);
  });
};

module.exports = (gulp, options) => {
  return () => {
    runSequence(['clean'], [`styles:${options.env}`, `scripts:${options.env}`, 'metalsmith'], () => {
      browserSync({
        notify: false,
        port: 3000,
        server: {
          baseDir: [config.paths.dist],
          routes: {},
        }
      },
      tunnel);

      gulp.watch([`${config.paths.src}/images/**/*`]).on('change', browserSync.reload);
      gulp.watch([`${config.paths.src}/**/*.md`, `${config.paths.layouts}/*.html`], ['metalsmith']);
      gulp.watch(`${config.paths.styles}/**/*.scss`, [ 'lintStyles', `styles:${options.env}`]);
      gulp.watch(`${config.paths.scripts}/**/*`, ['lintScripts', `scripts:${options.env}`]);
    });
  };
};
