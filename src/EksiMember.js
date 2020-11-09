const axios = require('axios')
const objectAssignDeep = require('object-assign-deep')
const EksiGuest = require('./EksiGuest')
const c = require('./constants')
const { toEncodeFormUrl, parseDate } = require('./utils')
const { AuthError, VoteError, TagError } = require('./exceptions')
const { entryById, entries } = require('./lib')

/**
 * @classdesc Eksi Sozluk member class.
 * @augments EksiGuest
 */
class EksiMember extends EksiGuest {
  /**
   * Create an Eksi Sozluk member session.
   * @param   {Object}  httpClient  Axios HTPP client.
   * @param   {string}  cookies     Cookies in string.
   */
  constructor (httpClient, cookies) {
    super(httpClient)
    this.cookies = cookies
  }

  /**
   * Upvote given entry.
   * @name Upvote
   * @param  {number}  authorId  Author ID.
   * @param  {number}  entryId   Entry ID.
   * @return {Promise}           Promise.
   * @ignore
   */
  _upvote (authorId, entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        const rate = 1

        axios({
          url: c.urls.vote,
          method: 'post',
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
          },
          data: toEncodeFormUrl({
            id: entryId,
            rate,
            owner: authorId
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
  }

  /**
   * Downvote given entry.
   * @name Downvote
   * @param  {number}  authorId  Author ID.
   * @param  {number}  entryId   Entry ID.
   * @return {Promise}           Promise.
   * @ignore
   */
  _downvote (authorId, entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        const rate = -1

        axios({
          url: c.urls.vote,
          method: 'post',
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
          },
          data: toEncodeFormUrl({
            id: entryId,
            rate,
            owner: authorId
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
  }

  /**
   * Remove vote given entry.
   * @name Removevote
   * @param  {number}  authorId  Author ID.
   * @param  {number}  entryId   Entry ID.
   * @return {Promise}           Promise.
   * @ignore
   */
  _removevote (authorId, entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: c.urls.removevote,
          method: 'post',
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
          },
          data: toEncodeFormUrl({
            id: entryId,
            owner: authorId
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
  }

  /**
   * Follow tag.
   * @name FollowTag
   * @param  {number}  tagId   Tag ID.
   * @return {Promise}         Promise.
   * @ignore
   */
  _followTag (tagId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.tags}/${tagId}/follow`,
          method: 'post',
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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

  /**
   * Unfollow tag.
   * @name UnfollowTag
   * @param  {number}  tagId   Tag ID.
   * @return {Promise}         Promise.
   * @ignore
   */
  _unfollowTag (tagId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.tags}/${tagId}/unfollow`,
          method: 'post',
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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

  /**
   * Check if unreaded message available.
   * @return  {Promise.<boolean>} New message available or not.
   */
  isNewMessageAvailable () {
    return new Promise((resolve, reject) => {
      axios({
        url: c.urls.base,
        method: 'get',
        headers: {
          cookie: this.cookies
        }
      })
        .then((res) => {
          const regex = /href="\/mesaj"\n*\s*class="new-update"/g
          resolve(regex.test(res.data))
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Check if unreaded event available.
   * @return  {Promise.<boolean>} New event available or not.
   */
  isNewEventAvailable () {
    return new Promise((resolve, reject) => {
      axios({
        url: c.urls.base,
        method: 'get',
        headers: {
          cookie: this.cookies
        }
      })
        .then((res) => {
          const regex = /title="olaylar olaylar"\n*\s*class="new-update"/g
          resolve(regex.test(res.data))
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * @typedef EntryForMember
   * @property {string}        author           Entry author.
   * @property {number}        author_id        Entry author id.
   * @property {string}        author_url       Entry author URL.
   * @property {string}        content          Raw entry content.
   * @property {string}        content_encoded  Cleaned entry content.
   * @property {string}        date_created     Created date.
   * @property {(string|null)} date_modified    Modified date.
   * @property {(string|null)} eksiseyler_link  Eksi Seyler URL.
   * @property {(string|null)} eksiseyler_slug  Eksi Seyler slug.
   * @property {number}        entry_id         Entry id.
   * @property {number}        favorite_count   Favorite count.
   * @property {string}        permalink        Entry link.
   * @property {string}        title            Entry title.
   * @property {number}        title_id         Entry title id.
   * @property {string}        title_slug       Entry title slug.
   * @property {string}        title_url        Entry title URL.
   * @property {Upvote}        upvote           Upvote.
   * @property {Downvote}      downvote         Downvote.
   * @property {Removevote}    removevote       Remove vote.
   */

  /**
   * Fetch entry by id.
   * @param   {number}                    entryId Entry Id.
   * @return  {Promise.<EntryForMember>}          A promise for the entry.
   */
  async entryById (entryId) {
    const entry = await entryById(this._request, entryId)

    // bind authenticated user properties
    const { author_id: authorId } = entry

    return {
      ...entry,
      upvote: this._upvote(authorId, entryId),
      downvote: this._downvote(authorId, entryId),
      removevote: this._removevote(authorId, entryId)
    }
  }

  /**
   * Fetch entries.
   * @param   {string}                        title             Title itself.
   * @param   {Object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @return  {Promise.Array<EntryForMember>}                   A promise for the entries.
   */
  async entries (title, options) {
    const _entries = await entries(this._request, title, options)

    // bind authenticated user properties
    _entries.forEach(entry => {
      const { author_id: authorId, entry_id: entryId } = entry
      entry.upvote = this._upvote(authorId, entryId)
      entry.downvote = this._downvote(authorId, entryId)
      entry.removevote = this._removevote(authorId, entryId)
    })

    return _entries
  }

  /**
   * @typedef TodayEntry
   * @property {string} title       Title.
   * @property {string} title_url   Title URL.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch today.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.Array<TodayEntry>}                   A promise for the today.
   * @throws  {AuthError}                                   User not authorized.
   */
  today (options) {
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1
      },
      options
    )

    // handle params
    const params = {
      p: _options.page
    }

    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: '/basliklar/bugun',
        ajax: true,
        cookie: this.cookies,
        params
      }
      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const today = []
          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            today.push({
              title: title.substring(0, title.length - (entryCount.length + 1)), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount)
                  ? parseInt(entryCount)
                  : 1 // calculate entry count
            })
          })
          resolve(today)
        }

        // not authorized
        if (status === 404) {
          reject(new AuthError())
        }
      })
    })
  }

  /**
   * @typedef RookieEntry
   * @property {string} title       Title.
   * @property {string} title_url   Title URL.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch rookie entries.
   * @param   {Object}                      options           Parameters that user can specify.
   * @param   {number}                      [options.page=1]  Page number.
   * @return  {Promise.Array<RookieEntry>}                    A promise for the rookie entries.
   * @throws  {AuthError}                                     User not authorized.
   */
  rookieEntries (options) {
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1
      },
      options
    )

    // handle params
    const params = {
      p: _options.page
    }

    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: '/basliklar/caylaklar',
        ajax: true,
        cookie: this.cookies,
        params
      }
      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const rookieEntries = []
          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            rookieEntries.push({
              title: title.substring(0, title.length - (entryCount.length + 1)), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount)
                  ? parseInt(entryCount)
                  : 1 // calculate entry count
            })
          })
          resolve(rookieEntries)
        }

