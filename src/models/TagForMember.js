const axios = require('axios')
const Tag = require('./Tag')
const c = require('../constants')
const { TagError } = require('../exceptions')

/**
 * Tag for members.
 * @augments Tag
 */
class TagForMember extends Tag {
  /**
   * Tag ID.
   * @type {number}
   */
  id

  /**
   * Is tag followed?
   * @type {boolean}
   */
  followed

  /**
   * Follow tag.
   * @return  {Promise} Promise.
   */
  follow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.tags}/${this.id}/follow`,
        method: 'post',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new TagError(error.message))
        })
    })
  }

  /**
   * Unfollow tag.
   * @return  {Promise} Promise.
   */
  unfollow () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.tags}/${this.id}/unfollow`,
        method: 'post',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie: this._cookies
        }
      })
        .then((res) => {
          resolve()
        })
        .catch((error) => {
          reject(new TagError(error.message))
        })
    })
  }
}

module.exports = TagForMember
