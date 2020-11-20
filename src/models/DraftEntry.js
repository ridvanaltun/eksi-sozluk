const axios = require('axios')
const setCookie = require('set-cookie-parser')
const qs = require('querystring')
const { URLS } = require('../constants')

/**
 * Draft entry.
 */
class DraftEntry {
  /**
   * Entry author.
   * @type {string}
   */
  author

  /**
   * Author URL.
   * @type {string}
   */
  authorUrl

  /**
   * Entry content.
   * @type {string}
   */
  content

  /**
   * Entry title.
   * @type {string}
   */
  title

  /**
   * Title ID.
   * @type {number}
   */
  titleId

  /**
   * Title slug.
   * @type {number}
   */
  titleSlug

  /**
   * Entry title endpoint.
   * @type {string}
   */
  titleEndpoint

  /**
   * Entry title URL.
   * @type {string}
   */
  titleUrl

  /**
   * Create draft entry.
   * @param {Object}  request     Axios client.
   * @param {string}  title       Title.
   * @param {string}  cookies     Cookie string.
   */
  constructor (request, title, cookies) {
    this.title = title
    this._request = request
    this._cookies = cookies
    this._isRetrieved = false
  }

  /**
   * Parse properties with given document.
   * @param   {Object}  $    Cheerio document.
   * @ignore
   */
  serialize ($) {
    const username = $('div.mobile-notification-icons ul li a').attr('title')

    this.titleId = $('#title').data('id')
    this.titleUrl = URLS.BASE + $('h1#title a').attr('href')
    this.titleSlug = $('#title').data('slug')
    this.titleEndpoint = $('#title').data('slug') + '--' + this.titleId
    this.author = username
    this.authorUrl = URLS.USER + username
    this.content = $('#draft-content').text()

    // mark as retrieved
    this._isRetrieved = true
  }

  /**
   * Retrieve the draft entry.
   * @return  {Promise} Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: `/?q=${this.title}`, cookie: this._cookies }, ($) => {
        const status = $.statusCode

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        this.serialize($)

        resolve()
      })
    })
  }

  /**
   * Publish the draft entry.
   * @return  {Promise} Promise.
   */
  publish () {
    return new Promise((resolve, reject) => {
      if (!this._isRetrieved) {
        return reject(new Error('Retrieve first.'))
      }

      axios.get(`${URLS.BASE}/${this.titleEndpoint}`, {
        headers: {
          Cookie: this._cookies
        }
      }).then((res) => {
        // parse csrf token and cookies
        const csrfRegex = new RegExp('(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)', 'u')
        const csrfToken = csrfRegex.exec(res.data)[0]

        const cookies = setCookie.parse(res.headers['set-cookie'], { map: true })
        const csrfTokenInCookies = cookies.__RequestVerificationToken.value

        return { csrfToken, csrfTokenInCookies }
      }).then(async ({ csrfToken, csrfTokenInCookies }) => {
        // create entry
        const _res = await axios({
          url: URLS.CREATE_ENTRY,
          method: 'POST',
          headers: {
            Cookie: `__RequestVerificationToken=${csrfTokenInCookies}; ${this._cookies}`
          },
          data: qs.stringify({
            __RequestVerificationToken: csrfToken,
            Title: this.title,
            Content: this.content
          })
        })

        return _res
      }).then((res) => {
        resolve()
      }).catch((err) => {
        // handle errors
        reject(new Error(err.message))
      })
    })
  }

  /**
   * Change the draft entry content.
   * @param   {string}  content Draft entry content.
   * @return  {Promise}         Promise.
   */
  change (content) {
    return new Promise((resolve, reject) => {
      if (!this._isRetrieved) {
        return reject(new Error('Retrieve first.'))
      }

      const requestBody = {
        title: this.title,
        content
      }

      const config = {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }

      axios.post(`${URLS.BASE}/${this.titleEndpoint}/savedraft`, qs.stringify(requestBody), config)
        .then((res) => {
          if (res.data.Success) {
            this.content = res.data.SavedDraftContent
            resolve()
          } else {
            reject(new Error('An unknow error occurred.'))
          }
        }).catch((err) => {
          reject(new Error(err.message))
        })
    })
  }

  /**
   * Dismiss the draft entry.
   * @return  {Promise} Promise.
   */
  dismiss () {
    return new Promise((resolve, reject) => {
      if (!this._isRetrieved) {
        return reject(new Error('Retrieve first.'))
      }

      const requestBody = {
        title: this.title
      }

      const config = {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }

      axios.post(`${URLS.BASE}/${this.titleEndpoint}/deletedraft`, qs.stringify(requestBody), config)
        .then((res) => {
          resolve()
        }).catch((err) => {
          reject(new Error(err.message))
        })
    })
  }
}

module.exports = DraftEntry
