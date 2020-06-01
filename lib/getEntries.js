'use strict';

const r = require('../utils/request');
const d = require('../utils/date');
const urls = require('../utils/urls');
const axios = require('axios');

const getActualPath = async (title) => {
  const response = await axios.get(urls.base + '/' + title);
  const actualPath = response.request.path;

  return actualPath;
};

const getEntries = async (usrOptions, callback) => {
  const {page, title} = usrOptions;

  const options = {
    endpoint: await getActualPath(title) + '?p=' + page,
  };

  r(options, ($) => {
    const status = $.statusCode;
    const entries = {status};
    entries.data = [];

    switch (status) {
      case 200:
        $('ul#entry-item-list li').each(function(i, elm) {
          const date = d($(elm).find('a.entry-date').text());
          const isEksiseylerExist = $(elm).data('seyler-slug') !== '';

          entries.data.push({
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
          });
        });
        break;

      case 404:
        entries.data = {
          error: 'Not Found',
          message: 'Entry does not exist.',
        };
        break;

      default:
        entries.data = {
          error: 'Unknow Error',
          message: 'An unknow error occurred.',
        };
        break;
    }

    callback(entries);
  });
};

module.exports = getEntries;
