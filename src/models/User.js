const UserEntryCollection = require('./UserEntryCollection')
const ImageCollection = require('./ImageCollection')
const UserFavoriteAuthorCollection = require('./UserFavoriteAuthorCollection')
const UkteCollection = require('./UkteCollection')
const { URLS } = require('../constants')

/**
 * User.
 */
class User {
  /**
   * User ID.
   *
   * @type {(number|null)}
   */
  id = null

  /**
   * Tag URL.
   *
   * @type {string}
   */
  username

  /**
   * User URL.
   *
   * @type {string}
   */
  url

  /**
   * @typedef UserBadge
   * @property {string}         name        Badge name.
   * @property {(string|null)}  description Badge description.
   */

  /**
   * Badge list.
   *
   * @type {Array<UserBadge>}
   */
  badges

  /**
   * Badge points.
   *
   * @type {number}
   */
  badgePoints

  /**
   * Total entry count.
   *
   * @type {number}
   */
  entryCountTotal

  /**
   * Last month entry count.
   *
   * @type {number}
   */
  entryCountLastmonth

  /**
   * Last week entry count.
   *
   * @type {number}
   */
  entryCountLastweek

  /**
   * Today entry count.
   *
   * @type {number}
   */
  entryCountToday

  /**
   * Last entry time.
   *
   * @type {(string|null)}
   */
  lastEntryTime

  /**
   * Is user followed?
   *
   * @type {(boolean|null)}
   */
  isFollowed = null

  /**
   * Is user blocked?
   *
   * @type {(boolean|null)}
   */
  isBlocked = null

  /**
   * Is user titles blocked?
   *
   * @type {(boolean|null)}
   */
  isTitlesBlocked = null

  /**
   * User note.
   *
   * @type {(string|null)}
   */
  note = null

  /**
   * Create user.
   *
   * @param   {object}  request         Axios client.
   * @param   {string}  username        Username.
   * @param   {string}  [cookies=null]  Cookie string.
   */
  constructor(request, username, cookies = null) {
    this._request = request
    this._cookies = cookies
    this.username = username
  }

  /**
   * Parse properties with given document.
   *
   * @param   {object}  $           Cheerio document.
   * @param   {object}  [elm=null]  Cheerio element.
   * @ignore
   */
  serialize($, elm = null) {
    // start - split badges
    const badges = []
    let badgePoints = null
    const badgeCount = $('ul#user-badges li').length

    $('ul#user-badges li').each((i, elm) => {
      if (i === badgeCount - 1) {
        // last badge
        const badgeText = $(elm).text()
        const badge = badgeText.replace(/[0-9]|\(|\)/g, '').trim()
        badges.push({
          name: badge,
          description: null
        })
        // scrape badge points
        badgePoints = parseInt(badgeText.replace(/^.*?(\d+).*/, '$1')) || 0
      } else {
        badges.push({
          name: $(elm).text(),
          description: $(elm).find('a').attr('title')
        })
      }
    })
    // end - split badges

    const lastEntryTime = $('ul li#last-entry-time').text().trim()

    this.username = $('h1#user-profile-title a').text()
    this.url = URLS.USER + this.username
    this.badges = badges
    this.badgePoints = badgePoints
    this.entryCountTotal = parseInt($('ul li#entry-count-total').text())
    this.entryCountLastmonth = parseInt($('ul li#entry-count-lastmonth').text())
    this.entryCountLastweek = parseInt($('ul li#entry-count-lastweek').text())
    this.entryCountToday = parseInt($('ul li#entry-count-today').text())
    this.lastEntryTime = lastEntryTime === '' ? null : lastEntryTime

    const isAuth = this._cookies

    // bind auth properties
    if (isAuth) {
      const note = $('#user-note').text()
      this.id = parseInt($('#who').attr('value'))
      this.isFollowed = $('#buddy-link').data('added') || false
      this.isBlocked = $('#blocked-link').data('added') || false
      this.isTitlesBlocked =
        $('#blocked-index-title-link').data('added') || false
      this.note = note === '' ? null : note
    }
  }

