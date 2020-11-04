const EksiGeneral = require('./EksiGeneral')
const c = require('./constants')

class EksiMember extends EksiGeneral {
  /**
   * Create an Eksi Member instance
   *
   * @constructor
   *
   * @param   {string}  cookies     Auth cookies
   * @param   {Object}  httpClient  Axios client
   */
  constructor (cookies, httpClient) {
    super()
    this.cookies = cookies
    this.httpClient = httpClient
  }

  /**
   * A promise for today.
   *
   * @promise Today
   * @fulfill {Object} The today.
   */

  /**
   * Fetch today.
   *
   * @return {Today} A promise for the today.
   */
  today () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/basliklar/bugun', ajax: true, cookie: this.cookies }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const today = []

          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            today.push({
              title: title.substring(0, title.length - (entryCount.length + 1)), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount) ? parseInt(entryCount) : 1 // calculate entry count
            })
          })

          resolve(today)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }
}

module.exports = EksiMember
