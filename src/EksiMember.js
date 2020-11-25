const axios = require('axios')
const qs = require('querystring')
const fs = require('fs')
const FormData = require('form-data')
const EksiGuest = require('./EksiGuest')
const { URLS } = require('./constants')
const { TITLE_TYPES } = require('./enums')
const { tags, trashEntries, debeEntries, createEntry } = require('./lib')
const {
  EntryForMember,
  UserForMember,
  TitleCollection,
  EntryCollection,
  SearchResults,
  TrashEntry,
  TagForMember,
  DraftEntry
} = require('./models')

/**
 * Eksi Sozluk member class.
 *
 * @augments EksiGuest
 */
class EksiMember extends EksiGuest {
  /**
   * Username.
   *
   * @type {string}
   */
  username

  /**
   * Is new message available?
   *
   * @type {boolean}
   */
  isNewMessageAvailable

  /**
   * Is new event available?
   *
   * @type {boolean}
   */
  isNewEventAvailable

  /**
   * Create an Eksi Sozluk member session.
   *
   * @param   {object}  httpClient  Axios HTPP client.
   * @param   {string}  cookies     Cookies in string.
   */
  constructor (httpClient, cookies) {
    super(httpClient)
    this.cookies = cookies
  }

  /**
   * Retrieve the user.
   *
   * @returns {Promise} Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.BASE,
        method: 'GET',
        headers: {
          cookie: this.cookies
        }
      }).then(res => {
        const newMessageRegex = /href="\/mesaj"\n*\s*class="new-update"/g
        const isNewMessageAvailable = newMessageRegex.test(res.data)
        this.isNewMessageAvailable = isNewMessageAvailable

        const newEventRegex = /title="olaylar olaylar"\n*\s*class="new-update"/g
        const isNewEventAvailable = newEventRegex.test(res.data)
        this.isNewEventAvailable = isNewEventAvailable

        const usernameRegex = new RegExp(
          '(?<=a href="/biri/)(.*)(?=" title=")',
          'u'
        )
        const username = usernameRegex.exec(res.data)[0]
        this.username = username

        resolve()
      })
    })
  }

  /**
   * Search things.
   *
   * @param   {string}                  text  Search text.
   * @returns {Promise.<SearchResults>}        A promise for the search results.
   */
  async search (text) {
    const results = new SearchResults(this._request, text, this.cookies)
    await results.retrieve()

    return results
  }

