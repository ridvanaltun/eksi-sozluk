const { URLS } = require('../constants')

/**
 * User favorite author collection.
 */
class UserFavoriteAuthorCollection {
  /**
   * User count.
   *
   * @type {number}
   */
  userCount

  /**
   * User collection.
   *
   * @type {Array<(User|UserForMember)>}
   */
  users = []

  /**
   * Collection owner.
   *
   * @type {string}
   */
  username

  /**
   * Create favorite author collection.
   *
   * @param   {Object}  request         Axios client.
   * @param   {string}  username        Username.
   * @param   {string}  [cookies=null]  Cookie string.
   */
  constructor (request, username, cookies = null) {
    this._request = request
    this._cookies = cookies
    this.username = username
  }

  /**
   * Retrieve favorite users collection.
   *
   * @return  {Promise} Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: URLS.USER_FAVORITE_AUTHORS,
        ajax: true,
        params: {
          nick: this.username
        }
      }

      this._request(requestOptions, $ => {
        const status = $.statusCode

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        $('div table tbody tr').each((i, elm) => {
          const username = $(elm)
            .find('td a')
            .text()
            .replace('takip et', '')
            .trim()

          // dynamically import
          // @see circular dependency issue
          const User = require('./User')
          const UserForMember = require('./UserForMember')

          const user = this._cookies
            ? new UserForMember(this._request, username, this._cookies)
            : new User(this._request, username)
          this.users.push(user)
        })

        this.userCount = this.users.length

        resolve()
      })
    })
  }
}

module.exports = UserFavoriteAuthorCollection