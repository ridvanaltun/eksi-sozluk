const objectAssignDeep = require('object-assign-deep')
const Title = require('./Title')
const FollowedUserTitle = require('./FollowedUserTitle')
const FollowedUserFavoriteEntry = require('./FollowedUserFavoriteEntry')
const DraftTitle = require('./DraftTitle')
const Question = require('./Question')
const CollectionBase = require('./CollectionBase')
const { DEFAULTS } = require('../constants')
const { TITLE_TYPES } = require('../enums')

/**
 * Title collection.
 *
 * @augments CollectionBase
 */
class TitleCollection extends CollectionBase {
  /**
   * Total title count, if type is followed user title = null.
   *
   * @type {(number|null)}
   */
  totalTitleCount

  /**
   * Total page count, if type is followed user title = null.
   *
   * @type {(number|null)}
   */
  pageCount

  /**
   * Title collection.
   *
   * @type {Array<(Title|FollowedUserTitle|DraftTitle)>}
   */
  titles

  /**
   * Create a title collection.
   *
   * @param {object}    request                       Axios client.
   * @param {string}    path                          Title path.
   * @param {object}    options                       Parameters that user can specify.
   * @param {number}    [options.page=1]              Page number.
   * @param {number}    [options.defaultEntryCount=1] Default entry count, using if entry count not provided.
   * @param {string}    [options.cookies=null]        Cookie string.
   * @param {TitleType} [options.type=1]              Type of title.
   */
  constructor (request, path, options) {
    super()
    // handle default options
    const _options = objectAssignDeep(
      {
        page: 1,
        cookies: null,
        defaultEntryCount: 1,
        type: TITLE_TYPES.TITLE
      },
      options
    )

    // todo : request objesini yerine sadece axios instance olusturup disari acabiliriz
    // bir suru _ ile disari acmak yerine sadece request acmak daha mantikli olacaktir

    this.currPage = _options.page
    this._request = request
    this._path = path
    this._defaultEntryCount = _options.defaultEntryCount
    this._cookies = _options.cookies
    this._type = _options.type
  }

  /**
   * Retrieve title collection.
   *
   * @returns {Promise} Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        endpoint: this._path,
        ajax: true,
        cookie: this._cookies,
        params: {
          p: this.currPage
        }
      }

      this._request(requestOptions, $ => {
        const totalTitleCount = parseInt(
          $('div.clearfix.dropdown h2').attr('title')
        )

        const titles = []

        $('ul.topic-list.partial li').each((i, elm) => {
          let title

          // exit the loop if divider exist
          if ($(elm).find('div.seperator').length > 0) {
            return false
          }

          switch (this._type) {
            case TITLE_TYPES.TITLE:
              title = new Title(this._request)
              break

            case TITLE_TYPES.DRAFT:
              title = new DraftTitle(this._request, this._cookies)
              break

            case TITLE_TYPES.FOLLOWED_USER:
              title = new FollowedUserTitle(this._request, this._cookies)
              break

            case TITLE_TYPES.FOLLOWED_USER_FAVORITE_ENTRY:
              title = new FollowedUserFavoriteEntry(
                this._request,
                this._cookies
              )
              break

            case TITLE_TYPES.QUESTION:
              title = new Question()
              break
          }

          title.serialize($, elm)

          const isPlainTitle = this._type === TITLE_TYPES.TITLE

          // correct entry count
          if (isPlainTitle) {
            const entryCountStr = $(elm)
              .find('a small')
              .text()
              .trim()
            const entryCount = parseInt(entryCountStr)
            title.entryCount = entryCountStr.includes('b')
              ? 1000 * entryCount
              : entryCount || this._defaultEntryCount
          }

          titles.push(title)
        })

        this.totalTitleCount = totalTitleCount || null
        this.pageCount =
          Math.ceil(totalTitleCount / DEFAULTS.TITLE_COUNT_PER_PAGE) || null
        this.titles = titles

        resolve()
      })
    })
  }
}

module.exports = TitleCollection
