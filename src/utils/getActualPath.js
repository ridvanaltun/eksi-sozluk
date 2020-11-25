const axios = require('axios')
const { URLS } = require('../constants')

/**
 * Converts title to actual path.
 *
 * @param   {string}            title Title.
 * @returns {Promise.<string>}        Actual path.
 * @ignore
 */
const getActualPath = title => {
  return new Promise((resolve, reject) => {
    const target = encodeURI(URLS.BASE + '/' + title)
    axios
      .get(target)
      .then(res => {
        resolve(res.request.path.replace('/', ''))
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          // return actual path anyway
          return resolve(err.response.request.path.replace('/', ''))
        }

        // handle other errors
        reject(err)
      })
  })
}

module.exports = getActualPath
