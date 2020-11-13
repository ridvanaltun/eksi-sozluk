const axios = require('axios')
const objectAssignDeep = require('object-assign-deep')
const EksiGuest = require('./EksiGuest')
const c = require('./constants')
const { EntryForMember, UserForMember, Title, FollowedUserTitle, DraftTitle } = require('./models')
const { toEncodeFormUrl, parseDate } = require('./utils')
const { AuthError } = require('./exceptions')
const { entries, tags, trashEntries, debeEntries } = require('./lib')

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
   * Fetch entry by id.
   * @param   {number}                    entryId Entry Id.
   * @return  {Promise.<EntryForMember>}          A promise for the entry.
   */
  async entryById (entryId) {
    const entry = new EntryForMember(this._request, entryId, this.cookies)
    await entry.retrieve()

    return entry
  }

  /**
   * Fetch entries.
   * @param   {string}                        title             Title itself.
   * @param   {Object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @return  {Promise.Array<EntryForMember>}                   A promise for the entries.
   */
  async entries (title, options) {
    return await entries(this._request, title, { ...options, cookies: this.cookies })
  }

  /**
   * Fetch user.
   * @param   {string}                    username  Entry Id.
   * @return  {Promise.<UserForMember>}             A promise for the entry.
   */
  async user (username) {
    const user = new UserForMember(this._request, username, this.cookies)
    await user.retrieve()

    return user
  }

  /**
   * Fetch today entries.
   * @param   {Object}                options           Parameters that user can specify.
   * @param   {number}                [options.page=1]  Page number.
   * @return  {Promise.Array<Title>}                    A promise for the titles of today.
   * @throws  {AuthError}                               User not authorized.
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

        // not authorized
        if (status === 404) {
          return reject(new AuthError())
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const titles = []

        $('ul.topic-list.partial li').each((i, elm) => {
          const title = new Title()
          title.serialize($, elm)
          titles.push(title)
        })

        resolve(titles)
      })
    })
  }

  /**
   * Fetch rookie entries.
   * @param   {Object}                options           Parameters that user can specify.
   * @param   {number}                [options.page=1]  Page number.
   * @return  {Promise.Array<Title>}                    A promise for the rookie titles.
   * @throws  {AuthError}                               User not authorized.
   */
  rookieTitles (options) {
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

        // not authorized
        if (status === 403) {
          return reject(new AuthError())
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const titles = []

        $('ul.topic-list.partial li').each((i, elm) => {
          const title = new Title()
          title.serialize($, elm)
          titles.push(title)
        })

        resolve(titles)
      })
    })
  }

  /**
   * Fetch events.
   * @return {Promise.Array<Title>} A promise for the titles of events.
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

        // not authorized
        if (status === 403) {
          return reject(new AuthError())
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const titles = []

        $('ul.topic-list.partial li').each((i, elm) => {
          const title = new Title()
          title.serialize($, elm)

          // correct entry count
          const entryCountStr = $(elm).find('a small').text().trim()
          const entryCount = parseInt(entryCountStr)
          title.entryCount = entryCountStr.includes('b') ? (1000 * entryCount) : entryCount || 0

          titles.push(title)
        })

        resolve(titles)
      })
    })
  }

  /**
   * Fetch draft entries.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.Array<DraftTitle>}                   A promise for the titles of drafts.
   * @throws  {AuthError}                                   User not authorized.
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

        // not authorized
        if (status === 403) {
          return reject(new AuthError())
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const titles = []

        $('ul.topic-list.partial li').each((i, elm) => {
          const title = new DraftTitle()
          const name = $(elm).text().trim()
          const date = $(elm).find('a div').text().trim()
          const calculatedDate = parseDate(date)
          title.name = name.substring(0, name.length - date.length).trim()
          title.url = c.urls.base + $(elm).find('a').attr('href')
          title.dateCreated = calculatedDate.created
          title.dateModified = calculatedDate.modified
          titles.push(title)
        })

        resolve(titles)
      })
    })
  }

  /**
   * Fetch followed user entries.
   * @param   {Object}                            options           Parameters that user can specify.
   * @param   {number}                            [options.page=1]  Page number.
   * @return  {Promise.Array<FollowedUserTitle>}                    A promise for the followed user entries.
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

        // not authorized
        if (status === 404) {
          return reject(new AuthError())
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const titles = []

        $('ul.topic-list.partial li').each((i, elm) => {
          const title = new FollowedUserTitle()
          title.serialize($, elm)
          titles.push(title)
        })

        resolve(titles)
      })
    })
  }

  /**
   * Fetch tags.
   * @return  {Promise.Array<TagForMember>} A promise for the tags.
   */
  async tags () {
    return await tags(this._request, this.cookies)
  }

  /**
   * Fetch yesterday's top entries.
   * @return  {Promise.Array<EntryForMember>} A promise for the yesterday's top entries.
   */
  async debeEntries () {
    return await debeEntries(this._request, this.cookies)
  }

  /**
   * Fetch trash entries.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.Array<TrashEntry>}                   A promise for the trash entries.
   */
  async trashEntries (options) {
    return await trashEntries(this._request, this.cookies, options)
  }

  /**
   * Empty trash.
   * @return  {Promise} Promise.
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
