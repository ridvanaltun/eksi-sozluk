const { URLS } = require('../constants')

/**
 * Tag.
 */
class Tag {
  /**
   * Tag ID.
   *
   * @type {(number|null)}
   */
  id = null

  /**
   * Tag name.
   *
   * @type {TagName}
   */
  name

  /**
   * Tag description.
   *
   * @type {string}
   */
  description

  /**
   * Tag URL.
   *
   * @type {string}
   */
  link

  /**
   * Is tag followed?
   *
   * @type {(boolean|null)}
   */
  followed = null

  /**
   * Create tag.
   *
   * @param {string}  [cookies=null]  Cookie string.
   */
  constructor (cookies = null) {
    this._cookies = cookies
  }

  /**
   * Parse properties with given document.
   *
   * @param {object}  $   Cheerio document.
   * @param {object}  elm Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    this.name = $(elm)
      .find('h3 a')
      .text()
      .substring(
        1,
        $(elm)
          .find('h3 a')
          .text().length
      )
    this.description = $(elm)
      .find('p')
      .text()
    this.link =
      URLS.BASE +
      $(elm)
        .find('h3 a')
        .attr('href')

    // bind auth properties
    if (this._cookies) {
      this.id = parseInt(
        $(elm)
          .find('button')
          .data('follow-url')
          .split('/')[2]
      )
      this.followed = $(elm)
        .find('button')
        .data('followed')
    }
  }
}

module.exports = Tag
