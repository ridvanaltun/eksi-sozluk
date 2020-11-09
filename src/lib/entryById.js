const { parseDate } = require('../utils')
const c = require('../constants')
const { NotFoundError } = require('../exceptions')

const entryById = (_request, entryId) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: `/entry/${entryId}` }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const date = parseDate(
          $('ul#entry-item-list li footer div.info a.permalink').text()
        )
        const isEksiseylerExist =
            $('ul#entry-item-list li').data('seyler-slug') !== ''

        const authorId = $('ul#entry-item-list li').data('author-id')

        const entry = {
          author: $('ul#entry-item-list li').data('author'),
          author_id: authorId,
          author_url: c.urls.user + $('ul#entry-item-list li').data('author'),
          content: $('ul#entry-item-list li div.content').html(),
          content_encoded: $('ul#entry-item-list li div.content')
            .text()
            .trim(),
          date_created: date.created,
          date_modified: date.modified,
          eksiseyler_link: isEksiseylerExist
            ? c.urls.seyler + $('ul#entry-item-list li').data('seyler-slug')
            : null,
          eksiseyler_slug: isEksiseylerExist
            ? $('ul#entry-item-list li').data('seyler-slug')
            : null,
          entry_id: entryId,
          favorite_count: $('ul#entry-item-list li').data('favorite-count'),
          permalink: c.urls.entry + entryId,
          title: $('h1#title').data('title'),
          title_id: $('h1#title').data('id'),
          title_slug: $('h1#title').data('slug'),
          title_url: c.urls.base + $('h1#title a').attr('href')
        }
        resolve(entry)
      }

      if (status === 404) {
        reject(new NotFoundError('Entry not found.'))
      }
    })
  })
}

module.exports = entryById
