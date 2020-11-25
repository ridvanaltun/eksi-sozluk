const axios = require('axios')
const Tag = require('./Tag')
const { URLS } = require('../constants')

/**
 * Tag for members.
 *
 * @augments Tag
 */
class TagForMember extends Tag {
  /**
   * Tag ID.
   *
   * @type {number}
   */
  id

  /**
   * Is tag followed?
   *
   * @type {boolean}
   */
  followed

  /**
   * Follow tag.
   *
   * @returns {Promise} Promise.
   */
  follow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.TAGS}/${this.id}/follow`,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        resolve()
      })
    })
  }

  /**
   * Unfollow tag.
   *
   * @returns {Promise} Promise.
   */
  unfollow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${URLS.TAGS}/${this.id}/unfollow`,
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      }).then(res => {
        resolve()
      })
    })
  }
}

module.exports = TagForMember
