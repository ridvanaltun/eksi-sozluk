"use strict";

const r = require("../utils/request");
const urls = require("../utils/urls");
const e = require("../exceptions");

/**
 * A promise for the yesterday's top entries.
 *
 * @promise YesterdayTopEntries
 * @fulfill {Object} The yesterday's top entries.
 * @reject {NotFoundError} Throws when debe not found.
 */

/**
 * Fetch yesterday's top entries.
 *
 * @param   {Object}        usrOptions        Parameters that user can specify.
 * @param   {number}        usrOptions.limit  The result limits.
 *
 * @returns {YesterdayTopEntries} A promise for the yesterday's top entries.
 */
const getDebe = (usrOptions) => {
  return new Promise((resolve, reject) => {
    const options = {
      endpoint: "m/debe",
    };

    const { limit } = usrOptions;

    r(options, ($) => {
      const status = $.statusCode;
      let debe = [];

      // success
      if (status === 200) {
        debe = $("li", "ul.topic-list.partial.mobile")
          .map(function () {
            return {
              title: $(this).text().trim(),
              url: urls.base + $(this).find("a").attr("href"),
            };
          })
          .get();

        if (limit) {
          debe = debe.slice(0, limit);
        }
        resolve(debe);
      }

      // not found
      if (status === 404) {
        reject(new e.NotFoundError('Debe not found.'));
      }
    });
  });
};

module.exports = getDebe;
