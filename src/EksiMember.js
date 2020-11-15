const axios = require('axios')
const EksiGuest = require('./EksiGuest')
const { URLS } = require('./constants')
const { TITLE_TYPES } = require('./enums')
const { EntryForMember, UserForMember, TitleCollection, EntryCollection } = require('./models')
const { toEncodeFormUrl } = require('./utils')
const { tags, trashEntries, debeEntries } = require('./lib')

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
        url: URLS.BASE,
        method: 'GET',
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
        url: URLS.BASE,
        method: 'GET',
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
   * @param   {string}                    title             Title itself.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<EntryCollection>}                   A promise for the entries.
   */
  async entries (title, options) {
    const collection = new EntryCollection(this._request, title, { ...options, cookies: this.cookies })
    await collection.retrieve()

    return collection
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
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the titles of today.
   */
  async today (options) {
    const collection = new TitleCollection(this._request, '/basliklar/bugun', { ...options, cookies: this.cookies })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch rookie entries.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the rookie titles.
   */
  async rookieTitles (options) {
    const collection = new TitleCollection(this._request, '/basliklar/caylaklar', { ...options, cookies: this.cookies })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch events.
   * @return {Promise.<TitleCollection>} A promise for the titles of events.
   */
  async events () {
    const collection = new TitleCollection(this._request, '/basliklar/olay', { defaultEntryCount: 0, cookies: this.cookies })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch draft entries.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the titles of drafts.
   */
  async drafts (options) {
    const collection = new TitleCollection(this._request, '/basliklar/kenar', { type: TITLE_TYPES.DRAFT, cookies: this.cookies })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch followed user titles.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the followed user titles.
   */
  async followedUserTitles (options) {
    const collection = new TitleCollection(this._request, '/basliklar/takipentry', { type: TITLE_TYPES.FOLLOWED_USER, cookies: this.cookies })
    await collection.retrieve()

    return collection
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
        url: `${URLS.TRASH}`,
        method: 'GET',
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
          url: `${URLS.TRASH}/bosalt`,
          method: 'POST',
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
