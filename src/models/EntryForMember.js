const axios = require('axios')
const qs = require('querystring')
const Entry = require('./Entry')
const UserForMember = require('./UserForMember')
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
        url: URLS.ENTRY_VOTE,
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
        url: URLS.ENTRY_VOTE,
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
        url: URLS.ENTRY_VOTE_REMOVE,
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
   * List authors of favorited the entry.
   *
   * @returns {Promise.Array<UserForMember>}  Promise.
   */
  listFavoritedAuthors () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: URLS.ENTRY_FAVORITED_AUTHORS,
        ajax: true,
        params: { entryId: this.id },
        cookie: this._cookies
      }
      this._request(requestOptions, $ => {
        const status = $.statusCode

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const authors = []

        $('ul li a').each((i, elm) => {
          const username = $(elm)
            .text()
            .replace('@', '')
          const path = $(elm).attr('href')
          const member = new UserForMember(
            this._request,
            username,
            this._cookies
          )
          member.url = URLS.BASE + path
          authors.push(member)
        })

        resolve(authors)
      })
    })
  }

  /**
   * List rookies of favorited the entry.
   *
   * @returns {Promise.Array<UserForMember>}  Promise.
   */
  listFavoritedRookies () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: URLS.ENTRY_FAVORITED_ROOKIES,
        ajax: true,
        params: { entryId: this.id },
        cookie: this._cookies
      }
      this._request(requestOptions, $ => {
        const status = $.statusCode

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const rookies = []

        $('ul li a').each((i, elm) => {
          const username = $(elm)
            .text()
            .replace('@', '')
          const path = $(elm).attr('href')
          const member = new UserForMember(
            this._request,
            username,
            this._cookies
          )
          member.url = URLS.BASE + path
          rookies.push(member)
        })

        resolve(rookies)
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
