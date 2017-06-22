const webpackConfig =     require('./webpack.config');

const PATHS = {
  src:        'src',
  dist:       'build',
  scripts:    'src/js',
  styles:     'src/scss',
  data:       'src/data',
  icons:      'src/icons',
  fonts:      'src/fonts',
  images:     'src/images',
  layouts:    'layouts',
  partials:   'partials',
  helpers:    'helpers'
};

module.exports = {
  paths: PATHS,
  webpack: {
    dev: webpackConfig.dev,
    prod: webpackConfig.prod
  },
  sass: {
    dev: {
      src: 'src/scss/**/*.scss',
      outputStyle: 'expanded',
      precision: 10,
      includePaths: [
        './node_modules',
        './node_modules/foundation-sites/scss'
      ],
      sourcemaps: true
    },
    prod: {
      src: 'src/scss/**/*.scss',
      outputStyle: 'compressed',
      precision: 10,
      includePaths: ['./node_modules']
    },
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }
  },
  imagemin: {
    jpg: 80,
    gif: 3,
    png: 80
  }
};
