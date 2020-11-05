'use strict'

const EksiGeneral = require('./EksiGeneral')
const EksiMember = require('./EksiMember')
const axios = require('axios')
const objectAssignDeep = require('object-assign-deep')
const c = require('./constants')

/**
 * @classdesc Manage all Eksi Sozluk abilities.
 * @augments  EksiGeneral
 */
class EksiSozluk extends EksiGeneral {
  /**
   * Create an Eksi Sozluk instance
   * @param   {Object}  options                                             Eksi Sozluk instance settings
   * @param   {Object}  options.httpClient                                  Axios settings as HTTP client, all Axios settings are useable
   * @param   {number}  [options.httpClient.timeout=3000]                   Timeout of requests in miliseconds
   * @param   {string}  [options.httpClient.baseURL=https://eksisozluk.com] Base URL of Eksi Sozluk, you can use proxy here
   */
  constructor (options) {
    super()

    // handle default options
    const _options = objectAssignDeep({
      httpClient: {
        timeout: 3000,
        baseURL: c.urls.base
      }
    }, options)

    // make http client ready
    this.httpClient = axios.create(_options.httpClient)
  }

  /**
   * Login with Eksi Sozluk cookies
   * @param   {string}      cookies   Eksi Sozluk member cookies
   * @return  {EksiMember}            Access of Eksi Sozluk member functionalities
   */
  loginWithCookies (cookies) {
    // todo: test cookies
    return new EksiMember(cookies, this.httpClient)
  }
}

module.exports = EksiSozluk
