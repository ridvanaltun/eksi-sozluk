'use strict'

const r = require('../utils/request')
const d = require('../utils/date')
const urls = require('../utils/urls')
const e = require('../exceptions')
const { upvote, downvote } = require('./vote')

/**
 * A promise for entries.
 *
 * @promise Entries
 * @fulfill {Object} The entries.
 * @reject {NotFoundError} Throws when entries not found.
 */

/**
 * Fetch entries.
 *
 * @param   {string}  title             Title itself.
 * @param   {Object}  usrOptions        Parameters that user can specify.
 * @param   {number}  usrOptions.page   Page number of title.
 *
 * @return {Entries} A promise for the entries.
 */
const getEntries = (title, usrOptions) => {
  return new Promise((resolve, reject) => {
    let { page } = usrOptions

    if (!page) page = 1

    const endpoint = '/?q=' + title + '&p=' + page

    r(endpoint, ($) => {
      const status = $.statusCode
      const entries = []

      if (status === 200) {
        $('ul#entry-item-list li').each(function (i, elm) {
          const date = d($(elm).find('a.entry-date').text())
          const isEksiseylerExist = $(elm).data('seyler-slug') !== ''

          entries.push({
            author: $(elm).data('author'),
            author_id: $(elm).data('author-id'),
            author_url: urls.user + $(elm).data('author'),
            content: $(elm).find('div.content').html(),
            content_encoded: $(elm).find('div.content').text().trim(),
            date_created: date.created,
            date_modified: date.modified,
            eksiseyler_link: isEksiseylerExist ? urls.seyler + $(elm).data('seyler-slug') : null,
            eksiseyler_slug: isEksiseylerExist ? $(elm).data('seyler-slug') : null,
            entry_id: $(elm).data('id'),
            favorite_count: $(elm).data('favorite-count'),
            permalink: urls.base + $(elm).find('a.entry-date').attr('href'),
            title: $('h1#title').data('title'),
            title_id: $('h1#title').data('id'),
            title_slug: $('h1#title').data('slug'),
            title_url: urls.base + $('h1#title a').attr('href'),
            upvote,
            downvote
          })
        })
        resolve(entries)
      } else if (status === 404) {
        reject(new e.NotFoundError('Entries not found.'))
      } else {
        reject(new Error('An unknown error occurred.'))
      }
    })
  })
}

module.exports = getEntries
