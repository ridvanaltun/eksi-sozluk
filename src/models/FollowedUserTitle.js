const { URLS } = require('../constants')
const UserForMember = require('./UserForMember')

/**
 * Followed user title.
 */
class FollowedUserTitle {
  /**
   * Title ID.
   *
   * @type {number}
   */
  id

  /**
   * Title name.
   *
   * @type {string}
   */
  name

  /**
   * Title URL.
   *
   * @type {string}
   */
  url

  /**
   * Title slug.
   *
   * @type {string}
   */
  slug

  /**
   * Title owner.
   *
   * @type {UserForMember}
   */
  owner

  /**
   * Create title.
   *
   * @param {object}  request Axios client.
   * @param {string}  cookies Cookie string.
   */
  constructor (request, cookies) {
    this._request = request
    this._cookies = cookies
  }

  /**
   * Parse properties with given document.
   *
   * @param {object}  $    Cheerio document.
   * @param {object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const name = $(elm)
      .text()
      .trim()
    const owner = $(elm)
      .find('a div')
      .text()
      .trim()
    const slug = $(elm)
      .find('a')
      .attr('href')
      .split('?')[0]
      .replace('/', '')

    this.id = parseInt(slug.split('--')[1])
    this.name = name.substring(0, name.length - owner.length).trim()
    this.url =
      URLS.BASE +
      $(elm)
        .find('a')
        .attr('href')
    this.slug = slug

    this.owner = new UserForMember(this._request, owner, this._cookies)
  }
}

module.exports = FollowedUserTitle
