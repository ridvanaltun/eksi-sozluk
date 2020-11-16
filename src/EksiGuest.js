const axios = require('axios')
const { tags, debeEntries } = require('./lib')
const { request } = require('./utils')
const { Entry, User, TitleCollection, EntryCollection } = require('./models')
const { URLS } = require('./constants')
const { TITLE_TYPES } = require('./enums')

/**
 * @classdesc Eksi Sozluk guest class.
 * @ignore
 */
class EksiGuest {
  /**
   * Create an Eksi Sozluk guest session.
   * @param   {Object}  httpClient  Axios HTPP client.
   */
  constructor (httpClient) {
    this.httpClient = httpClient
    this._request = request(httpClient)
  }

  /**
   * @typedef SearchResult
   * @property {string} query   Search text itself.
   * @property {string} nicks   Mached nicks.
   * @property {string} titles  Mached titles.
   */

  /**
   * Search things.
   * @param   {string}                  text  Search query.
   * @return  {Promise.<SearchResult>}        A promise for the search.
   */
  search (text) {
    return new Promise((resolve, reject) => {
      axios({
        url: URLS.SEARCH,
        method: 'GET',
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        },
        params: {
          q: text
        }
      })
        .then((res) => {
          resolve({
            query: res.data.Query,
            nicks: res.data.Nicks,
            titles: res.data.Titles
          })
        })
        .catch((error) => {
          reject(new Error(error.message))
        })
    })
  }

  /**
   * Fetch entry by id.
   * @param   {number}          entryId Entry Id.
   * @return  {Promise.<Entry>}         A promise for the entry.
   */
  async entryById (entryId) {
    const entry = new Entry(this._request, entryId)
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
    const collection = new EntryCollection(this._request, title, options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch today in history.
   * @param   {string}                    year              Which year.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the titles of today in history.
   */
  async todayInHistory (year, options) {
    const collection = new TitleCollection(this._request, `/basliklar/tarihte-bugun?year=${year}`, { ...options })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch untagged titles.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for untagged titles.
   */
  async untaggedTitles (options) {
    const collection = new TitleCollection(this._request, '/basliklar/basiboslar', { ...options })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch user.
   * @param   {string}          username  Username.
   * @return  {Promise.<User>}            A promise for the user.
   */
  async user (username) {
    const user = new User(this._request, username)
    await user.retrieve()

    return user
  }

  /**
   * Fetch tags.
   * @return  {Promise.Array<Tag>} A promise for the tags.
   */
  async tags () {
    return await tags(this._request)
  }

  /**
   * Fetch titles by tag.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the titles of given tag.
   */
  async titlesByTag (tagName, options) {
    const collection = new TitleCollection(this._request, `/basliklar/kanal/${tagName}`, { ...options })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch agenda.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the agenda titles.
   */
  async agenda (options) {
    const collection = new TitleCollection(this._request, '/basliklar/gundem', { ...options })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch yesterday's top entries.
   * @return  {Promise.Array<Entry>}  A promise for the yesterday's top entries.
   */
  async debeEntries () {
    return await debeEntries(this._request)
  }

  /**
   * Fetch questions in agenda.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the agenda titles in agenda.
   */
  async questionsInAgenda (options) {
    const collection = new TitleCollection(this._request, '/basliklar/sorunsal', { ...options, type: TITLE_TYPES.QUESTION })
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch questions in today.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.<TitleCollection>}                   A promise for the agenda titles in today.
   */
  async questionsInToday (options) {
    const collection = new TitleCollection(this._request, '/basliklar/sorunsal-bugun', { ...options, type: TITLE_TYPES.QUESTION })
    await collection.retrieve()

    return collection
  }
}

module.exports = EksiGuest
