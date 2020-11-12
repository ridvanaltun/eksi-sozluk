const c = require('../constants')
const { NotFoundError } = require('../exceptions')

/**
 * User.
 */
class User {
  /**
   * User ID.
   * @type {(number|null)}
   */
  id = null

  /**
   * Tag URL.
   * @type {string}
   */
  username

  /**
   * User URL.
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
   * @type {Array<UserBadge>}
   */
  badges

  /**
   * Badge points.
   * @type {number}
   */
  badgePoints

  /**
   * Total entry count.
   * @type {number}
   */
  entryCountTotal

  /**
   * Last month entry count.
   * @type {number}
   */
  entryCountLastmonth

  /**
   * Last week entry count.
   * @type {number}
   */
  entryCountLastweek

  /**
   * Today entry count.
   * @type {number}
   */
  entryCountToday

  /**
   * Last entry time.
   * @type {string}
   */
  lastEntryTime

  /**
   * Is user followed?
   * @type {(boolean|null)}
   */
  isFollowed = null

  /**
   * Is user blocked?
   * @type {(boolean|null)}
   */
  isBlocked = null

  /**
   * Is user titles blocked?
   * @type {(boolean|null)}
   */
  isTitlesBlocked = null

  /**
   * User note.
   * @type {(string|null)}
   */
  note = null

  /**
   * Create user.
   * @param   {Object}  request         Axios client.
   * @param   {number}  username        Username.
   * @param   {string}  [cookies=null]  Cookie string.
   */
  constructor (request, username, cookies) {
    this._request = request
    this._cookies = cookies
    this.username = username
  }

  /**
   * Parse properties with given document.
   * @param   {Object}  $           Cheerio document.
   * @param   {Object}  [elm=null]  Cheerio element.
   * @ignore
   */
  serialize ($, elm = null) {
    // start - split badges
    const badges = []
    let badgePoints = null
    const badgeCount = $('ul#user-badges li').length

    $('ul#user-badges li').each((i, elm) => {
      if (i === badgeCount - 1) {
        // last badge
        const badgeText = $(elm).text()
        const badge = badgeText.replace(/[0-9]/g, '')
        badges.push({
          name: badge.substring(0, badge.length - 3),
          description: null
        })
        // scrape badge points
        badgePoints = parseInt(badgeText.replace(/^.*?(\d+).*/, '$1'))
      } else {
        badges.push({
          name: $(elm).text(),
          description: $(elm).find('a').attr('title')
        })
      }
    })
    // end - split badges

    this.username = $('h1#user-profile-title a').text()
    this.url = c.urls.user + this.username
    this.badges = badges
    this.badgePoints = badgePoints
    this.entryCountTotal = parseInt($('ul li#entry-count-total').text())
    this.entryCountLastmonth = parseInt($('ul li#entry-count-lastmonth').text())
    this.entryCountLastweek = parseInt($('ul li#entry-count-lastweek').text())
    this.entryCountToday = parseInt($('ul li#entry-count-today').text())
    this.lastEntryTime = $('ul li#last-entry-time').text().trim()

    // bind auth properties
    if (this._cookies) {
      this.id = parseInt($('#who').attr('value'))
      this.isFollowed = $('#buddy-link').data('added') || false
      this.isBlocked = $('#blocked-link').data('added') || false
      this.isTitlesBlocked = $('#blocked-index-title-link').data('added') || false
      this.note = $('#user-note').text()
    }
  }

  /**
   * Retrieve user.
   * @return  {Promise}  Promise.
   */
  retrieve () {
    return new Promise((resolve, reject) => {
      // make username url ready
      const username = this.username.replace(' ', '-')

      this._request({ endpoint: `/biri/${username}`, cookie: this._cookies }, ($) => {
        const status = $.statusCode

        if (status === 404) {
          return reject(new NotFoundError('User not found.'))
        }

        if (status !== 200) {
          return reject(new Error('An unknown error occurred.'))
        }

        this.serialize($)

        resolve()
      })
    })
  }
}

module.exports = User
