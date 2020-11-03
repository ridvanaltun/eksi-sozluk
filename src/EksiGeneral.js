'use strict'

const axios = require('axios')
const { request: r, date: d, toEncodeFormUrl } = require('./utils')
const e = require('./exceptions')
const c = require('./constants')

/**
 * Eksi Sozluk General
 *
 * Not login required actions.
 */
class EksiGeneral {
  /**
   * A promise for fetch user.
   *
   * @promise Vote
   * @reject  {VoteError} Throws when vote error.
   */

  /**
   * Upvote.
   *
   * @return {Vote} Promise object
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
   * Downvote.
   *
   * @return {Vote} Promise object
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
   * A promise for the yesterday's top entries.
   *
   * @promise YesterdayTopEntries
   * @fulfill {Object} The yesterday's top entries.
   * @reject {NotFoundError} Throws when debe not found.
   */

  /**
   * Fetch yesterday's top entries.
   *
   * @param   {Object}        usrOptions        Parameters that user can specify.
   * @param   {number}        usrOptions.limit  The result limits.
   *
   * @return {YesterdayTopEntries} A promise for the yesterday's top entries.
   */
  debe (usrOptions = {}) {
    return new Promise((resolve, reject) => {
      const { limit } = usrOptions

      r('/m/debe', ($) => {
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

          if (limit) debe = debe.slice(0, limit)

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
   * A promise for entry by id.
   *
   * @promise Entry
   * @fulfill {Object} The entry.
   * @reject {NotFoundError} Throws when entry not found.
   */

  /**
   * Fetch entry by id.
   *
   * @param   {number}  entryId Entry Id.
   *
   * @return {Entry} A promise for the entry by id.
   */
  entryById (entryId) {
    return new Promise((resolve, reject) => {
      const { _upvote: upvote, _downvote: downvote } = this

      r(`/entry/${entryId}`, ($) => {
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
   * A promise for entries.
   *
   * @promise Entries
   * @fulfill {Object} The entries.
   * @reject {NotFoundError} Throws when entries not found.
   */

  /**
   * Fetch entries.
   *
   * @param   {string}  title             Title itself.
   * @param   {Object}  usrOptions        Parameters that user can specify.
   * @param   {number}  usrOptions.page   Page number of title.
   *
   * @return {Entries} A promise for the entries.
   */
  entries (title, usrOptions = { page: 1 }) {
    return new Promise((resolve, reject) => {
      const { page } = usrOptions

      const { _upvote: upvote, _downvote: downvote } = this

      const endpoint = '/?q=' + title + '&p=' + page

      r(endpoint, ($) => {
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
   * A promise for today in history.
   *
   * @promise TodayInHistory
   * @fulfill {Object} The today in history.
   * @reject {NotFoundError} Throws when today in history not found.
   */

  /**
   * Fetch today in history.
   *
   * @param   {string}  year              A year.
   * @param   {Object}  usrOptions        Parameters that user can specify.
   * @param   {number}  usrOptions.page   Page number.
   *
   * @return {TodayInHistory} A promise for the today in history.
   */
  todayInHistory (year, usrOptions = { page: 1 }) {
    return new Promise((resolve, reject) => {
      const { page } = usrOptions

      const endpoint = '/basliklar/m/tarihte-bugun?year=' + year + '&p=' + page

      r(endpoint, ($) => {
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
   * A promise for fetch user.
   *
   * @promise User
   * @fulfill {Object} The user.
   * @reject {NotFoundError} Throws when user not found.
   */

  /**
   * Fetch user.
   *
   * @param   {string}  username  Username.
   *
   * @return {User} A promise for the user.
   */
  user (username) {
    return new Promise((resolve, reject) => {
      // make username url ready
      username = username.replace(' ', '-')

      r(`/biri/${username}`, ($) => {
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
}

module.exports = EksiGeneral
