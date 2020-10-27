'use strict'

const r = require('../utils/request')
const urls = require('../utils/urls')
const e = require('../exceptions')

/**
 * Clear given title.
 *
 * @param   {string}  title       Title.
 * @param   {string}  entryCount  Entry count string in title.
 *
 * @return  {string}              Cleared title.
 *
 * @private
 * @ignore
 */
const clearTitle = (title, entryCount) => {
  return title.substring(0, title.length - (entryCount.length + 1))
}

/**
 * Calculates entry count from given string.
 *
 * @param   {string}  strEntryCount  Entry count in string.
 *
 * @return  {number}                 Calculated entry count.
 *
 * @private
 * @ignore
 */
const calEntryCount = (strEntryCount) => {
  let entryCount

  if (strEntryCount.includes('b')) {
    entryCount = 1000 * parseInt(strEntryCount)
  } else {
    entryCount = parseInt(strEntryCount)
  }

  return entryCount
}

/**
 * A promise for today in history.
 *
 * @promise TodayInHistory
 * @fulfill {Object} The today in history.
 * @reject {NotFoundError} Throws when today in history not found.
 */

/**
 * Fetch today in history.
 *
 * @param   {string}  year              A year.
 * @param   {Object}  usrOptions        Parameters that user can specify.
 * @param   {number}  usrOptions.page   Page number.
 *
 * @return {TodayInHistory} A promise for the today in history.
 */
const getTodayInHistory = (year, usrOptions) => {
  return new Promise((resolve, reject) => {
    let { page } = usrOptions

    if (!page) page = 1

    const endpoint = '/basliklar/m/tarihte-bugun?year=' + year + '&p=' + page

    r(endpoint, ($) => {
      const status = $.statusCode
      const titles = []

      if (status === 200) {
        $('ul.topic-list.partial.mobile li').each(function (i, elm) {
          const title = $(elm).text().trim()
          const entryCount = $(elm).find('a small').text().trim()
          titles.push({
            title: clearTitle(title, entryCount),
            title_url: urls.base + $(elm).find('a').attr('href'),
            entry_count: calEntryCount(entryCount)
          })
        })
        resolve(titles)
      } else if (status === 404) {
        reject(new e.NotFoundError('Today in history not found.'))
      } else {
        reject(new Error('An unknown error occurred.'))
      }
    })
  })
}

module.exports = getTodayInHistory
