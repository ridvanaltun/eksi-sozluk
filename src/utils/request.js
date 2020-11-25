const objectAssignDeep = require('object-assign-deep')
const cheerio = require('cheerio')

/**
 * This callback is displayed as part of the EksiSozluk class.
 *
 * @callback requestCallback
 * @param {object} data            Calculated body from cheerio.
 * @param {object} data.statusCode Status code of the request.
 */

/**
 * @typedef Requester
 * @param {object}          options                   HTTP request options.
 * @param {string}          [options.endpoint]        Endpoint of the request.
 * @param {string}          [options.cookie]          Auth cookie.
 * @param {boolean}         [options.ajax=false]      Use ajax HTTP calls.
 * @param {boolean}         [options.encodeURI=true]  Encode URL.
 * @param {string}          [options.method=GET]      HTTP request method.
 * @param {object}          [options.params={}]       HTTP request parameters.
 * @param {requestCallback} cb                        The callback that handles the response.
 */

/**
 * You can make HTTP requests to Eksi Sozluk via this function
 *
 * @param   {object}    httpClient  HTTP client.
 * @returns {Requester}             Handle HTTP requests.
 * @ignore
 */
const request = httpClient => {
  return (options, cb) => {
    // handle default options
    const _options = objectAssignDeep(
      {
        method: 'GET',
        ajax: false,
        encodeURI: true,
        params: {}
      },
      options
    )

    let headers = {}

    // cookie
    if (_options.cookie) {
      headers = { ...headers, cookie: _options.cookie }
    }

    // x-requested-with
    if (_options.ajax) {
      headers = { ...headers, 'x-requested-with': 'XMLHttpRequest' }
    }

    httpClient({
      method: _options.method,
      url: _options.encodeURI
        ? encodeURI(_options.endpoint)
        : _options.endpoint,
      headers,
      params: _options.params,
      transformResponse: body => {
        return cheerio.load(body, {
          normalizeWhitespace: true,
          xmlMode: true
        })
      }
    })
      .then(res => {
        const { data } = res
        data.statusCode = res.status
        cb(data)
      })
      .catch(err => {
        // todo: handle edge cases
        const { data } = err.response
        data.statusCode = err.response.status
        cb(data)
      })
  }
}

module.exports = request
