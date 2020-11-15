const axios = require('axios')
const Entry = require('./Entry')
const { URLS } = require('../constants')
const { toEncodeFormUrl } = require('../utils')
const { VoteError } = require('../exceptions')

/**
 * Entry for members.
 * @augments Entry
 */
class EntryForMember extends Entry {
  /**
   * Is entry favorited?
   * @type {boolean}
   */
  isFavorited

  /**
   * Is entry deleted?
   * @type {boolean}
   */
  isDeleted

  /**
   * Is rookie entry?
   * @type {boolean}
   */
  isRookieEntry

  /**
   * Is entry author me?
   * @type {boolean}
   */
  isEntryAuthorMe

  /**
   * Upvote.
   * @return  {Promise} Promise.
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
        data: toEncodeFormUrl({
          id: this.id,
          rate: 1,
          owner: this.authorId
        })
      })
        .then((res) => {
          // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
          if (res.data.Success) {
            resolve()
          } else {
            reject(new VoteError('Something goes wrong.'))
          }
        })
        .catch((error) => {
          reject(new VoteError(error.message))
        })
    })
  }

  /**
   * Downvote.
   * @return  {Promise} Promise.
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
        data: toEncodeFormUrl({
          id: this.id,
          rate: -1,
          owner: this.authorId
        })
      })
        .then((res) => {
          // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
          if (res.data.Success) {
            resolve()
          } else {
            reject(new VoteError('Something goes wrong.'))
          }
        })
        .catch((error) => {
          reject(new VoteError(error.message))
        })
    })
  }

  /**
   * Remove vote.
   * @return  {Promise} Promise.
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
        data: toEncodeFormUrl({
          id: this.id,
          owner: this.authorId
        })
      })
        .then((res) => {
          // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
          if (res.data.Success) {
            resolve()
          } else {
            reject(new VoteError('Entry not voted before.'))
          }
        })
        .catch((error) => {
          reject(new VoteError(error.message))
        })
    })
  }

  /**
   * Delete the entry from trash.
   * @return  {Promise} Promise.
   */
  deleteFromTrash () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.TRASH}/sil`,
        method: 'POST',
        params: {
          id: this.id
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
   * Recover the entry from trash.
   * @return  {Promise} Promise.
   */
  recoverFromTrash () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.TRASH}/canlandir`,
        method: 'POST',
        params: {
          id: this.id
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
