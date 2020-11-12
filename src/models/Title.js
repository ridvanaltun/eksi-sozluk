const c = require('../constants')

/**
 * Title.
 */
class Title {
  /**
   * Title name.
   * @type {string}
   */
  name

  /**
   * Title URL.
   * @type {string}
   */
  url

  /**
   * Title entry count.
   * @type {number}
   */
  entryCount

  /**
   * Parse properties with given document.
   * @param   {Object}  $    Cheerio document.
   * @param   {Object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const name = $(elm).text()
    const entryCountStr = $(elm).find('small').text()
    const entryCount = parseInt(entryCountStr)

    this.name = name.substring(0, name.length - (entryCountStr.length)).trim()
    this.url = c.urls.base + $(elm).attr('href')
    this.entryCount = entryCountStr.includes('b') ? (1000 * entryCount) : entryCount || 1
  }
}

module.exports = Title
