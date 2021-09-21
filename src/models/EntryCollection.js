const objectAssignDeep = require('object-assign-deep')
const DraftEntry = require('./DraftEntry')
const CollectionBase = require('./CollectionBase')
const { URLS } = require('../constants')
const { COLLECTION_TYPES } = require('../enums')
const { AuthError } = require('../exceptions')
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
   * Entry sorting or filtering type.
   *
   * @type {CollectionType}
   */
  collectionType

  /**
   * Searched user's username.
   *
   * @type {string}
   */
  searchAuthor

  /**
   * Searched text.
   *
   * @type {string}
   */
  searchText

  /**
   * Create an entry collection.
   *
   * @param {object}          request                 Axios client.
   * @param {string}          path                    Path or plain title.
   * @param {object}          options                 Parameters that user can specify.
   * @param {CollectionType}  [options.type=null]     Sorting or filtering type.
   * @param {string}          [options.author=null]   Username, if type is 'author' set this parameter.
   * @param {string}          [options.search=null]   Search text,  if type is 'find' set this parameter.
   * @param {number}          [options.page=1]        Page number.
   * @param {string}          [options.cookies=null]  Cookie string.
   */
  constructor(request, path, options) {
    super()
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1,
        cookies: null,
        type: null,
        author: null,
        search: null
      },
      options
    )

    const isPathPlainTitle = !path.includes('-')

    this.currPage = _options.page
    this.title = isPathPlainTitle ? path : null
    this._request = request
    this._path = isPathPlainTitle ? null : path
    this._cookies = _options.cookies
    this.collectionType = _options.type
    this.searchAuthor = _options.author
    this.searchText = _options.search
  }

  /**
   * Retrieve the entry collection.
   *
   * @returns {Promise} Promise.
   */
  retrieve() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const isPathProvided = this._path
      const endpoint = isPathProvided
        ? this._path
        : `/${await getActualPath(this.title)}`
      const isEndpointCompatibleWithPageParam = !endpoint.includes('?')

      const isTypeLinks = this.collectionType === COLLECTION_TYPES.LINKS
      const isTypeAuthor = this.collectionType === COLLECTION_TYPES.AUTHOR
      const isTypeFind = this.collectionType === COLLECTION_TYPES.FIND
      const params = isTypeLinks
        ? { a: 'find', keywords: 'http://' }
        : isTypeAuthor
        ? { a: 'search', author: this.searchAuthor }
        : isTypeFind
        ? { a: 'find', keywords: this.searchText }
        : { a: this.collectionType }

      const requestOptions = {
        endpoint,
        cookie: this._cookies,
        params: isEndpointCompatibleWithPageParam
          ? { ...params, p: this.currPage }
          : { ...params },
        resourceName: 'Entries'
      }

      this._request(requestOptions, $ => {
        // dynamically import
        // @see circular dependency issue
        const Entry = require('./Entry')
        const EntryForMember = require('./EntryForMember')

        $('ul#entry-item-list li').each((i, elm) => {
          const entryId = $(elm).data('id')
          const entry = this._cookies
            ? new EntryForMember(this._request, entryId, this._cookies)
            : new Entry(this._request, entryId)
          entry.serialize($, elm)
          this.entries.push(entry)
        })

        const isTitleProvided = this.title

        if (!isTitleProvided) {
          this.title = $('#title').data('title')
        }

        this.titleId = $('#title').data('id')
        this.titleSlug = $('#title').data('slug')
        this.titleUrl = URLS.BASE + $('h1#title a').attr('href')
        this.currPage = $('div.pager').data('currentpage') || 1
        this.pageCount = $('div.pager').data('pagecount') || 1

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
  async createEntry(content, options) {
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
