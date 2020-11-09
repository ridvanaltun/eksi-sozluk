const c = require('../constants')
const { NotFoundError } = require('../exceptions')

const user = (_request, username) => {
  return new Promise((resolve, reject) => {
    // make username url ready
    username = username.replace(' ', '-')

    _request({ endpoint: `/biri/${username}` }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
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

        const user = {
          username: $('h1#user-profile-title a').text(),
          user_url: c.urls.user + username,
          user_badges: badges,
          user_badge_points: badgePoints,
          entry_count_total: parseInt($('ul li#entry-count-total').text()),
          entry_count_lastmonth: parseInt(
            $('ul li#entry-count-lastmonth').text()
          ),
          entry_count_lastweek: parseInt(
            $('ul li#entry-count-lastweek').text()
          ),
          entry_count_today: parseInt($('ul li#entry-count-today').text()),
          last_entry_time: $('ul li#last-entry-time').text().trim()
        }
        resolve(user)
      }

      if (status === 404) {
        reject(new NotFoundError('User not found.'))
      }
    })
  })
}

module.exports = user
