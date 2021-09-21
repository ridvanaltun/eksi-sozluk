const EntryCollection = require('./EntryCollection')
const { URLS } = require('../constants')

/**
 * Ukte collection.
 */
class UkteCollection {
  /**
   * Ukte count.
   *
   * @type {number}
   */
  ukteCount

  /**
   * Images.
   *
   * @type {Array<EntryCollection>}
   */
  ukteler = []

  /**
   * Ukte owner.
   *
   * @type {string}
   */
  username

  /**
   * Create ukte collection.
   *
   * @param {object}  request   Axios client.
   * @param {string}  username  Username.
   * @param {string}  cookies   Cookies in string.
   */
  constructor(request, username, cookies) {
    this._request = request
    this._cookies = cookies
    this.username = username
  }

  /**
   * Retrieve ukte collection.
   *
   * @returns {Promise}  Promise.
   */
  retrieve() {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: URLS.USER_UKTE,
        ajax: true,
        params: {
          nick: this.username
        }
      }

      this._request(requestOptions, $ => {
        $('div ul li').each((i, elm) => {
          const title = $(elm).find('a').text().split(this.username)[0].trim()
          const collection = new EntryCollection(this._request, title, {
            cookies: this._cookies
          })
          this.ukteler.push(collection)
        })

        this.ukteCount = this.ukteler.length

        resolve()
      })
    })
  }
}

module.exports = UkteCollection
