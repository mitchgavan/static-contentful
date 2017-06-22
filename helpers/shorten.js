var handlebars  = require('handlebars');

handlebars.registerHelper('shorten', function (content) {
  return content.split(' ').slice(0, 50).join(' ') + '...';
});

module.exports = handlebars;
