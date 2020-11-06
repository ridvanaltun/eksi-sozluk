'use strict'

const axios = require('axios')
const cheerio = require('cheerio')
const objectAssignDeep = require('object-assign-deep')
const { date: d, toEncodeFormUrl } = require('./utils')
const c = require('./constants')
const e = require('./exceptions')

/**
 * @classdesc Manage all Eksi Sozluk abilities.
 */
class EksiSozluk {
  /**
   * Create an Eksi Sozluk instance
   * @param   {Object}  options                                             Eksi Sozluk instance settings
   * @param   {Object}  options.httpClient                                  Axios settings as HTTP client, all Axios settings are useable
   * @param   {number}  [options.httpClient.timeout=3000]                   Timeout of requests in miliseconds
   * @param   {string}  [options.httpClient.baseURL=https://eksisozluk.com] Base URL of Eksi Sozluk, you can use proxy here
   */
  constructor (options) {
    // handle default options
    const _options = objectAssignDeep({
      httpClient: {
        timeout: 3000,
        baseURL: c.urls.base
      }
    }, options)

    // make http client ready
    this.httpClient = axios.create(_options.httpClient)

    // cookies
    this.cookies = null
  }

  /**
   * This callback is displayed as part of the EksiSozluk class.
   * @callback Requester~requestCallback
   * @param {Object} data            Calculated body from cheerio
   * @param {Object} data.statusCode Status code of the request
   */

  /**
   * You can make HTTP requests to Eksi Sozluk via this function
   * @param   {Object}          options               HTTP request options
   * @param   {string}          options.endpoint      Endpoint of the request
   * @param   {string}          [options.cookie]      Auth cookie
   * @param   {boolean}         [options.ajax=false]  Use ajax HTTP calls
   * @param   {string}          [options.method=get]  HTTP request method
   * @param   {requestCallback} cb                    The callback that handles the response.
   * @ignore
   */
  _request (options, cb) {
    // handle default options
    const _options = objectAssignDeep({
      method: 'get',
      ajax: false
    }, options)

    let headers = {}

    // cookie
    if (_options.cookie) {
      headers = { ...headers, cookie: _options.cookie }
    }

    // x-requested-with
    if (_options.ajax) {
      headers = { ...headers, 'x-requested-with': 'XMLHttpRequest' }
    }

    this.httpClient({
      method: _options.method,
      url: encodeURI(_options.endpoint),
      headers,
      params: _options.params ? _options.params : {},
      transformResponse: (body) => {
        return cheerio.load(body, {
          normalizeWhitespace: true,
          xmlMode: true
        })
      }
    })
      .then((res) => {
        const { data } = res
        data.statusCode = res.status
        cb(data)
      })
      .catch((err) => {
        // todo: handle edge cases
        const { data } = err.response
        data.statusCode = err.response.status
        cb(data)
      })
  }

  /**
   * Login with Eksi Sozluk cookies
   * @param {string} cookies Eksi Sozluk member cookies
   */
  loginWithCookies (cookies) {
    // todo: test cookies
    this.cookies = cookies
  }