        // not authorized
        if (status === 403) {
          reject(new AuthError())
        }
      })
    })
  }

  /**
   * @typedef Event
   * @property {string} title       Title.
   * @property {string} title_url   Title URL.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch events.
   * @return {Promise.Array<Event>} A promise for the events.
   * @throws {AuthError}            User not authorized.
   */
  events () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: '/basliklar/olay',
        ajax: true,
        cookie: this.cookies
      }
      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const events = []
          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            events.push({
              title: title
                .substring(0, title.length - entryCount.length)
                .trim(), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount)
                  ? parseInt(entryCount)
                  : 0 // calculate entry count
            })
          })
          resolve(events)
        }

        // not authorized
        if (status === 403) {
          reject(new AuthError())
        }
      })
    })
  }

  /**
   * @typedef Draft
   * @property {string}         title         Title.
   * @property {string}         title_url     Title URL.
   * @property {string}         date_created  Created date.
   * @property {(string|null)}  date_modified Modified date.
   */

  /**
   * Fetch drafts.
   * @param   {Object}                options           Parameters that user can specify.
   * @param   {number}                [options.page=1]  Page number.
   * @return  {Promise.Array<Draft>}                    A promise for the drafts.
   * @throws  {AuthError}                               User not authorized.
   */
  drafts (options) {
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1
      },
      options
    )

    // handle params
    const params = {
      p: _options.page
    }

    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: '/basliklar/kenar',
        ajax: true,
        cookie: this.cookies,
        params
      }
      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const drafts = []
          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const date = $(elm).find('a div').text().trim()
            const calculatedDate = parseDate(date)
            drafts.push({
              title: title.substring(0, title.length - date.length).trim(), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              date_created: calculatedDate.created,
              date_modified: calculatedDate.modified
            })
          })
          resolve(drafts)
        }

        // not authorized
        if (status === 403) {
          reject(new AuthError())
        }
      })
    })
  }

  /**
   * @typedef FollowedUserEntry
   * @property {string} title       Title.
   * @property {string} title_url   Title URL.
   * @property {string} entry_owner Author username.
   */

  /**
   * Fetch followed user entries.
   * @param   {Object}                            options           Parameters that user can specify.
   * @param   {number}                            [options.page=1]  Page number.
   * @return  {Promise.Array<FollowedUserEntry>}                    A promise for the followed user entries.
   * @throws  {AuthError}                                           User not authorized.
   */
  followedUserEntries (options) {
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1
      },
      options
    )

    // handle params
    const params = {
      p: _options.page
    }

    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: '/basliklar/takipentry',
        ajax: true,
        cookie: this.cookies,
        params
      }
      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const followedUserEntries = []
          $('ul.topic-list.partial li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const owner = $(elm).find('a div').text().trim()
            followedUserEntries.push({
              title: title.substring(0, title.length - owner.length).trim(), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_owner: owner
            })
          })
          resolve(followedUserEntries)
        }

        // not authorized
        if (status === 403) {
          reject(new AuthError())
        }
      })
    })
  }

  /**
   * @typedef TagForMember
   * @property {number}       id          Tag ID.
   * @property {string}       name        Tag name.
   * @property {string}       description Tag description.
   * @property {string}       link        Tag URL.
   * @property {boolean}      followed    Is tag followed?
   * @property {FollowTag}    follow      Follow the tag.
   * @property {UnfollowTag}  unfollow    Unfollow the tag.
   */

  /**
   * Fetch tags.
   * @return  {Promise.Array<TagForMember>} A promise for the tags.
   */
  tags () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/kanallar', cookie: this.cookies }, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const tags = []
          $('ul#channel-follow-list li').each((i, elm) => {
            const tagId = parseInt($(elm).find('button').data('follow-url').split('/')[2])
            tags.push({
              id: tagId,
              name: $(elm).find('h3 a').text().substring(1, $(elm).find('h3 a').text().length),
              description: $(elm).find('p').text(),
              link: c.urls.base + $(elm).find('h3 a').attr('href'),
              followed: $(elm).find('button').data('followed'),
              follow: this._followTag(tagId),
              unfollow: this._unfollowTag(tagId)
            })
          })
          resolve(tags)
        }
      })
    })
  }
}

module.exports = EksiMember
