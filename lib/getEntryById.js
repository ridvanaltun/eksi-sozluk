'use strict';

const d = require('../utils/date');
const r = require('../utils/request');
const urls = require('../utils/urls');
const e = require("../exceptions");

/**
 * A promise for entry by id.
 *
 * @promise Entry
 * @fulfill {Object} The entry.
 * @reject {NotFoundError} Throws when entry not found.
 */

/**
 * Fetch entry by id.
 *
 * @param   {number}  entryId Entry Id.
 *
 * @returns {Entry} A promise for the entry by id.
 */
const getEntryById = (entryId) => {
  return new Promise((resolve, reject) => {
    r(`/entry/${entryId}`, ($) => {
      const status = $.statusCode;

      if (status === 200) {
        const date = d($('ul#entry-item-list li footer div.info a.permalink').text());
        const isEksiseylerExist = $('ul#entry-item-list li').data('seyler-slug') !== '';
        const entry = {
          author: $('ul#entry-item-list li').data('author'),
          author_id: $('ul#entry-item-list li').data('author-id'),
          author_url: urls.user + $('ul#entry-item-list li').data('author'),
          content: $('ul#entry-item-list li div.content').html(),
          content_encoded: $('ul#entry-item-list li div.content').text().trim(),
          date_created: date.created,
          date_modified: date.modified,
          eksiseyler_link: isEksiseylerExist ? urls.seyler + $('ul#entry-item-list li').data('seyler-slug') : null,
          eksiseyler_slug: isEksiseylerExist ? $('ul#entry-item-list li').data('seyler-slug') : null,
          entry_id: entryId,
          favorite_count: $('ul#entry-item-list li').data('favorite-count'),
          permalink: urls.entry + entryId,
          title: $('h1#title').data('title'),
          title_id: $('h1#title').data('id'),
          title_slug: $('h1#title').data('slug'),
          title_url: urls.base + $('h1#title a').attr('href'),
        };
        resolve(entry);
      } else if(status === 404) {
        reject(new e.NotFoundError('Entry not found.'));
      } else {
        reject(new Error('An unknown error occurred.'));
      }
    });
  });
};

module.exports = getEntryById;
