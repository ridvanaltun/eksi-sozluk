'use strict';

const d = require('../utils/date');
const r = require('../utils/request');
const urls = require('../utils/urls');

const getEntryById = (entryID, callback) => {
  const options = {
    endpoint: 'entry',
    id: entryID,
  };

  r(options, ($) => {
    const status = $.statusCode;
    const entry = {status};

    switch (status) {
      case 200:
        const date = d($('ul#entry-item-list li footer div.info a.permalink').text());

        entry.data = {
          author: $('ul#entry-item-list li').data('author'),
          author_id: $('ul#entry-item-list li').data('author-id'),
          author_url: urls.user + $('ul#entry-item-list li').data('author'),
          content: $('ul#entry-item-list li div.content').html(),
          content_encoded: $('ul#entry-item-list li div.content').text().trim(),
          date_created: date.created,
          date_modified: date.modified,
          eksiseyler_link: urls.seyler + $('ul#entry-item-list li').data('seyler-slug'),
          eksiseyler_slug: $('ul#entry-item-list li').data('seyler-slug'),
          entry_id: entryID,
          favorite_count: $('ul#entry-item-list li').data('favorite-count'),
          permalink: urls.entry + entryID,
          title: $('h1#title').data('title'),
          title_id: $('h1#title').data('id'),
          title_slug: $('h1#title').data('slug'),
          title_url: urls.base + $('h1#title a').attr('href'),
        };
        break;

      case 404:
        entry.data = {
          error: 'Not Found',
          message: 'Entry does not exist.',
        };
        break;

      default:
        entry.data = {
          error: 'Unknow Error',
          message: 'An unknow error occurred.',
        };
        break;
    }

    callback(entry);
  });
};

module.exports = getEntryById;
