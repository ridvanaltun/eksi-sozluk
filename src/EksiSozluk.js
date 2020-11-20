const axios = require('axios')
const setCookie = require('set-cookie-parser')
const qs = require('querystring')
const objectAssignDeep = require('object-assign-deep')
const EksiGuest = require('./EksiGuest')
const EksiMember = require('./EksiMember')
const { request } = require('./utils')
const { URLS } = require('./constants')
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
        baseURL: URLS.BASE
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
          url: URLS.BASE,
          method: 'GET',
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
   * Is verify recaptcha required to login?
   * @return  {Promise.<boolean>} If recaptcha required returns true, otherwise false.
   */
  isRecaptchaRequired () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.LOGIN,
        method: 'GET'
      }).then((res) => {
        // check recaptcha
        const isRecaptchaRequired = res.data.includes('g-recaptcha')

        resolve(isRecaptchaRequired)
      }).catch((err) => {
        // handle errors
        reject(err.message)
      })
    })
  }

  /**
   * @typedef SessionToken
   * @property {string}       value     Token string.
   * @property {(Date|null)}  expiresAt When will token expires?
   */

  /**
   * Create Eksi Sozluk session token with your credentials.
   * @param   {string}        email                       Your email address.
   * @param   {string}        password                    Your password.
   * @param   {Object}        options                     Parameters that user can specify.
   * @param   {boolean}       [options.extendTime=false]  If true, token will expire at 2 weeks later.
   * @return  {SessionToken}                              Eksi Sozluk session token.
   * @throws  {AuthError}                                 User not authorized, password or email is wrong.
   */
  createToken (email, password, options) {
    return new Promise((resolve, reject) => {
      // handle default options
      const _options = objectAssignDeep({
        extendTime: false
      }, options)

      axios({
        url: URLS.LOGIN,
        method: 'GET'
      }).then((res) => {
        // check recaptcha
        const isRecaptchaRequired = res.data.includes('g-recaptcha')

        if (isRecaptchaRequired) {
          return reject(new Error('Recaptcha Required'))
        }

        return res
      }).then((res) => {
        // parse csrf token and cookies
        const csrfRegex = new RegExp('(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)', 'u')
        const csrfToken = csrfRegex.exec(res.data)[0]

        const cookies = setCookie.parse(res.headers['set-cookie'], { map: true })
        const csrfTokenInCookies = cookies.__RequestVerificationToken.value

        return { csrfToken, csrfTokenInCookies }
      }).then(async ({ csrfToken, csrfTokenInCookies }) => {
        const requestBody = {
          UserName: email,
          Password: password,
          RememberMe: _options.extendTime,
          __RequestVerificationToken: csrfToken
        }

        const config = {
          maxRedirects: 0,
          validateStatus: (status) => {
            return status === 302 // accept just redirects
          },
          headers: {
            Cookie: `__RequestVerificationToken=${csrfTokenInCookies};`
          }
        }

        return await axios.post(URLS.LOGIN, qs.stringify(requestBody), config)
      }).then((res) => {
        const isUnknownError = res.data.includes('<title>büyük başarısızlıklar sözkonusu - ekşi sözlük</title>')

        if (isUnknownError) {
          return reject(new Error('Unknown Error'))
        }

        const cookies = setCookie.parse(res.headers['set-cookie'], { map: true })

        resolve({
          value: cookies.a.value, // token
          expiresAt: cookies.a.expires || null
        })
      }).catch((err) => {
        // password or username is wrong
        if (err.response && err.response.status === 404) {
          return reject(new AuthError())
        }

        // handle other errors
        reject(new Error(err.message))
      })
    })
  }

  /**
   * Login Eksi Sozluk with your credentials.
   * @param   {string}      email     Your email address.
   * @param   {string}      password  Your password.
   * @return  {EksiMember}            Eksi Sozluk session.
   * @throws  {AuthError}             User not authorized, password or email is wrong.
   */
  async login (email, password) {
    const token = await this.createToken(email, password, { extendTime: true })
    const cookie = `a=${token.value}`

    // no need for check session token

    return new EksiMember(this.httpClient, cookie)
  }

  /**
   * Login Eksi Sozluk with session cookie.
   * @param   {string}     token   Session token of member.
   * @return  {EksiMember}         Eksi Sozluk session.
   * @throws  {AuthError}          User not authorized.
   */
  async loginWithToken (token) {
    const cookie = `a=${token}`

    // check given session token
    const isAuthenticated = await this.isAuthenticated(cookie)

    if (!isAuthenticated) {
      throw new AuthError()
    }

    return new EksiMember(this.httpClient, cookie)
  }
}

module.exports = EksiSozluk
