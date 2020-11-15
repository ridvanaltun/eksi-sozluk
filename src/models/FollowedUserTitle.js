const { URLS } = require('../constants')

/**
 * Followed user title.
 */
class FollowedUserTitle {
  /**
   * Title id.
   * @type {number}
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
   * Title owner.
   * @type {string}
   */
  owner

  /**
   * Parse properties with given document.
   * @param {Object}  $    Cheerio document.
   * @param {Object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const name = $(elm).text().trim()
    const owner = $(elm).find('a div').text().trim()
    const slug = $(elm).find('a').attr('href').split('?')[0].replace('/', '')

    this.id = parseInt(slug.split('--')[1])
    this.name = name.substring(0, name.length - owner.length).trim()
    this.url = URLS.BASE + $(elm).find('a').attr('href')
    this.slug = slug
    this.owner = owner
  }
}

module.exports = FollowedUserTitle
