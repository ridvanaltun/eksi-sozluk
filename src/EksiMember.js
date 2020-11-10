const axios = require('axios')
const objectAssignDeep = require('object-assign-deep')
const EksiGuest = require('./EksiGuest')
const c = require('./constants')
const { toEncodeFormUrl, parseDate } = require('./utils')
const { AuthError, VoteError, TagError } = require('./exceptions')
const { entryById, entries, user, tags } = require('./lib')

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
   * Delete an entry from trash.
   * @name DeleteEntryFromTrash
   * @param  {number}  entryId   Entry ID.
   * @return {Promise}           Promise.
   * @ignore
   */
  _deleteEntryFromTrash (entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.trash}/sil`,
          method: 'post',
          params: {
            id: entryId
          },
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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
  }

  /**
   * Recover an entry from trash.
   * @name RecoverEntryFromTrash
   * @deprecated This feature closed, not working.
   * @param  {number}  entryId   Entry ID.
   * @return {Promise}           Promise.
   * @ignore
   */
  _recoverEntryFromTrash (entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.trash}/canlandir`,
          method: 'post',
          params: {
            id: entryId
          },
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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

  /**
   * Follow an user.
   * @name FollowUser
   * @param  {number}  userId   User ID.
   * @return {Promise}          Promise.
   * @ignore
   */
  _followUser (userId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.followUser}/${userId}`,
          method: 'post',
          params: {
            r: 'b'
          },
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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
  }

  /**
   * Unfollow an user.
   * @name UnfollowUser
   * @param  {number}  userId   User ID.
   * @return {Promise}          Promise.
   * @ignore
   */
  _unfollowUser (userId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.unfollowUser}/${userId}`,
          method: 'post',
          params: {
            r: 'b'
          },
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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
  }

  /**
   * Block an user.
   * @name BlockUser
   * @param  {number}  userId   User ID.
   * @return {Promise}          Promise.
   * @ignore
   */
  _blockUser (userId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.blockUser}/${userId}`,
          method: 'post',
          params: {
            r: 'm'
          },
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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
  }

  /**
   * Unblock an user.
   * @name UnblockUser
   * @param  {number}  userId   User ID.
   * @return {Promise}          Promise.
   * @ignore
   */
  _unblockUser (userId) {
    return () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${c.urls.unblockUser}/${userId}`,
          method: 'post',
          params: {
            r: 'm'
          },
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: this.cookies
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
   * @typedef UserForMember
   * @property {number}           id                    User ID.
   * @property {string}           username              Username.
   * @property {string}           user_url              User URL.
   * @property {Array<UserBadge>} user_badges           Badge list.
   * @property {number}           user_badge_points     Badge points.
   * @property {number}           entry_count_total     Total entry count.
   * @property {number}           entry_count_lastmonth Last month entry count.
   * @property {number}           entry_count_lastweek  Last week entry count.
   * @property {number}           entry_count_today     Today entry count.
   * @property {string}           last_entry_time       Last entry time.
   * @property {boolean}          followed              Is user followed?
   * @property {boolean}          blocked               Is user blocked?
   * @property {boolean}          titles_blocked        Is user titles blocked?
   * @property {boolean}          note                  User note.
   * @property {FollowUser}       follow                Follow the user.
   * @property {UnfollowUser}     unfollow              Unfollow the user.
   * @property {BlockUser}        block                 Block the user.
   * @property {UnblockUser}      unblock               Unblock the user.
   */

  /**
   * Fetch user.
   * @param   {string}                  username  Username.
   * @return  {Promise.<UserForMember>}           A promise for the user.
   */
  async user (username) {
    const _user = await user(this._request, username, this.cookies)

    const { id: userId } = _user

    return {
      ..._user,
      follow: this._followUser(userId),
      unfollow: this._unfollowUser(userId),
      block: this._blockUser(userId),
      unblock: this._unblockUser(userId)
    }
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
  async tags () {
    const _tags = await tags(this._request, this.cookies)

    _tags.forEach(tag => {
      tag.follow = this._followTag(tag.id)
      tag.unfollow = this._unfollowTag(tag.id)
    })

    return _tags
  }

  /**
   * @typedef Trash
   * @property {string}                title                   Title.
   * @property {number}                entry_id                Entry ID.
   * @property {string}                entry_url               Entry URL.
   * @property {string}                entry_modify_url        Entry modify URL.
   * @property {boolean}               modify_required         Is modify required?
   * @property {boolean}               deleted_from_eksisozluk Is deleted from Eksi Sozluk?
   * @property {string}                entry_content           Entry content.
   * @property {string}                date_created            Entry date.
   * @property {string}                date_trashed            When trashed.
   * @property {DeleteEntryFromTrash}  delete                  Delete entry.
   * @property {RecoverEntryFromTrash} recover                 Recover entry.
   */

  /**
   * Fetch trash.
   * @param   {Object}                options           Parameters that user can specify.
   * @param   {number}                [options.page=1]  Page number.
   * @return  {Promise.Array<Trash>}                    A promise for the trash.
   */
  trash (options) {
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
        endpoint: '/cop',
        cookie: this.cookies,
        params
      }
      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // success
        if (status === 200) {
          const trash = []
          $('ul#trash-items li article').each((i, elm) => {
            const entryId = parseInt($(elm).find('h2 > a').attr('href').split('/')[2])
            const entryDate = parseDate($(elm).find('footer').text().replace('düzelt canlandır sil', '').trim())
            trash.push({
              title: $(elm).find('h2 > a').text().trim(),
              entry_id: entryId,
              entry_url: c.urls.base + $(elm).find('h2 > a').attr('href'),
              entry_modify_url: c.urls.base + $(elm).find('.links > a').attr('href'),
              entry_content: $(elm).find('div > p').text().trim(),
              date_created: entryDate.created,
              date_trashed: $(elm).find('time').attr('datetime'),
              deleted_from_eksisozluk: $(elm).find('h2 span a').text() === '@ekşisözlük',
              modify_required: $(elm).find('.delete-info').text().includes('düzeltmeniz şart'),
              delete: this._deleteEntryFromTrash(entryId),
              recover: this._recoverEntryFromTrash(entryId)
            })
          })
          resolve(trash)
        }
      })
    })
  }

  /**
   * Empty trash.
   * @return  {Promise}  Promise.
   */
  emptyTrash () {
    return new Promise((resolve, reject) => {
      axios({
        url: `${c.urls.trash}`,
        method: 'get',
        headers: {
          cookie: this.cookies
        }
      }).then((res) => {
        // parse csrf token
        const csrfRegex = new RegExp('(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)', 'u')
        const csrfToken = csrfRegex.exec(res.data)[0]

        return csrfToken
      }).then(async (csrfToken) => {
        // empty trash
        const _res = await axios({
          url: `${c.urls.trash}/bosalt`,
          method: 'post',
          headers: {
            cookie: this.cookies
          },
          data: toEncodeFormUrl({
            __RequestVerificationToken: csrfToken
          })
        })

        return _res
      }).then((res) => {
        if (res.data.includes('<title>büyük başarısızlıklar sözkonusu - ekşi sözlük</title>')) {
          reject(new Error('Unknown Error'))
        } else {
          resolve()
        }
      }).catch((error) => {
        reject(new Error(error.message))
      })
    })
  }
}

module.exports = EksiMember
