'use strict'

const EksiGeneral = require('./EksiGeneral')
const axios = require('axios')
const cheerio = require('cheerio')
const objectAssignDeep = require('object-assign-deep')
const c = require('./constants')

/**
 * Eksi Sozluk
 *
 * Manage all Eksi Sozluk abilities from this class.
 *
 * @augments EksiGeneral
 */
class EksiSozluk extends EksiGeneral {
  /**
   * Create an Eksi Sozluk instance
   *
   * @constructor
   *
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
    this.httpClient = axios.create({
      timeout: _options.httpClient.timeout,
      baseURL: _options.httpClient.baseURL
    })
  }

  /**
   * This callback is displayed as part of the EksiSozluk class.
   *
   * @callback Requester~requestCallback
   *
   * @param {Object} data            Calculated body from cheerio
   * @param {Object} data.statusCode Status code of the request
   */

  /**
   * Make HTTP request to Eksi Sozluk via this function
   *
   * @param   {string}          endpoint  Endpoint of request
   * @param   {requestCallback} cb        The callback that handles the response.
   *
   * @ignore
   */
  _request (endpoint, cb) {
    const options = {
      method: 'get',
      url: encodeURI(endpoint),
      transformResponse: (body) => {
        return cheerio.load(body, {
          normalizeWhitespace: true,
          xmlMode: true
        })
      }
    }

    this.httpClient(options)
      .then((res) => {
        const { data } = res
        data.statusCode = res.status
        cb(data)
      })
      .catch((err) => {
        // todo: handle edge cases
        console.log(err)
        const { data } = err.response
        data.statusCode = err.response.status
        cb(data)
      })
  }
}

module.exports = EksiSozluk
