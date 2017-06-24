var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var contentful = require('contentful-metalsmith');
var dataMarkdown = require('metalsmith-data-markdown');
const handlebars = require('handlebars');
const glob = require('glob');

glob.sync('./helpers/*.js').forEach((fileName) => {
  const helper = fileName.split('/').pop().replace('.js', '');

  handlebars.registerHelper(
    helper,
    require(`./${fileName}`)
  );
});

Metalsmith(__dirname)
  .metadata({
    title: 'Static Contentful Site',
    description: 'It\'s about saying Hello to the World.',
    generator: 'Metalsmith',
    url: 'http://www.metalsmith.io/'
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(contentful({
    space_id: 'w7sdyslol3fu',
    access_token: 'baa905fc9cbfab17b1bc0b556a7e17a3e783a2068c9fd6ccf74ba09331357182',
    common: {
      featured_author: {
        limit: 1,
        filter: {
          'sys.id[in]': '5JQ715oDQW68k8EiEuKOk8'
        }
      }
    },
  }))
  .use(markdown())
  .use(dataMarkdown({
    removeAttributeAfterwards: true
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
