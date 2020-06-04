'use strict';

const r = require('../utils/request');
const urls = require('../utils/urls');
const e = require('../exceptions');

/**
 * Returns user badges.
 *
 * @param   {Object}  $  An object for cheerio.
 *
 * @return  {Object}     Badges and badge points.
 *
 * @private
 * @ignore
 */
const getKarma = ($) => {
  const badges = [];
  let badgePoints = null;
  const badgeCount = $('ul#user-badges li').length;

  $('ul#user-badges li').each((i, elm) => {
    if (i === (badgeCount - 1)) {
      // last badge
      const badgeText = $(elm).text();
      const badge = (badgeText.replace(/[0-9]/g, ''));
      badges.push({
        name: badge.substring(0, badge.length - 3),
        description: null,
      });
      // scrape badge points
      badgePoints = parseInt(badgeText.replace(/^.*?(\d+).*/, '$1'));
    } else {
      badges.push({
        name: $(elm).text(),
        description: $(elm).find('a').attr('title'),
      });
    }
  });

  return {badges, badgePoints};
};

/**
 * A promise for fetch user.
 *
 * @promise User
 * @fulfill {Object} The user.
 * @reject {NotFoundError} Throws when user not found.
 */

/**
 * Fetch user.
 *
 * @param   {string}  username  Username.
 *
 * @returns {User} A promise for the user.
 */
const getUser = (username) => {
  return new Promise((resolve, reject) => {
    // make username url ready
    username = username.replace(' ', '-');

    const options = {
      endpoint: 'biri',
      id: username,
    };

    r(options, ($) => {
      const status = $.statusCode;
      let user = {};

      // get badges
      const {badges, badgePoints} = getKarma($);

      // success
      if (status === 200) {
        user = {
          username: $('h1#user-profile-title a').text(),
          user_url: urls.user + username,
          user_badges: badges,
          user_badge_points: badgePoints,
          entry_count_total: parseInt($('ul li#entry-count-total').text()),
          entry_count_lastmonth: parseInt($('ul li#entry-count-lastmonth').text()),
          entry_count_lastweek: parseInt($('ul li#entry-count-lastweek').text()),
          entry_count_today: parseInt($('ul li#entry-count-today').text()),
          last_entry_time: $('ul li#last-entry-time').text().trim(),
        };

        resolve(user);
      }

      // not found
      if (status === 404) {
        reject(new e.NotFoundError('User not found.'));
      }

    });
  });
};

module.exports = getUser;
