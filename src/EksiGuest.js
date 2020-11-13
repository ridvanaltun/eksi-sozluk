const axios = require('axios')
const { entries, todayInHistory, tags, titlesByTag, agenda, debeEntries, questions } = require('./lib')
const { request } = require('./utils')
const { Entry, User } = require('./models')
const c = require('./constants')

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
        url: c.urls.search,
        method: 'get',
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
   * @param   {string}                title             Title itself.
   * @param   {Object}                options           Parameters that user can specify.
   * @param   {number}                [options.page=1]  Page number.
   * @return  {Promise.Array<Entry>}                    A promise for the entries.
   */
  async entries (title, options) {
    return await entries(this._request, title, options)
  }

  /**
   * Fetch today in history.
   * @param   {string}                        year              A year.
   * @param   {Object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @return  {Promise.Array<Title>}                            A promise for the titles of today in history.
   */
  async todayInHistory (year, options) {
    return await todayInHistory(this._request, year, options)
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
   * @return  {Promise.Array<Title>}                        A promise for the titles of given tag.
   */
  async titlesByTag (tagName, options) {
    return await titlesByTag(this._request, tagName, options)
  }

  /**
   * Fetch agenda.
   * @return {Promise.Array<Title>} A promise for the agenda titles.
   */
  async agenda () {
    return await agenda(this._request)
  }

  /**
   * Fetch yesterday's top entries.
   * @return  {Promise.Array<Entry>}  A promise for the yesterday's top entries.
   */
  async debeEntries () {
    return await debeEntries(this._request)
  }

  /**
   * Fetch questions.
   * @return {Promise.Array<Question>} A promise for the question.
   */
  async questions () {
    return await questions(this._request)
  }
}

module.exports = EksiGuest