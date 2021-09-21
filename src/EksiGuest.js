const { tags, debeEntries } = require('./lib')
const { request } = require('./utils')
const { TITLE_TYPES } = require('./enums')
const {
  Entry,
  User,
  TitleCollection,
  EntryCollection,
  SearchResults
} = require('./models')

/**
 * Eksi Sozluk guest class.
 *
 * @ignore
 */
class EksiGuest {
  /**
   * Create an Eksi Sozluk guest session.
   *
   * @param   {object}  httpClient  Axios HTTP client.
   */
  constructor(httpClient) {
    this.httpClient = httpClient
    this._request = request(httpClient)
  }

  /**
   * Search things.
   *
   * @param   {string}                  text  Search text.
   * @returns {Promise.<SearchResults>}        A promise for the search results.
   */
  async search(text) {
    const results = new SearchResults(this._request, text)
    await results.retrieve()

    return results
  }

  /**
   * Fetch entry by id.
   *
   * @param   {number}          entryId Entry Id.
   * @returns {Promise.<Entry>}         A promise for the entry.
   */
  async entryById(entryId) {
    const entry = new Entry(this._request, entryId)
    await entry.retrieve()

    return entry
  }

  /**
   * Fetch entries.
   *
   * @param   {string}                    title             Title itself.
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @param   {CollectionType}            [options.type]    Sorting or filtering type.
   * @param   {string}                    [options.author]  Username, if type is 'author' set this parameter.
   * @param   {string}                    [options.search]  Search text, if type is 'find' set this parameter.
   * @returns {Promise.<EntryCollection>}                   A promise for the entries.
   */
  async entries(title, options = {}) {
    const collection = new EntryCollection(this._request, title, options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch today in history.
   *
   * @param   {string}                    year              Which year.
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the titles of today in history.
   */
  async todayInHistory(year, options = {}) {
    const target = `/basliklar/tarihte-bugun?year=${year}`
    const collection = new TitleCollection(this._request, target, options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch untagged titles.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for untagged titles.
   */
  async untaggedTitles(options = {}) {
    const target = '/basliklar/basiboslar'
    const collection = new TitleCollection(this._request, target, options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch user.
   *
   * @param   {string}          username  Username.
   * @returns {Promise.<User>}            A promise for the user.
   */
  async user(username) {
    const user = new User(this._request, username)
    await user.retrieve()

    return user
  }

  /**
   * Fetch tags.
   *
   * @returns {Promise.Array<Tag>} A promise for the tags.
   */
  async tags() {
    return await tags(this._request)
  }

  /**
   * Fetch titles by tag.
   *
   * @param   {TagName}                   tagName           Tag name.
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the titles of given tag.
   */
  async titlesByTag(tagName, options = {}) {
    const target = `/basliklar/kanal/${tagName}`
    const collection = new TitleCollection(this._request, target, options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch agenda.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the agenda titles.
   */
  async agenda(options = {}) {
    const target = '/basliklar/gundem'
    const collection = new TitleCollection(this._request, target, options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch yesterday's top entries.
   *
   * @returns {Promise.Array<Entry>}  A promise for the yesterday's top entries.
   */
  async debeEntries() {
    return await debeEntries(this._request)
  }

  /**
   * Fetch questions in agenda.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the agenda titles in agenda.
   */
  async questionsInAgenda(options = {}) {
    const target = '/basliklar/sorunsal'
    const _options = { ...options, type: TITLE_TYPES.QUESTION }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch questions in today.
   *
   * @param   {object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @returns {Promise.<TitleCollection>}                   A promise for the agenda titles in today.
   */
  async questionsInToday(options = {}) {
    const target = '/basliklar/sorunsal-bugun'
    const _options = { ...options, type: TITLE_TYPES.QUESTION }
    const collection = new TitleCollection(this._request, target, _options)
    await collection.retrieve()

    return collection
  }
}

module.exports = EksiGuest
