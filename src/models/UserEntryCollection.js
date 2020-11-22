const objectAssignDeep = require('object-assign-deep')
const Entry = require('./Entry')
const EntryForMember = require('./EntryForMember')
const { DEFAULTS } = require('../constants')

/**
 * User entry collection.
 */
class UserEntryCollection {
  /**
   * Username.
   *
   * @type {string}
   */
  username

  /**
   * Current page.
   *
   * @type {number}
   */
  currPage

  /**
   * Total page count.
   *
   * @type {number}
   */
  pageCount

  /**
   * Total entry count.
   *
   * @type {number}
   */
  entryCount

  /**
   * Entry collection.
   *
   * @type {Array<(Entry|EntryForMember)>}
   */
  entries = []

  /**
   * Create an user entry collection.
   *
   * @param {object}  request                 Axios client.
   * @param {string}  path                    Path or plain title.
   * @param {string}  username                Username.
   * @param {string}  cookies                 Cookie string.
   * @param {object}  options                 Parameters that user can specify.
   * @param {number}  [options.page=1]        Page number.
   */
  constructor (request, path, username, cookies, options) {
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1
      },
      options
    )

    this.currPage = _options.page
    this.username = username
    this._request = request
    this._path = path
    this._cookies = cookies
  }

  /**
   * Retrieve first page.
   */
  async first () {
    this.currPage = 1
    await this.retrieve()
  }

  /**
   * Retrieve last page.
   */
  async last () {
    this.currPage = this.pageCount
    await this.retrieve()
  }

  /**
   * Retrieve next page.
   */
  async next () {
    this.currPage += 1
    await this.retrieve()
  }

  /**
   * Retrieve previous page.
   */
  async prev () {
    this.currPage -= 1
    await this.retrieve()
  }

  /**
   * Retrieve the user entry collection.
   *
   * @returns {Promise} Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: this._path,
        cookie: this._cookies,
        ajax: true,
        params: {
          nick: encodeURI(this.username)
        }
      }

      this._request(requestOptions, $ => {
        const status = $.statusCode

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const entries = []

        $('div.topic-item').each((i, elm) => {
          const entryId = $(elm)
            .find('h1')
            .data('id')
          const entry = this._cookies
            ? new EntryForMember(this._request, entryId, this._cookies)
            : new Entry(this._request, entryId)
          entry.serialize($, elm, { profilePage: true })
          entries.push(entry)
        })

        const isEntryExist = $('h1 small').length > 0
        const entryCount = isEntryExist
          ? parseInt(
              $('h1 small')
                .text()
                .match(/\d+/g)[0]
            )
          : 0

        this.pageCount = isEntryExist
          ? Math.ceil(entryCount / DEFAULTS.ENTRY_COUNT_PER_PAGE_OF_PROFILE)
          : 0
        this.entryCount = entryCount
        this.entries = entries

        resolve()
      })
    })
  }
}

module.exports = UserEntryCollection
