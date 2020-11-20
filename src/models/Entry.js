const { parseDate } = require('../utils')
const { NotFoundError } = require('../exceptions')
const { URLS } = require('../constants')

/**
 * Entry.
 */
class Entry {
  /**
   * Entry ID.
   * @type {number}
   */
  id

  /**
   * Entry author.
   * @type {string}
   */
  author

  /**
   * Author ID.
   * @type {number}
   */
  authorId

  /**
   * Author URL.
   * @type {string}
   */
  authorUrl

  /**
   * Entry content.
   * @type {string}
   */
  content

  /**
   * Entry content encoded.
   * @type {string}
   */
  contentEncoded

  /**
   * Entry created date.
   * @type {string}
   */
  dateCreated

  /**
   * Entry modified date.
   * @type {(string|null)}
   */
  dateModified

  /**
   * Entry Eksi Seyler URL.
   * @type {(string|null)}
   */
  eksiseylerLink

  /**
   * Entry Eksi Seyler slug.
   * @type {(string|null)}
   */
  eksiseylerSlug

  /**
   * Entry favorite count.
   * @type {number}
   */
  favoriteCount

  /**
   * Entry permalink.
   * @type {string}
   */
  permalink

  /**
   * Entry title.
   * @type {string}
   */
  title

  /**
   * Entry title ID.
   * @type {number}
   */
  titleId

  /**
   * Entry title slug.
   * @type {string}
   */
  titleSlug

  /**
   * Entry title URL.
   * @type {string}
   */
  titleUrl

  /**
   * Is entry favorited?
   * @type {(boolean|null)}
   */
  isFavorited = null

  /**
   * Is entry deleted?
   * @type {(boolean|null)}
   */
  isDeleted = null

  /**
   * Is rookie entry?
   * @type {(boolean|null)}
   */
  isRookieEntry = null

  /**
   * Create entry.
   * @param   {Object}  request         Axios client.
   * @param   {number}  entryId         Entry ID.
   * @param   {string}  [cookies=null]  Cookie string.
   */
  constructor (request, entryId, cookies) {
    this._request = request
    this._cookies = cookies
    this.id = entryId
  }

  /**
   * Parse properties with given document.
   * @param   {Object}  $    Cheerio document.
   * @param   {Object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const date = parseDate($(elm).find('footer div.info a.permalink').text())
    const isEksiseylerExist = $(elm).data('seyler-slug') !== ''
    const authorId = $(elm).data('author-id')

    this.author = $(elm).data('author')
    this.authorId = authorId
    this.authorUrl = URLS.USER + $(elm).data('author')
    this.content = $(elm).find('div.content').html()
    this.contentEncoded = $(elm).find('div.content').text().trim()
    this.dateCreated = date.created
    this.dateModified = date.modified
    this.eksiseylerLink = isEksiseylerExist ? URLS.SEYLER + $(elm).data('seyler-slug') : null
    this.eksiseylerSlug = isEksiseylerExist ? $(elm).data('seyler-slug') : null
    this.favoriteCount = $(elm).data('favorite-count')
    this.permalink = URLS.ENTRY + this.id
    this.title = $('h1#title').data('title')
    this.titleId = $('h1#title').data('id')
    this.titleSlug = $('h1#title').data('slug')
    this.titleUrl = URLS.BASE + $('h1#title a').attr('href')

    // bind auth properties
    if (this._cookies) {
      this.isFavorited = $(elm).data('isfavorite')
      this.isDeleted = $(elm).attr('class') === 'deleted'
      this.isRookieEntry = $(elm).attr('class') === 'hidden'
      this.isEntryAuthorMe = $(elm).data('flags').includes('edit')
    }
  }

  /**
   * Retrieve entry.
   * @return  {Promise}  Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: `/entry/${this.id}`, cookie: this._cookies }, ($) => {
        const status = $.statusCode

        if (status === 404) {
          return reject(new NotFoundError('Entry not found.'))
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const elm = $('ul#entry-item-list li')
        this.serialize($, elm)

        resolve()
      })
    })
  }
}

module.exports = Entry
