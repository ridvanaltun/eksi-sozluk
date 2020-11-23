const objectAssignDeep = require('object-assign-deep')
const Entry = require('./Entry')
const EntryForMember = require('./EntryForMember')
const DraftEntry = require('./DraftEntry')
const CollectionBase = require('./CollectionBase')
const { URLS } = require('../constants')
const { NotFoundError, AuthError } = require('../exceptions')
const { getActualPath } = require('../utils')

/**
 * Entry collection.
 *
 * @augments CollectionBase
 */
class EntryCollection extends CollectionBase {
  /**
   * Title.
   *
   * @type {string}
   */
  title

  /**
   * Title ID.
   *
   * @type {number}
   */
  titleId

  /**
   * Title slug.
   *
   * @type {string}
   */
  titleSlug

  /**
   * Title URL.
   *
   * @type {string}
   */
  titleUrl

  /**
   * Draft entry.
   *
   * @type {(DraftEntry|null)}
   */
  draftEntry

  /**
   * Entry collection.
   *
   * @type {Array<(Entry|EntryForMember)>}
   */
  entries = []

  /**
   * Create an entry collection.
   *
   * @param {object}  request                 Axios client.
   * @param {string}  path                    Path or plain title.
   * @param {object}  options                 Parameters that user can specify.
   * @param {number}  [options.page=1]        Page number.
   * @param {string}  [options.cookies=null]  Cookie string.
   */
  constructor (request, path, options) {
    super()
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
   * Retrieve the entry collection.
   *
   * @returns {Promise} Promise.
   */
  retrieve () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const isPathProvided = this._path
      const endpoint = isPathProvided
        ? this._path
        : `/${await getActualPath(this.title)}`
      const isEndpointCompatibleWithPageParam = !endpoint.includes('?')

      const requestOptions = {
        endpoint,
        cookie: this._cookies,
        params: isEndpointCompatibleWithPageParam ? { p: this.currPage } : {}
      }

      this._request(requestOptions, $ => {
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
          const entry = this._cookies
            ? new EntryForMember(this._request, entryId, this._cookies)
            : new Entry(this._request, entryId)
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
        const draftEntry = isDraftEntryExist
          ? new DraftEntry(this._request, this.title, this._cookies)
          : null

        if (draftEntry) {
          draftEntry.serialize($)
        }

        this.draftEntry = draftEntry

        resolve()
      })
    })
  }

  /**
   * Create entry.
   *
   * @param   {string}                                content                     Entry content.
   * @param   {object}                                options                     Parameters that user can specify.
   * @param   {boolean}                               [options.saveAsDraft=false] Save as draft.
   * @returns {Promise.<(EntryForMember|DraftEntry)>}                             Created entry.
   * @throws  {AuthError}                                                         User not authorized.
   */
  async createEntry (content, options) {
    const isAuth = this._cookies

    if (!isAuth) {
      throw new AuthError()
    }

    // dynamically import
    // @see circular dependency issue
    const { createEntry } = require('../lib')

    return await createEntry(
      this._request,
      this.title,
      content,
      options,
      this._cookies
    )
  }
}

module.exports = EntryCollection
