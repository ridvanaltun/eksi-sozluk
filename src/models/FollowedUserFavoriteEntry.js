const { URLS } = require('../constants')
const UserForMember = require('./UserForMember')
const EntryForMember = require('./EntryForMember')

/**
 * Followed user favorite entry.
 */
class FollowedUserFavoriteEntry {
  /**
   * Entry ID.
   * @type {number}
   */
  entryId

  /**
   * Title name.
   * @type {string}
   */
  titleName

  /**
   * Entry URL.
   * @type {string}
   */
  entryUrl

  /**
   * Title slug.
   * @type {string}
   */
  titleSlug

  /**
   * Entry owner.
   * @type {UserForMember}
   */
  owner

  /**
   * Entry itself.
   * @type {EntryForMember}
   */
  entry

  /**
   * Create title.
   * @param {Object}  request Axios client.
   * @param {string}  cookies Cookie string.
   */
  constructor (request, cookies) {
    this._request = request
    this._cookies = cookies
  }

  /**
   * Parse properties with given document.
   * @param {Object}  $    Cheerio document.
   * @param {Object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const titleName = $(elm)
      .text()
      .trim()
    const owner = $(elm)
      .find('a div')
      .text()
      .trim()
    const entryId = parseInt(
      $(elm)
        .find('a')
        .attr('href')
        .split('/')[2]
    )

    this.entryId = entryId
    this.titleName = titleName
      .substring(0, titleName.length - owner.length)
      .trim()
    this.entryUrl =
      URLS.BASE +
      $(elm)
        .find('a')
        .attr('href')
    this.titleSlug = $(elm)
      .find('a')
      .attr('href')
      .replace('/', '')

    this.owner = new UserForMember(this._request, owner, this._cookies)
    this.entry = new EntryForMember(this._request, entryId, this._cookies)
  }
}

module.exports = FollowedUserFavoriteEntry
