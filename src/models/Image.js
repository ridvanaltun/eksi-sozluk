const { URLS } = require('../constants')

/**
 * Image.
 */
class Image {
  /**
   * Image URL.
   *
   * @type {string}
   */
  url

  /**
   * Image CDN URL.
   *
   * @type {string}
   */
  cdnUrl

  /**
   * Parse properties with given document.
   *
   * @param {object}  $   Cheerio document.
   * @param {object}  elm Cheerio element.
   * @ignore
   */
  serialize($, elm) {
    this.url = URLS.BASE + $(elm).attr('href')
    this.cdnUrl = $(elm)
      .find('div')
      .attr('style')
      .replace("background-image:url('", '')
      .replace("')", '')
  }
}

module.exports = Image
