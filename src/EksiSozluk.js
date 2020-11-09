const axios = require('axios')
const objectAssignDeep = require('object-assign-deep')
const EksiGuest = require('./EksiGuest')
const EksiMember = require('./EksiMember')
const { request } = require('./utils')
const c = require('./constants')
const { AuthError } = require('./exceptions')

/**
 * @classdesc Manage all Eksi Sozluk abilities.
 * @augments EksiGuest
 */
class EksiSozluk extends EksiGuest {
  /**
   * Create an Eksi Sozluk instance
   * @param   {Object}  options                                             Eksi Sozluk instance settings
   * @param   {Object}  options.httpClient                                  Axios settings as HTTP client, all Axios settings are useable
   * @param   {number}  [options.httpClient.timeout=3000]                   Timeout of requests in miliseconds
   * @param   {string}  [options.httpClient.baseURL=https://eksisozluk.com] Base URL of Eksi Sozluk, you can use proxy here
   */
  constructor (options) {
    // handle default options
    const _options = objectAssignDeep({
      httpClient: {
        timeout: 3000,
        baseURL: c.urls.base
      }
    }, options)

    // make http client ready
    const httpClient = axios.create(_options.httpClient)

    super(httpClient)

    this._request = request(httpClient)
  }

  /**
   * Chech is user authenticated or not.
   * @param   {string}            [cookies=this.cookies]  Cookies string.
   * @return  {Promise.<boolean>}                         If user authenticated returns true, otherwise false.
   */
  isAuthenticated (cookies = this.cookies) {
    return new Promise((resolve, reject) => {
      if (cookies) {
        axios({
          url: c.urls.base,
          method: 'get',
          headers: {
            cookie: cookies
          }
        })
          .then((res) => {
            const isLoggedIn = res.data.includes('data-logged-in="true"')
            resolve(isLoggedIn)
          })
          .catch((error) => {
            reject(new Error(error.message))
          })
      } else {
        // cookies not exist, return false
        resolve(false)
      }
    })
  }

  /**
   * Login with Eksi Sozluk cookies
   * @param  {string}    cookies Eksi Sozluk member's session cookies.
   * @throws {AuthError}         User not authorized.
   */
  async loginWithCookies (cookies) {
    const isAuthenticated = await this.isAuthenticated(cookies)

    if (!isAuthenticated) {
      throw new AuthError()
    }

    // success
    return new EksiMember(this.httpClient, cookies)
  }
}

module.exports = EksiSozluk
