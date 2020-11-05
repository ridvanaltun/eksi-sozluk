const objectAssignDeep = require('object-assign-deep')
const EksiGeneral = require('./EksiGeneral')
const c = require('./constants')

/**
 * @classdesc You can manage author and rookies.
 * @augments EksiGeneral
 */
class EksiMember extends EksiGeneral {
  /**
   * Eksi Member instance
   * @param   {string}  cookies     Auth cookies
   * @param   {Object}  httpClient  Axios client
   */
  constructor (cookies, httpClient) {
    super()
    this.cookies = cookies
    this.httpClient = httpClient
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
      this._request(
        {
          endpoint: '/basliklar/bugun',
          ajax: true,
          cookie: this.cookies,
          params
        },
        ($) => {
          const status = $.statusCode

          if (status === 200) {
            const today = []

            $('ul.topic-list.partial li').each(function (i, elm) {
              const title = $(elm).text().trim()
              const entryCount = $(elm).find('a small').text().trim()
              today.push({
                title: title.substring(
                  0,
                  title.length - (entryCount.length + 1)
                ), // clear title
                title_url: c.urls.base + $(elm).find('a').attr('href'),
                entry_count: entryCount.includes('b')
                  ? 1000 * parseInt(entryCount)
                  : parseInt(entryCount)
                    ? parseInt(entryCount)
                    : 1 // calculate entry count
              })
            })

            resolve(today)
          } else {
            reject(new Error('An unknown error occurred.'))
          }
        }
      )
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
      this._request(
        {
          endpoint: '/basliklar/caylaklar',
          ajax: true,
          cookie: this.cookies,
          params
        },
        ($) => {
          const status = $.statusCode

          if (status === 200) {
            const rookieEntries = []

            $('ul.topic-list.partial li').each(function (i, elm) {
              const title = $(elm).text().trim()
              const entryCount = $(elm).find('a small').text().trim()
              rookieEntries.push({
                title: title.substring(
                  0,
                  title.length - (entryCount.length + 1)
                ), // clear title
                title_url: c.urls.base + $(elm).find('a').attr('href'),
                entry_count: entryCount.includes('b')
                  ? 1000 * parseInt(entryCount)
                  : parseInt(entryCount)
                    ? parseInt(entryCount)
                    : 1 // calculate entry count
              })
            })

            resolve(rookieEntries)
          } else {
            reject(new Error('An unknown error occurred.'))
          }
        }
      )
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
   */
  events () {
    return new Promise((resolve, reject) => {
      this._request(
        { endpoint: '/basliklar/olay', ajax: true, cookie: this.cookies },
        ($) => {
          const status = $.statusCode

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
          } else {
            reject(new Error('An unknown error occurred.'))
          }
        }
      )
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
      this._request(
        {
          endpoint: '/basliklar/kenar',
          ajax: true,
          cookie: this.cookies,
          params
        },
        ($) => {
          const status = $.statusCode

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
          } else {
            reject(new Error('An unknown error occurred.'))
          }
        }
      )
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
      this._request(
        {
          endpoint: '/basliklar/takipentry',
          ajax: true,
          cookie: this.cookies,
          params
        },
        ($) => {
          const status = $.statusCode

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
          } else {
            reject(new Error('An unknown error occurred.'))
          }
        }
      )
    })
  }
}

module.exports = EksiMember