  /**
   * Upvote given entry.
   * @name Upvote
   * @function
   * @return {Promise} Promise.
   * @ignore
   */
  _upvote (authorId, entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        const rate = 1

        axios({
          url: c.urls.vote,
          method: 'post',
          headers: { 'x-requested-with': 'XMLHttpRequest' },
          data: toEncodeFormUrl({
            id: entryId,
            rate,
            owner: authorId
          })
        })
          .then((res) => {
            // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
            resolve()
          })
          .catch((error) => {
            reject(new e.VoteError(error.message))
          })
      })
    }
  }

  /**
   * Downvote given entry.
   * @name Downvote
   * @function
   * @return {Promise} Promise.
   * @ignore
   */
  _downvote (authorId, entryId) {
    return () => {
      return new Promise((resolve, reject) => {
        const rate = -1

        axios({
          url: c.urls.vote,
          method: 'post',
          headers: { 'x-requested-with': 'XMLHttpRequest' },
          data: toEncodeFormUrl({
            id: entryId,
            rate,
            owner: authorId
          })
        })
          .then((res) => {
            // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
            resolve()
          })
          .catch((error) => {
            reject(new e.VoteError(error.message))
          })
      })
    }
  }

  /**
   * @typedef YesterdayTopEntry
   * @property {string} title Title.
   * @property {string} url   Title URL.
   */

  /**
   * Fetch yesterday's top entries.
   * @param   {Object}                            options               Parameters that user can specify.
   * @param   {number}                            [options.limit=null]  The result limits.
   * @return  {Promise.Array<YesterdayTopEntry>}                        A promise for the yesterday's top entries.
   */
  debe (options) {
    return new Promise((resolve, reject) => {
      // handle default options
      const _options = objectAssignDeep({
        limit: null
      }, options)

      this._request({ endpoint: '/m/debe' }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          let debe = $('li', 'ul.topic-list.partial.mobile')
            .map(function () {
              return {
                title: $(this).text().trim(),
                url: c.urls.base + $(this).find('a').attr('href')
              }
            })
            .get()

          if (_options.limit) debe = debe.slice(0, _options.limit)

          resolve(debe)
        } else if (status === 404) {
          reject(new e.NotFoundError('Debe not found.'))
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef Entry
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
   * @property {Upvote}        upvote           Upvote function.
   * @property {Downvote}      downvote         Downvote function.
   */

  /**
   * Fetch entry by id.
   * @param   {number}          entryId Entry Id.
   * @return  {Promise.<Entry>}         A promise for the entry.
   */
  entryById (entryId) {
    return new Promise((resolve, reject) => {
      const { _upvote: upvote, _downvote: downvote } = this

      this._request({ endpoint: `/entry/${entryId}` }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const date = d(
            $('ul#entry-item-list li footer div.info a.permalink').text()
          )
          const isEksiseylerExist =
            $('ul#entry-item-list li').data('seyler-slug') !== ''

          const authorId = $('ul#entry-item-list li').data('author-id')

          const entry = {
            author: $('ul#entry-item-list li').data('author'),
            author_id: authorId,
            author_url: c.urls.user + $('ul#entry-item-list li').data('author'),
            content: $('ul#entry-item-list li div.content').html(),
            content_encoded: $('ul#entry-item-list li div.content')
              .text()
              .trim(),
            date_created: date.created,
            date_modified: date.modified,
            eksiseyler_link: isEksiseylerExist
              ? c.urls.seyler + $('ul#entry-item-list li').data('seyler-slug')
              : null,
            eksiseyler_slug: isEksiseylerExist
              ? $('ul#entry-item-list li').data('seyler-slug')
              : null,
            entry_id: entryId,
            favorite_count: $('ul#entry-item-list li').data('favorite-count'),
            permalink: c.urls.entry + entryId,
            title: $('h1#title').data('title'),
            title_id: $('h1#title').data('id'),
            title_slug: $('h1#title').data('slug'),
            title_url: c.urls.base + $('h1#title a').attr('href'),
            upvote: upvote(authorId, entryId),
            downvote: downvote(authorId, entryId)
          }
          resolve(entry)
        } else if (status === 404) {
          reject(new e.NotFoundError('Entry not found.'))
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * Fetch entries.
   * @param   {string}                title             Title itself.
   * @param   {Object}                options           Parameters that user can specify.
   * @param   {number}                [options.page=1]  Page number.
   * @return  {Promise.Array<Entry>}                    A promise for the entries.
   */
  entries (title, options) {
    return new Promise((resolve, reject) => {
      // handle default options
      const _options = objectAssignDeep({
        page: 1
      }, options)

      // handle params
      const params = {
        q: title,
        p: _options.page
      }

      const { _upvote: upvote, _downvote: downvote } = this

      this._request({ endpoint: '/', params }, ($) => {
        const status = $.statusCode
        const entries = []

        if (status === 200) {
          $('ul#entry-item-list li').each(function (i, elm) {
            const date = d($(elm).find('a.entry-date').text())
            const isEksiseylerExist = $(elm).data('seyler-slug') !== ''

            const authorId = $(elm).data('author-id')
            const entryId = $(elm).data('id')

            entries.push({
              author: $(elm).data('author'),
              author_id: authorId,
              author_url: c.urls.user + $(elm).data('author'),
              content: $(elm).find('div.content').html(),
              content_encoded: $(elm).find('div.content').text().trim(),
              date_created: date.created,
              date_modified: date.modified,
              eksiseyler_link: isEksiseylerExist
                ? c.urls.seyler + $(elm).data('seyler-slug')
                : null,
              eksiseyler_slug: isEksiseylerExist
                ? $(elm).data('seyler-slug')
                : null,
              entry_id: entryId,
              favorite_count: $(elm).data('favorite-count'),
              permalink: c.urls.base + $(elm).find('a.entry-date').attr('href'),
              title: $('h1#title').data('title'),
              title_id: $('h1#title').data('id'),
              title_slug: $('h1#title').data('slug'),
              title_url: c.urls.base + $('h1#title a').attr('href'),
              upvote: upvote(authorId, entryId),
              downvote: downvote(authorId, entryId)
            })
          })
          resolve(entries)
        } else if (status === 404) {
          reject(new e.NotFoundError('Entries not found.'))
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef TitleByTag
   * @property {string} title       Title.
   * @property {string} title_link  Title URL.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch titles by tag.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.Array<TitleByTag>}                   A promise for the titles by tag.
   */
  titlesByTag (tagName, options) {
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
      this._request({
        endpoint: `/basliklar/kanal/${tagName}`,
        ajax: true,
        params
      }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const titles = []

          $('ul.topic-list.partial li a').each(function (i, elm) {
            const title = $(elm).text()
            const entryCount = $(elm).find('small').text()
            titles.push({
              title: title.substring(0, title.length - (entryCount.length)).trim(),
              title_link: c.urls.base + $(elm).attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount) ? parseInt(entryCount) : 1 // calculate entry count,,
            })
          })

          resolve(titles)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef Tag
   * @property {string} name        Tag name.
   * @property {string} description Tag description.
   * @property {string} link        Tag URL.
   */

  /**
   * Fetch tags.
   * @return  {Promise.Array<Tag>} A promise for the tags.
   */
  tags () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/kanallar' }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const tags = []

          $('ul#channel-follow-list li').each(function (i, elm) {
            tags.push({
              name: $(elm).find('h3 a').text().substring(1, $(elm).find('h3 a').text().length),
              description: $(elm).find('p').text(),
              link: c.urls.base + $(elm).find('h3 a').attr('href')
            })
          })

          resolve(tags)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef Agenda
   * @property {string} title       Entry title.
   * @property {string} title_link  Entry title link.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch agenda.
   * @return {Promise.Array<Agenda>} A promise for the agenda.
   */
  agenda () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/basliklar/gundem', ajax: true }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const agenda = []

          $('ul.topic-list.partial li a').each(function (i, elm) {
            const title = $(elm).text()
            const entryCount = $(elm).find('small').text()

            agenda.push({
              title: title.substring(0, title.length - (entryCount.length + 1)), // clear title,
              title_link: c.urls.base + $(elm).attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount) // calculate entry count,
            })
          })

          resolve(agenda)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef Question
   * @property {string} title           Entry title.
   * @property {string} question_title  Question title.
   * @property {string} question_link   Question URL.
   * @property {number} answer_count    Answer count.
   */

  /**
   * Fetch questions.
   * @return {Promise.Array<Question>} A promise for the question.
   */
  questions () {
    return new Promise((resolve, reject) => {
      this._request({ endpoint: '/basliklar/sorunsal', ajax: true }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          const questions = []

          $('ul.topic-list.partial li a').each(function (i, elm) {
            const title = $(elm).find('div').text()
            const answerCount = $(elm).find('small').text()
            const questionTitle = $(elm).text().split(title)[0]

            questions.push({
              title: title.substring(1, title.length - 1), // clear title,
              question_title: questionTitle.substring(0, questionTitle.length - 1), // delete last white space
              question_link: c.urls.base + $(elm).attr('href'),
              answer_count: answerCount.includes('b')
                ? 1000 * parseInt(answerCount)
                : parseInt(answerCount) // calculate answer count,
            })
          })

          resolve(questions)
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef TodayInHistory
   * @property {string} title       Entry title.
   * @property {string} title_link  Entry title link.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch today in history.
   * @param   {string}                        year              A year.
   * @param   {Object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @return  {Promise.Array<TodayInHistory>}                   A promise for the today in history.
   */
  todayInHistory (year, options) {
    return new Promise((resolve, reject) => {
      // handle default options
      const _options = objectAssignDeep({
        page: 1
      }, options)

      // handle params
      const params = {
        year,
        p: _options.page
      }

      this._request({ endpoint: '/basliklar/m/tarihte-bugun', params }, ($) => {
        const status = $.statusCode
        const titles = []

        if (status === 200) {
          $('ul.topic-list.partial.mobile li').each(function (i, elm) {
            const title = $(elm).text().trim()
            const entryCount = $(elm).find('a small').text().trim()
            titles.push({
              title: title.substring(0, title.length - (entryCount.length + 1)), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              entry_count: entryCount.includes('b')
                ? 1000 * parseInt(entryCount)
                : parseInt(entryCount) // calculate entry count
            })
          })
          resolve(titles)
        } else if (status === 404) {
          reject(new e.NotFoundError('Today in history not found.'))
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
  }

  /**
   * @typedef UserBadge
   * @property {string}         name        Badge name.
   * @property {(string|null)}  description Badge description.
   */

  /**
   * @typedef User
   * @property {string}           username              Username.
   * @property {string}           user_url              User URL.
   * @property {Array<UserBadge>} user_badges           Badge list.
   * @property {number}           user_badge_points     Badge points.
   * @property {number}           entry_count_total     Total entry count.
   * @property {number}           entry_count_lastmonth Last month entry count.
   * @property {number}           entry_count_lastweek  Last week entry count.
   * @property {number}           entry_count_today     Today entry count.
   * @property {string}           last_entry_time       Last entry time.
   */

  /**
   * Fetch user.
   * @param   {string}          username  Username.
   * @return  {Promise.<User>}            A promise for the user.
   */
  user (username) {
    return new Promise((resolve, reject) => {
      // make username url ready
      username = username.replace(' ', '-')

      this._request({ endpoint: `/biri/${username}` }, ($) => {
        const status = $.statusCode

        if (status === 200) {
          // start - split badges
          const badges = []
          let badgePoints = null
          const badgeCount = $('ul#user-badges li').length

          $('ul#user-badges li').each((i, elm) => {
            if (i === badgeCount - 1) {
              // last badge
              const badgeText = $(elm).text()
              const badge = badgeText.replace(/[0-9]/g, '')
              badges.push({
                name: badge.substring(0, badge.length - 3),
                description: null
              })
              // scrape badge points
              badgePoints = parseInt(badgeText.replace(/^.*?(\d+).*/, '$1'))
            } else {
              badges.push({
                name: $(elm).text(),
                description: $(elm).find('a').attr('title')
              })
            }
          })
          // end - split badges

          const user = {
            username: $('h1#user-profile-title a').text(),
            user_url: c.urls.user + username,
            user_badges: badges,
            user_badge_points: badgePoints,
            entry_count_total: parseInt($('ul li#entry-count-total').text()),
            entry_count_lastmonth: parseInt(
              $('ul li#entry-count-lastmonth').text()
            ),
            entry_count_lastweek: parseInt(
              $('ul li#entry-count-lastweek').text()
            ),
            entry_count_today: parseInt($('ul li#entry-count-today').text()),
            last_entry_time: $('ul li#last-entry-time').text().trim()
          }
          resolve(user)
        } else if (status === 404) {
          reject(new e.NotFoundError('User not found.'))
        } else {
          reject(new Error('An unknown error occurred.'))
        }
      })
    })
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
          reject(new e.AuthError())
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
          reject(new e.AuthError())
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
          reject(new e.AuthError())
        }
      })
    })
  }

  /**
   * @typedef Draft
   * @property {string} title       Title.
   * @property {string} title_url   Title URL.
   * @property {string} draft_date  Draft date.
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
            drafts.push({
              title: title.substring(0, title.length - date.length).trim(), // clear title
              title_url: c.urls.base + $(elm).find('a').attr('href'),
              draft_date: date
            })
          })
          resolve(drafts)
        }

        // not authorized
        if (status === 403) {
          reject(new e.AuthError())
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
          reject(new e.AuthError())
        }
      })
    })
  }
}

module.exports = EksiSozluk
