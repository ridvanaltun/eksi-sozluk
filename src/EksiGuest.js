const { entryById, entries, todayInHistory, user, tags, titlesByTag, agenda, debe, questions } = require('./lib')
const { request } = require('./utils')

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
   * @typedef Entry
   * @property {string}        author           Entry author.
   * @property {number}        author_id        Entry author id.
   * @property {string}        author_url       Entry author URL.
   * @property {string}        content          Raw entry content.
   * @property {string}        content_encoded  Cleaned entry content.
   * @property {string}        date_created     Created date.
   * @property {(string|null)} date_modified    Modified date.
   * @property {(string|null)} eksiseyler_link  Eksi Seyler URL.
   * @property {(string|null)} eksiseyler_slug  Eksi Seyler slug.
   * @property {number}        entry_id         Entry id.
   * @property {number}        favorite_count   Favorite count.
   * @property {string}        permalink        Entry link.
   * @property {string}        title            Entry title.
   * @property {number}        title_id         Entry title id.
   * @property {string}        title_slug       Entry title slug.
   * @property {string}        title_url        Entry title URL.
   */

  /**
   * Fetch entry by id.
   * @param   {number}          entryId Entry Id.
   * @return  {Promise.<Entry>}         A promise for the entry.
   */
  async entryById (entryId) {
    return await entryById(this._request, entryId)
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
   * @typedef TodayInHistory
   * @property {string} title       Entry title.
   * @property {string} title_link  Entry title link.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch today in history.
   * @param   {string}                        year              A year.
   * @param   {Object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @return  {Promise.Array<TodayInHistory>}                   A promise for the today in history.
   */
  async todayInHistory (year, options) {
    return await todayInHistory(this._request, year, options)
  }

  /**
   * @typedef UserBadge
   * @property {string}         name        Badge name.
   * @property {(string|null)}  description Badge description.
   */

  /**
   * @typedef User
   * @property {string}           username              Username.
   * @property {string}           user_url              User URL.
   * @property {Array<UserBadge>} user_badges           Badge list.
   * @property {number}           user_badge_points     Badge points.
   * @property {number}           entry_count_total     Total entry count.
   * @property {number}           entry_count_lastmonth Last month entry count.
   * @property {number}           entry_count_lastweek  Last week entry count.
   * @property {number}           entry_count_today     Today entry count.
   * @property {string}           last_entry_time       Last entry time.
   */

  /**
   * Fetch user.
   * @param   {string}          username  Username.
   * @return  {Promise.<User>}            A promise for the user.
   */
  async user (username) {
    return await user(this._request, username)
  }

  /**
   * @typedef Tag
   * @property {string} name        Tag name.
   * @property {string} description Tag description.
   * @property {string} link        Tag URL.
   */

  /**
   * Fetch tags.
   * @return  {Promise.Array<Tag>} A promise for the tags.
   */
  async tags () {
    return await tags(this._request)
  }

  /**
   * @typedef TitleByTag
   * @property {string} title       Title.
   * @property {string} title_link  Title URL.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch titles by tag.
   * @param   {Object}                    options           Parameters that user can specify.
   * @param   {number}                    [options.page=1]  Page number.
   * @return  {Promise.Array<TitleByTag>}                   A promise for the titles by tag.
   */
  async titlesByTag (tagName, options) {
    return await titlesByTag(this._request, tagName, options)
  }

  /**
   * @typedef Agenda
   * @property {string} title       Entry title.
   * @property {string} title_link  Entry title link.
   * @property {number} entry_count Entry count.
   */

  /**
   * Fetch agenda.
   * @return {Promise.Array<Agenda>} A promise for the agenda.
   */
  async agenda () {
    return await agenda(this._request)
  }

  /**
   * @typedef YesterdayTopEntry
   * @property {string} title Title.
   * @property {string} url   Title URL.
   */

  /**
   * Fetch yesterday's top entries.
   * @param   {Object}                            options               Parameters that user can specify.
   * @param   {number}                            [options.limit=null]  The result limits.
   * @return  {Promise.Array<YesterdayTopEntry>}                        A promise for the yesterday's top entries.
   */
  async debe (options) {
    return await debe(this._request, options)
  }

  /**
   * @typedef Question
   * @property {string} title           Entry title.
   * @property {string} question_title  Question title.
   * @property {string} question_link   Question URL.
   * @property {number} answer_count    Answer count.
   */

  /**
   * Fetch questions.
   * @return {Promise.Array<Question>} A promise for the question.
   */
  async questions () {
    return await questions(this._request)
  }
}

module.exports = EksiGuest
