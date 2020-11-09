const c = require('../constants')

const tags = (_request) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/kanallar' }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const tags = []
        $('ul#channel-follow-list li').each(function (i, elm) {
          tags.push({
            name: $(elm).find('h3 a').text().substring(1, $(elm).find('h3 a').text().length),
            description: $(elm).find('p').text(),
            link: c.urls.base + $(elm).find('h3 a').attr('href')
          })
        })
        resolve(tags)
      }
    })
  })
}

module.exports = tags
