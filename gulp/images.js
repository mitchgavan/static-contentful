const config =            require('../config');
const imageminMozjpeg =   require('imagemin-mozjpeg');
const imageminGifsicle =  require('imagemin-gifsicle');
const imageminPngquant =  require('imagemin-pngquant');

module.exports = (gulp, $) => {
  return () => {
    return gulp.src(`${config.paths.images}/**/*`)
      .pipe($.imagemin([
        imageminMozjpeg({
          quality:config.imagemin.jpg
        }),
        imageminGifsicle({
          optimizationLevel: config.imagemin.gif
        }),
        imageminPngquant({
          quality: config.imagemin.png
        })]))
      .pipe(gulp.dest(`${config.paths.dist}/images`));
  };
};
