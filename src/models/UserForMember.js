const axios = require('axios')
const qs = require('querystring')
const User = require('./User')
const { URLS } = require('../constants')

/**
 * User for members.
 *
 * @augments User
 */
class UserForMember extends User {
  /**
   * User ID.
   *
   * @type {number}
   */
  id

  /**
   * Is user followed?
   *
   * @type {boolean}
   */
  isFollowed

  /**
   * Is user blocked?
   *
   * @type {boolean}
   */
  isBlocked

  /**
   * Is user titles blocked?
   *
   * @type {boolean}
   */
  isTitlesBlocked

  /**
   * User note.
   *
   * @type {string}
   */
  note

  /**
   * Follow the user.
   *
   * @returns {Promise} Promise.
   */
  follow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.FOLLOW_USER}/${this.id}`,
        method: 'POST',
        params: {
          r: 'b'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.isFollowed = true
        resolve()
      })
    })
  }

  /**
   * Unfollow the user.
   *
   * @returns {Promise} Promise.
   */
  unfollow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.UNFOLLOW_USER}/${this.id}`,
        method: 'POST',
        params: {
          r: 'b'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.isFollowed = false
        resolve()
      })
    })
  }

  /**
   * Block the user.
   *
   * @returns {Promise} Promise.
   */
  block () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.BLOCK_USER}/${this.id}`,
        method: 'POST',
        params: {
          r: 'm'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.isBlocked = true
        resolve()
      })
    })
  }

  /**
   * Unblock the user.
   *
   * @returns {Promise} Promise.
   */
  unblock () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.UNBLOCK_USER}/${this.id}`,
        method: 'POST',
        params: {
          r: 'm'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.isBlocked = false
        resolve()
      })
    })
  }

  /**
   * Block user titles.
   *
   * @returns {Promise} Promise.
   */
  blockTitles () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.BLOCK_USER_TITLES}/${this.id}`,
        method: 'POST',
        params: {
          r: 'i'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.isTitlesBlocked = true
        resolve()
      })
    })
  }

  /**
   * Unblock user titles.
   *
   * @returns {Promise} Promise.
   */
  unblockTitles () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.UNBLOCK_USER_TITLES}/${this.id}`,
        method: 'POST',
        params: {
          r: 'i'
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.isTitlesBlocked = false
        resolve()
      })
    })
  }

  /**
   * Send message to an user.
   *
   * @param   {string}  message Message.
   * @returns {Promise}         Promise.
   */
  sendMessage (message) {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.MESSAGE,
        method: 'GET',
        headers: {
          cookie: this._cookies
        }
      })
        .then(res => {
          // parse csrf token
          const csrfRegex = new RegExp(
            '(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)',
            'g'
          )

          // 0 -> message list form, 1 -> message send
          // if 1 not exist 0 -> message send
          const csrfTokens = csrfRegex.exec(res.data)
          const csrfToken =
            csrfTokens.length === 2 ? csrfTokens[1] : csrfTokens[0]

          return csrfToken
        })
        .then(async csrfToken => {
          // send message
          const _res = await axios({
            url: URLS.SEND_MESSAGE,
            method: 'POST',
            headers: {
              cookie: this._cookies
            },
            data: qs.stringify({
              __RequestVerificationToken: csrfToken,
              To: this.username,
              Message: message
            })
          })

          return _res
        })
        .then(res => {
          resolve()
        })
    })
  }

  /**
   * Set the user note.
   *
   * @param   {string}  note  New note.
   * @returns {Promise}       Promise.
   */
  setNote (note) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.BASE}/biri/${this.username}/note`,
        method: 'POST',
        data: qs.stringify({
          who: this.id,
          usernote: note
        }),
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        this.note = note
        resolve()
      })
    })
  }

  /**
   * Clear the user note.
   *
   * @returns {Promise}  Promise.
   */
  async clearNote () {
    await this.setNote('')
  }
}

module.exports = UserForMember
