const notify =  require('gulp-notify');
const gulp = require('gulp');

module.exports = () => {
  const args = Array.prototype.slice.call(arguments);
  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  gulp.emit('end');
};
