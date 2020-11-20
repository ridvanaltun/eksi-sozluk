const objectAssignDeep = require('object-assign-deep')
const Entry = require('./Entry')
const EntryForMember = require('./EntryForMember')
const DraftEntry = require('./DraftEntry')
const { URLS } = require('../constants')
const { NotFoundError } = require('../exceptions')
const { getActualPath } = require('../utils')

/**
 * Entry collection.
 */
class EntryCollection {
  /**
   * Title.
   * @type {string}
   */
  title

  /**
   * Title ID.
   * @type {number}
   */
  titleId

  /**
   * Title slug.
   * @type {string}
   */
  titleSlug

  /**
   * Title URL.
   * @type {string}
   */
  titleUrl

  /**
   * Current page.
   * @type {number}
   */
  currPage

  /**
   * Total page count.
   * @type {number}
   */
  pageCount

  /**
   * Entry collection.
   * @type {Array<(Entry|EntryForMember)>}
   */
  entries

  /**
   * Draft entry.
   * @type {(DraftEntry|null)}
   */
  draftEntry

  /**
   * Create a entry collection.
   * @param {Object}  request                 Axios client.
   * @param {string}  path                    Path or plain title.
   * @param {Object}  options                 Parameters that user can specify.
   * @param {number}  [options.page=1]        Page number.
   * @param {string}  [options.cookies=null]  Cookie string.
   */
  constructor (request, path, options) {
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1,
        cookies: null
      },
      options
    )

    const isPathPlainTitle = !path.includes('-')

    this.currPage = _options.page
    this.title = isPathPlainTitle ? path : null
    this._request = request
    this._path = isPathPlainTitle ? null : path
    this._cookies = _options.cookies
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
   * Retrieve entry collection.
   * @return  {Promise} Promise.
   */
  retrieve () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const isPathProvided = this._path
      const endpoint = isPathProvided ? this._path : await getActualPath(this.title)
      const isEndpointCompatibleWithPageParam = !endpoint.includes('?')

      const requestOptions = {
        endpoint,
        cookie: this._cookies,
        params: isEndpointCompatibleWithPageParam ? { p: this.currPage } : {}
      }

      this._request(requestOptions, ($) => {
        const status = $.statusCode

        // title has not any entry
        if (status === 404) {
          return reject(new NotFoundError('Entries not found.'))
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        const entries = []

        $('ul#entry-item-list li').each((i, elm) => {
          const entryId = $(elm).data('id')
          const entry = this._cookies ? new EntryForMember(this._request, entryId, this._cookies) : new Entry(this._request, entryId)
          entry.serialize($, elm)
          entries.push(entry)
        })

        const isTitleProvided = this.title

        if (!isTitleProvided) {
          this.title = $('#title').data('title')
        }

        this.titleId = $('#title').data('id')
        this.titleSlug = $('#title').data('slug')
        this.titleUrl = URLS.BASE + $('h1#title a').attr('href')
        this.currPage = $('div.pager').data('currentpage')
        this.pageCount = $('div.pager').data('pagecount')
        this.entries = entries

        const isDraftEntryExist = $('#draft-content').text().length > 0
        const draftEntry = isDraftEntryExist ? new DraftEntry(this._request, this.title, this._cookies) : null

        if (draftEntry) {
          draftEntry.serialize($)
        }

        this.draftEntry = draftEntry

        resolve()
      })
    })
  }
}

module.exports = EntryCollection