  /**
   * Retrieve user.
   *
   * @returns {Promise}  Promise.
   */
  retrieve() {
    return new Promise((resolve, reject) => {
      // make username url ready
      const username = this.username.replace(' ', '-')
      const requestOptions = {
        endpoint: `/biri/${username}`,
        cookie: this._cookies,
        resourceName: 'User'
      }
      this._request(requestOptions, $ => {
        this.serialize($)
        resolve()
      })
    })
  }

  /**
   * Fetch user entries by latest.
   *
   * @param   {object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @returns {Promise.<UserEntryCollection>}                   User entries by last posted.
   */
  async entries(options) {
    const entries = new UserEntryCollection(
      this._request,
      URLS.USER_LATEST_ENTRIES,
      this.username,
      this._cookies,
      options
    )
    await entries.retrieve()

    return entries
  }

  /**
   * Fetch user favorite entries by latest.
   *
   * @param   {object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @returns {Promise.<UserEntryCollection>}                   User entries by last favorited.
   */
  async favorites(options) {
    const entries = new UserEntryCollection(
      this._request,
      URLS.USER_FAVORITE_ENTRIES,
      this.username,
      this._cookies,
      options
    )
    await entries.retrieve()

    return entries
  }

  /**
   * Fetch user favorited entries by most favorited.
   *
   * @param   {object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @returns {Promise.<UserEntryCollection>}                   User entries by most favorited.
   */
  async favoritedEntries(options) {
    const entries = new UserEntryCollection(
      this._request,
      URLS.USER_MOST_FAVORITE_ENTRIES,
      this.username,
      this._cookies,
      options
    )
    await entries.retrieve()

    return entries
  }

  /**
   * Fetch user last voted entries.
   *
   * @param   {object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @returns {Promise.<UserEntryCollection>}                   User entries by last voted.
   */
  async lastVotedEntries(options) {
    const entries = new UserEntryCollection(
      this._request,
      URLS.USER_LAST_VOTED_ENTRIES,
      this.username,
      this._cookies,
      options
    )
    await entries.retrieve()

    return entries
  }

  /**
   * Fetch user self favorited entries.
   *
   * @param   {object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @returns {Promise.<UserEntryCollection>}                   User entries by self favorited.
   */
  async selfFavoritedEntries(options) {
    const entries = new UserEntryCollection(
      this._request,
      URLS.USER_SELF_FAVORITE_ENTRIES,
      this.username,
      this._cookies,
      options
    )
    await entries.retrieve()

    return entries
  }

  /**
   * Fetch user most liked entries.
   *
   * @param   {object}                        options           Parameters that user can specify.
   * @param   {number}                        [options.page=1]  Page number.
   * @returns {Promise.<UserEntryCollection>}                   User entries by most liked.
   */
  async mostLikedEntries(options) {
    const entries = new UserEntryCollection(
      this._request,
      URLS.USER_MOST_LIKED_ENTRIES,
      this.username,
      this._cookies,
      options
    )
    await entries.retrieve()

    return entries
  }

  /**
   * User images.
   *
   * @returns {ImageCollection} User images.
   */
  async images() {
    const images = new ImageCollection(this._request, this.username)
    await images.retrieve()

    return images
  }

  /**
   * Fetch user favorite authors until last one month.
   *
   * @returns {UserFavoriteAuthorCollection}  User favorite authors.
   */
  async favoriteAuthors() {
    const collection = new UserFavoriteAuthorCollection(
      this._request,
      this.username,
      this._cookies
    )
    await collection.retrieve()

    return collection
  }

  /**
   * Fetch ukteler.
   *
   * @returns {UkteCollection}  User ukteler.
   */
  async ukteler() {
    const collection = new UkteCollection(
      this._request,
      this.username,
      this._cookies
    )
    await collection.retrieve()

    return collection
  }
}

module.exports = User