  /**
   * Check if unreaded message available.
   *
   * @returns {Promise.<boolean>} New message available or not.
   */
  checkIsNewMessageAvailable () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.BASE,
        method: 'GET',
        headers: {
          cookie: this.cookies
        }
      }).then(res => {
        const regex = /href="\/mesaj"\n*\s*class="new-update"/g
        const isNewMessageAvailable = regex.test(res.data)
        this.isNewMessageAvailable = isNewMessageAvailable
        resolve(isNewMessageAvailable)
      })
    })
  }

  /**
   * Check if unreaded event available.
   *
   * @returns {Promise.<boolean>} New event available or not.
   */
  checkIsNewEventAvailable () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.BASE,
        method: 'GET',
        headers: {
          cookie: this.cookies
        }
      }).then(res => {
        const regex = /title="olaylar olaylar"\n*\s*class="new-update"/g
        const isNewEventAvailable = regex.test(res.data)
        this.isNewEventAvailable = isNewEventAvailable
        resolve(isNewEventAvailable)
      })
    })
  }

  /**
   * Pin an entry to the profile.
   *
   * @param   {number}  entryId  Entry ID which user owns.
   * @returns {Promise}          Promise.
   */
  pinEntry (entryId) {
    return new Promise((resolve, reject) => {
      axios
        .post(URLS.PIN, qs.stringify({ entryId }), {
          headers: {
            cookie: this.cookies,
            'x-requested-with': 'XMLHttpRequest'
          }
        })
        .then(res => {
          if (res.data.Success) {
            resolve()
          } else {
            reject(new Error('It is not your entry or entry is not yours.'))
          }
        })
    })
  }

  /**
   * Remove pin from profile.
   *
   * @returns {Promise}  Promise.
   */
  removePin () {
    return new Promise((resolve, reject) => {
      axios
        .post(URLS.PIN_REMOVE, null, {
          headers: {
            cookie: this.cookies,
            'x-requested-with': 'XMLHttpRequest'
          }
        })
        .then(res => {
          if (res.data !== true) {
            return reject(new Error('No pinned entry found.'))
          }

          resolve()
        })
    })
  }

  /**
   * Create entry.
   *
   * @param   {string}                                title                       Title.
   * @param   {string}                                content                     Entry content.
   * @param   {object}                                options                     Parameters that user can specify.
   * @param   {boolean}                               [options.saveAsDraft=false] Save as draft.
   * @returns {Promise.<(EntryForMember|DraftEntry)>}                             Created entry.
   */
  async createEntry (title, content, options = {}) {
    return await createEntry(
      this._request,
      title,
      content,
      options,
      this.cookies
    )
  }

  /**
   * Fetch entry by id.
   *
   * @param   {number}                    entryId Entry Id.
   * @returns {Promise.<EntryForMember>}          A promise for the entry.
   */
  async entryById (entryId) {
    const entry = new EntryForMember(this._request, entryId, this.cookies)
    await entry.retrieve()

    return entry
  }

  /**
   * Fetch entries.
   *
   * @param   {string}                    title             Title itself.
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<EntryCollection>}                   A promise for the entries.
   */
  async entries (title, options = {}) {
    const _options = {
      ...options,
      cookies: this.cookies
    }
    const collection = new EntryCollection(this._request, title, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch user.
   *
   * @param   {string}                    username  Entry Id.
   * @returns {Promise.<UserForMember>}             A promise for the entry.
   */
  async user (username) {
    const user = new UserForMember(this._request, username, this.cookies)
    await user.retrieve()

    return user
  }

  /**
   * Fetch the user profile.
   *
   * @returns {Promise.<UserForMember>} A promise for the entry.
   */
  async me () {
    const user = new UserForMember(this._request, this.username, this.cookies)
    await user.retrieve()

    return user
  }

  /**
   * Fetch today entries.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the titles of today.
   */
  async today (options = {}) {
    const target = '/basliklar/bugun'
    const _options = {
      ...options,
      cookies: this.cookies
    }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch rookie entries.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the rookie titles.
   */
  async rookieTitles (options = {}) {
    const target = '/basliklar/caylaklar'
    const _options = { ...options, cookies: this.cookies }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch events.
   *
   * @returns {Promise.<TitleCollection>} A promise for the titles of events.
   */
  async events () {
    const target = '/basliklar/olay'
    const _options = { defaultEntryCount: 0, cookies: this.cookies }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch draft entries.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the titles of drafts.
   */
  async drafts (options = {}) {
    const target = '/basliklar/kenar'
    const _options = {
      ...options,
      type: TITLE_TYPES.DRAFT,
      cookies: this.cookies
    }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch followed user titles.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the followed user titles.
   */
  async followedUserTitles (options = {}) {
    const target = '/basliklar/takipentry'
    const _options = {
      ...options,
      type: TITLE_TYPES.FOLLOWED_USER,
      cookies: this.cookies
    }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch followed user favorite entries.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the followed user titles.
   */
  async followedUserFavoriteEntries (options = {}) {
    const target = '/basliklar/takipfav'
    const _options = {
      ...options,
      type: TITLE_TYPES.FOLLOWED_USER_FAVORITE_ENTRY,
      cookies: this.cookies
    }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch tags.
   *
   * @returns {Promise.Array<TagForMember>} A promise for the tags.
   */
  async tags () {
    return await tags(this._request, this.cookies)
  }

  /**
   * Fetch yesterday's top entries.
   *
   * @returns {Promise.Array<EntryForMember>} A promise for the yesterday's top entries.
   */
  async debeEntries () {
    return await debeEntries(this._request, this.cookies)
  }

  /**
   * Fetch trash entries.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.Array<TrashEntry>}                   A promise for the trash entries.
   */
  async trashEntries (options = {}) {
    return await trashEntries(this._request, this.cookies, options)
  }

  /**
   * Empty trash.
   *
   * @returns {Promise} Promise.
   */
  emptyTrash () {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.TRASH,
        method: 'GET',
        headers: {
          cookie: this.cookies
        }
      })
        .then(res => {
          // parse csrf token
          const csrfRegex = new RegExp(
            '(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)',
            'u'
          )
          const csrfToken = csrfRegex.exec(res.data)[0]

          return csrfToken
        })
        .then(async csrfToken => {
          // empty trash
          const _res = await axios({
            url: URLS.TRASH_EMPTY,
            method: 'POST',
            headers: {
              cookie: this.cookies
            },
            data: qs.stringify({
              __RequestVerificationToken: csrfToken
            })
          })

          return _res
        })
        .then(res => {
          if (
            res.data.includes(
              '<title>büyük başarısızlıklar sözkonusu - ekşi sözlük</title>'
            )
          ) {
            reject(new Error('Unknown Error'))
          } else {
            resolve()
          }
        })
        .catch(error => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * @typedef UploadedImage
   * @property {string} url Image url.
   * @property {string} key Image key.
   */

  /**
   * Upload image.
   *
   * @param   {string}                  imagePath Image file path.
   * @returns {Promise.<UploadedImage>}           Promise.
   */
  uploadImage (imagePath) {
    return new Promise((resolve, reject) => {
      const data = new FormData()
      data.append('file', fs.createReadStream(imagePath))

      axios
        .post(`${URLS.BASE}/img/func/${this.username}`, data, {
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            Cookie: this.cookies,
            ...data.getHeaders()
          }
        })
        .then(response => {
          // handle errors
          if (!response.data.Success) {
            return reject(new Error(response.data.Result))
          }

          resolve({
            url: response.data.Result,
            key: response.data.ImageKey
          })
        })
    })
  }

  /**
   * Remove image with given image key.
   *
   * @param   {string}  imageKey  Image key.
   * @returns {Promise}           Promise.
   */
  deleteImage (imageKey) {
    const data = qs.stringify({
      imageKey: imageKey,
      reasonCode: 'osel' // don't know why.
    })

    return new Promise((resolve, reject) => {
      axios
        .post(`${URLS.BASE}/img/func/sil`, data, {
          headers: {
            'x-requested-with': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: this.cookies
          }
        })
        .then(response => {
          // handle errors
          if (!response.data.Success) {
            return reject(new Error('An unknow error occurred.'))
          }

          resolve()
        })
    })
  }
}

module.exports = EksiMember
