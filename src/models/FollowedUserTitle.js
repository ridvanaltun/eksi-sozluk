const c = require('../constants')

/**
 * Followed user title.
 */
class FollowedUserTitle {
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
   * Title owner.
   * @type {string}
   */
  owner

  /**
   * Parse properties with given document.
   * @param   {Object}  $    Cheerio document.
   * @param   {Object}  elm  Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const name = $(elm).text().trim()
    const owner = $(elm).find('a div').text().trim()

    this.name = name.substring(0, name.length - owner.length).trim()
    this.url = c.urls.base + $(elm).find('a').attr('href')
    this.owner = owner
  }
}

module.exports = FollowedUserTitle
