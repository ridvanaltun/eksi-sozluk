const Image = require('./Image')
const { URLS } = require('../constants')

/**
 * Image collection.
 */
class ImageCollection {
  /**
   * Image count.
   *
   * @type {number}
   */
  imageCount

  /**
   * Images.
   *
   * @type {Array<Image>}
   */
  images = []

  /**
   * Image owner.
   *
   * @type {string}
   */
  username

  /**
   * Create image collection.
   *
   * @param {object}  request   Axios client.
   * @param {string}  username  Username.
   */
  constructor (request, username) {
    this._request = request
    this.username = username
  }

  /**
   * Retrieve image collection.
   *
   * @returns {Promise}  Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: URLS.USER_IMAGES,
        ajax: true,
        params: {
          nick: this.username
        }
      }

      this._request(requestOptions, $ => {
        $('ul li a').each((i, elm) => {
          const image = new Image()
          image.serialize($, elm)
          this.images.push(image)
        })

        this.imageCount = this.images.length

        resolve()
      })
    })
  }
}

module.exports = ImageCollection
