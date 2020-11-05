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

  /**
   * A promise for rookie entries.
   *
   * @promise RookieEntries
   * @fulfill {Object} The rookie entries.
   */

  /**
   * Fetch rookie entries.
   *
   * @return {RookieEntries} A promise for the rookie entries.
   */
  rookieEntries () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/basliklar/caylaklar', ajax: true, cookie: this.cookies }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const rookieEntries = []

          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            rookieEntries.push({
              title: title.substring(0, title.length - (entryCount.length + 1)), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount) ? parseInt(entryCount) : 1 // calculate entry count
            })
          })

          resolve(rookieEntries)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * A promise for events.
   *
   * @promise Events
   * @fulfill {Object} The events.
   */

  /**
   * Fetch events.
   *
   * @return {Events} A promise for the events.
   */
  events () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/basliklar/olay', ajax: true, cookie: this.cookies }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const events = []

          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            events.push({
              title: title.substring(0, title.length - (entryCount.length)).trim(), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount) ? parseInt(entryCount) : 0 // calculate entry count
            })
          })

          resolve(events)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * A promise for drafts.
   *
   * @promise Drafts
   * @fulfill {Object} The drafts.
   */

  /**
   * Fetch drafts.
   *
   * @return {Drafts} A promise for the drafts.
   */
  drafts () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/basliklar/kenar', ajax: true, cookie: this.cookies }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const drafts = []

          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const date = $(elm).find('a div').text().trim()
            drafts.push({
              title: title.substring(0, title.length - (date.length)).trim(), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              draft_date: date
            })
          })

          resolve(drafts)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }
}

module.exports = EksiMember
