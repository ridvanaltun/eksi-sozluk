const { URLS } = require('../constants')
const EntryCollection = require('./EntryCollection')

/**
 * Title.
 */
class Title {
  /**
   * Title id, if the title is an user (like a corporate account event) will be null.
   * @type {(number|null)}
   */
  id

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
   * Title entry count.
   * @type {number}
   */
  entryCount

  /**
   * Entry collection.
   * @type {EntryCollection}
   */
  entries

  /**
   * Create title.
   * @param {Object}  request Axios client.
   */
  constructor (request) {
    this._request = request
  }

  /**
   * Parse properties with given document.
   * @param {Object}  $   Cheerio document.
   * @param {Object}  elm Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const name = $(elm).text().trim()
    const entryCountStr = $(elm).find('small').text()
    const entryCount = parseInt(entryCountStr)
    const slug = $(elm).find('a').attr('href').split('?')[0].replace('/', '')

    this.id = parseInt(slug.split('--')[1]) || null
    this.name = name.substring(0, name.length - (entryCountStr.length)).trim()
    this.url = URLS.BASE + $(elm).find('a').attr('href')
    this.slug = slug
    this.entryCount = entryCountStr.includes('b') ? (1000 * entryCount) : entryCount || 1

    const endpoint = $(elm).find('a').attr('href').replace('/', '')
    this.entries = new EntryCollection(this._request, endpoint)
  }
}

module.exports = Title
