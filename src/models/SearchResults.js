const axios = require('axios')
const User = require('./User')
const UserForMember = require('./UserForMember')
const EntryCollection = require('./EntryCollection')
const { URLS } = require('../constants')

/**
 * Search results.
 */
class SearchResults {
  /**
   * Search text.
   * @type {string}
   */
  searchText

  /**
   * Users.
   * @type {Array<(User|UserForMember)>}
   */
  users = []

  /**
   * Titles.
   * @type {Array<EntryCollection>}
   */
  titles = []

  /**
   * Create search results.
   * @param {Object}  request         Axios client.
   * @param {string}  text            Search text.
   * @param {string}  [cookies=null]  Cookie string.
   */
  constructor (request, text, cookies = null) {
    this.searchText = text
    this._request = request
    this._cookies = cookies
  }

  /**
   * Retrieve search results.
   * @return  {Promise} Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.SEARCH,
        method: 'GET',
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        },
        params: {
          q: this.searchText
        }
      })
        .then((res) => {
          // handle users
          res.data.Nicks.forEach(username => {
            const user = this._cookies ? new UserForMember(this._request, username, this._cookies) : new User(this._request, username)
            this.users.push(user)
          })

          // handle titles
          res.data.Titles.forEach(titleName => {
            const title = new EntryCollection(this._request, titleName, { cookies: this._cookies })
            this.titles.push(title)
          })

          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }
}

module.exports = SearchResults
