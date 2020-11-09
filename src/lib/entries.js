const objectAssignDeep = require('object-assign-deep')
const { parseDate } = require('../utils')
const c = require('../constants')
const { NotFoundError } = require('../exceptions')

const entries = (_request, title, options) => {
  return new Promise((resolve, reject) => {
    // handle default options
    const _options = objectAssignDeep({
      page: 1
    }, options)

    // handle params
    const params = {
      q: title,
      p: _options.page
    }

    _request({ endpoint: '/', params }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const entries = []
        $('ul#entry-item-list li').each(function (i, elm) {
          const date = parseDate($(elm).find('a.entry-date').text())
          const isEksiseylerExist = $(elm).data('seyler-slug') !== ''

          const authorId = $(elm).data('author-id')
          const entryId = $(elm).data('id')

          entries.push({
            author: $(elm).data('author'),
            author_id: authorId,
            author_url: c.urls.user + $(elm).data('author'),
            content: $(elm).find('div.content').html(),
            content_encoded: $(elm).find('div.content').text().trim(),
            date_created: date.created,
            date_modified: date.modified,
            eksiseyler_link: isEksiseylerExist
              ? c.urls.seyler + $(elm).data('seyler-slug')
              : null,
            eksiseyler_slug: isEksiseylerExist
              ? $(elm).data('seyler-slug')
              : null,
            entry_id: entryId,
            favorite_count: $(elm).data('favorite-count'),
            permalink: c.urls.base + $(elm).find('a.entry-date').attr('href'),
            title: $('h1#title').data('title'),
            title_id: $('h1#title').data('id'),
            title_slug: $('h1#title').data('slug'),
            title_url: c.urls.base + $('h1#title a').attr('href')
          })
        })
        resolve(entries)
      }

      // title has not an entry
      if (status === 404) {
        reject(new NotFoundError('Entries not found.'))
      }
    })
  })
}

module.exports = entries
