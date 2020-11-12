const axios = require('axios')
const User = require('./User')
const c = require('../constants')
const { toEncodeFormUrl } = require('../utils')

/**
 * User for members.
 * @augments User
 */
class UserForMember extends User {
  /**
   * User ID.
   * @type {number}
   */
  id

  /**
   * Is user followed?
   * @type {boolean}
   */
  isFollowed

  /**
   * Is user blocked?
   * @type {boolean}
   */
  isBlocked

  /**
   * Is user titles blocked?
   * @type {boolean}
   */
  isTitlesBlocked

  /**
   * User note.
   * @type {string}
   */
  note

  /**
   * Follow the user.
   * @return  {Promise} Promise.
   */
  follow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.followUser}/${this.id}`,
        method: 'post',
        params: {
          r: 'b'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Unfollow the user.
   * @return  {Promise} Promise.
   */
  unfollow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.unfollowUser}/${this.id}`,
        method: 'post',
        params: {
          r: 'b'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Block the user.
   * @return  {Promise} Promise.
   */
  block () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.blockUser}/${this.id}`,
        method: 'post',
        params: {
          r: 'm'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Unblock the user.
   * @return  {Promise} Promise.
   */
  unblock () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.unblockUser}/${this.id}`,
        method: 'post',
        params: {
          r: 'm'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Block user titles.
   * @return  {Promise} Promise.
   */
  blockTitles () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.blockUserTitles}/${this.id}`,
        method: 'post',
        params: {
          r: 'i'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Unblock user titles.
   * @return  {Promise} Promise.
   */
  unblockTitles () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.unblockUserTitles}/${this.id}`,
        method: 'post',
        params: {
          r: 'i'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Send message to an user.
   * @param   {string}  message Message.
   * @return  {Promise}         Promise.
   */
  sendMessage (message) {
    return new Promise((resolve, reject) => {
      axios({
        url: c.urls.message,
        method: 'get',
        headers: {
          cookie: this._cookies
        }
      }).then((res) => {
        // parse csrf token
        const csrfRegex = new RegExp('(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)', 'g')

        // 0 -> message list form, 1 -> message send
        // if 1 not exist 0 -> message send
        const csrfTokens = csrfRegex.exec(res.data)
        const csrfToken = csrfTokens.length === 2 ? csrfTokens[1] : csrfTokens[0]

        return csrfToken
      }).then(async (csrfToken) => {
        // send message
        const _res = await axios({
          url: c.urls.sendMessage,
          method: 'post',
          headers: {
            cookie: this._cookies
          },
          data: toEncodeFormUrl({
            __RequestVerificationToken: csrfToken,
            To: this.username,
            Message: message
          })
        })

        return _res
      }).then((res) => {
        resolve()
      }).catch((error) => {
        reject(new Error(error.message))
      })
    })
  }
}

module.exports = UserForMember
