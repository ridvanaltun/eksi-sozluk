'use strict';

const r = require('../utils/request');
const urls = require('../utils/urls');

const getDebe = (usrOptions, callback) => {
  const options = {
    endpoint: 'm/debe'
  };

  const {limit} = usrOptions;

  r(options, $ => {

    const status = $.statusCode;
    let debe = {status};

    switch (status) {
      case 200:
        debe.data = $('li', 'ul.topic-list.partial.mobile').map(function() {
           return {
            title: $(this).text().trim(),
            url: urls.base + $(this).find('a').attr('href')
          };
        }).get();

        if (limit) {
          debe.data = debe.data.slice(0, limit);
        }
        break;

      case 404:
        debe.data = {
          error: 'Not Found',
          message: 'Debe does not exist.'
        };
        break;

      default:
        debe.data = {
          error: 'Unknow Error',
          message: 'An unknow error occurred.'
        };
        break;
    }

    callback(debe);
  });
};

module.exports = getDebe;
