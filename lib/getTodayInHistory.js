'use strict';

const r = require('../utils/request');
const urls = require('../utils/urls');

const clearTitle = (title, entryCount) => {
  return title.substring(0, title.length - (entryCount.length + 1));
};

const calEntryCount = (strEntryCount) => {
  let entryCount;

  if (strEntryCount.includes("b")) {
    entryCount = 1000 * parseInt(strEntryCount);
  } else {
    entryCount = parseInt(strEntryCount);
  }

  return entryCount;
};

const getTodayInHistory = (year, usrOptions, callback) => {

  let {page} = usrOptions;

  if (!page) {
    page = 1;
  }

  const options = {
    endpoint: 'basliklar/m/tarihte-bugun?year=' + year + '&p=' + page,
  };

  r(options, ($) => {
    const status = $.statusCode;
    const titles = {status};
    titles.data = [];

    switch (status) {
      case 200:
        $('ul.topic-list.partial.mobile li').each(function(i, elm) {
          const title = $(elm).text().trim();
          const entryCount = $(elm).find('a small').text().trim();

          titles.data.push({
            title: clearTitle(title, entryCount),
            title_url: urls.base + $(elm).find('a').attr('href'),
            entry_count: calEntryCount(entryCount),
          });
        });
        break;

      case 404:
        titles.data = {
          error: 'Not Found',
          message: 'Titles does not exist.',
        };
        break;

      default:
        titles.data = {
          error: 'Unknow Error',
          message: 'An unknow error occurred.',
        };
        break;
    }

    callback(titles);
  });
};

module.exports = getTodayInHistory;
