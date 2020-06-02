'use strict';

const r = require('../utils/request');
const urls = require('../utils/urls');

/**
 * Callback function for return debe list.
 *
 * @callback debeCallback
 * @param {Object} debe - Debe object.
 */

/**
 * Fetch yesterday's top entries.
 *
 * @param   {Object}        usrOptions        Parameters that the user can specify.
 * @param   {number}        usrOptions.limit  The result limits.
 * @param   {debeCallback}  callback          The function run after the process.
 */
const getDebe = (usrOptions, callback) => {
  const options = {
    endpoint: 'm/debe',
  };

  const {limit} = usrOptions;

  r(options, ($) => {
    const status = $.statusCode;
    const debe = {status};

    switch (status) {
      case 200:
        debe.data = $('li', 'ul.topic-list.partial.mobile').map(function() {
          return {
            title: $(this).text().trim(),
            url: urls.base + $(this).find('a').attr('href'),
          };
        }).get();

        if (limit) {
          debe.data = debe.data.slice(0, limit);
        }
        break;

      case 404:
        debe.data = {
          error: 'Not Found',
          message: 'Debe does not exist.',
        };
        break;

      default:
        debe.data = {
          error: 'Unknow Error',
          message: 'An unknow error occurred.',
        };
        break;
    }

    callback(debe);
  });
};

module.exports = getDebe;
