const axios = require('axios')
const qs = require('querystring')
const Entry = require('./Entry')
const { URLS } = require('../constants')
const { VoteError } = require('../exceptions')

/**
 * Entry for members.
 *
 * @augments Entry
 */
class EntryForMember extends Entry {
  /**
   * Is entry favorited?
   *
   * @type {boolean}
   */
  isFavorited

  /**
   * Is entry deleted?
   *
   * @type {boolean}
   */
  isDeleted

  /**
   * Is rookie entry?
   *
   * @type {boolean}
   */
  isRookieEntry

  /**
   * Is entry author me?
   *
   * @type {boolean}
   */
  isEntryAuthorMe

  /**
   * Upvote.
   *
   * @returns {Promise} Promise.
   */
  upvote () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.VOTE,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        },
        data: qs.stringify({
          id: this.id,
          rate: 1,
          owner: this.authorId
        })
      }).then(res => {
        // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
        if (!res.data.Success) {
          return reject(new VoteError(res.data.Message))
        }

        resolve()
      })
    })
  }

  /**
   * Downvote.
   *
   * @returns {Promise} Promise.
   */
  downvote () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.VOTE,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        },
        data: qs.stringify({
          id: this.id,
          rate: -1,
          owner: this.authorId
        })
      }).then(res => {
        // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
        if (!res.data.Success) {
          return reject(new VoteError(res.data.Message))
        }

        resolve()
      })
    })
  }

  /**
   * Remove vote.
   *
   * @returns {Promise} Promise.
   */
  removevote () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.REMOVE_VOTE,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        },
        data: qs.stringify({
          id: this.id,
          owner: this.authorId
        })
      }).then(res => {
        // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
        if (!res.data.Success) {
          return reject(new VoteError(res.data.Message))
        }

        resolve()
      })
    })
  }

  /**
   * Favorite the entry.
   *
   * @returns {Promise} Promise.
   */
  favorite () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.ENTRY_FAVORITE,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        },
        data: qs.stringify({
          entryId: this.id
        })
      }).then(res => {
        // res.data -> { "Success": true, "ErrorMessage": null, "Count": 2 }
        if (!res.data.Success) {
          return reject(new Error(res.data.ErrorMessage))
        }

        this.favoriteCount = res.data.Count
        this.isFavorited = true
        resolve()
      })
    })
  }

  /**
   * Unfavorite the entry.
   *
   * @returns {Promise} Promise.
   */
  unfavorite () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.ENTRY_UNFAVORITE,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        },
        data: qs.stringify({
          entryId: this.id
        })
      }).then(res => {
        // res.data -> { "Success": true, "ErrorMessage": null, "Count": 2 }
        if (!res.data.Success) {
          return reject(new Error(res.data.ErrorMessage))
        }

        this.favoriteCount = res.data.Count
        this.isFavorited = false
        resolve()
      })
    })
  }

  /**
   * Delete the entry from trash.
   *
   * @returns {Promise} Promise.
   */
  deleteFromTrash () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.TRASH_DELETE,
        method: 'POST',
        params: {
          id: this.id
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then(res => {
          resolve()
        })
        .catch(error => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Recover the entry from trash.
   *
   * @returns {Promise} Promise.
   */
  recoverFromTrash () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.TRASH_RECOVER,
        method: 'POST',
        params: {
          id: this.id
        },
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then(res => {
          resolve()
        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            reject(new Error('Not Permitted'))
          } else {
            reject(new Error(error.message))
          }
        })
    })
  }
}

module.exports = EntryForMember
