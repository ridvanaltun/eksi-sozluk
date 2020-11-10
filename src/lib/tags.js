const c = require('../constants')

const tags = (_request, cookie = null) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/kanallar', cookie }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const tags = []
        $('ul#channel-follow-list li').each(function (i, elm) {
          const tag = {
            name: $(elm).find('h3 a').text().substring(1, $(elm).find('h3 a').text().length),
            description: $(elm).find('p').text(),
            link: c.urls.base + $(elm).find('h3 a').attr('href')
          }

          // bind user properties
          if (cookie) {
            tag.id = parseInt($(elm).find('button').data('follow-url').split('/')[2])
            tag.followed = $(elm).find('button').data('followed')
          }

          tags.push(tag)
        })
        resolve(tags)
      }
    })
  })
}

module.exports = tags
