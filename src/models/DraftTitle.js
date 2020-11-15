const { parseDate } = require('../utils')
const { URLS } = require('../constants')

/**
 * Draft title.
 */
class DraftTitle {
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
   * Title slug.
   * @type {string}
   */
  slug

  /**
   * Title created date.
   * @type {string}
   */
  dateCreated

  /**
   * Title modified date.
   * @type {(string|null)}
   */
  dateModified

  /**
   * Parse properties with given document.
   * @param   {Object}  $    Cheerio document.
   * @param   {Object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const name = $(elm).text().trim()
    const date = $(elm).find('a div').text().trim()
    const calculatedDate = parseDate(date)
    this.name = name.substring(0, name.length - date.length).trim()
    this.url = URLS.BASE + $(elm).find('a').attr('href')
    this.slug = $(elm).find('a').attr('href').replace(/(\/|\?q=)/g, '').split('&')[0]
    this.dateCreated = calculatedDate.created
    this.dateModified = calculatedDate.modified
  }
}

module.exports = DraftTitle
