'use strict'

const r = require('../utils/request')
const urls = require('../utils/urls')
const e = require('../exceptions')

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
 * @return {YesterdayTopEntries} A promise for the yesterday's top entries.
 */
const getDebe = (usrOptions) => {
  return new Promise((resolve, reject) => {
    const { limit } = usrOptions

    r('/m/debe', ($) => {
      const status = $.statusCode

      if (status === 200) {
        let debe = $('li', 'ul.topic-list.partial.mobile')
          .map(function () {
            return {
              title: $(this).text().trim(),
              url: urls.base + $(this).find('a').attr('href')
            }
          })
          .get()

        if (limit) debe = debe.slice(0, limit)

        resolve(debe)
      } else if (status === 404) {
        reject(new e.NotFoundError('Debe not found.'))
      } else {
        reject(new Error('An unknown error occurred.'))
      }
    })
  })
}

module.exports = getDebe
