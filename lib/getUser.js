'use strict';

const r = require('../utils/request');
const urls = require('../utils/urls');

const getKarma = ($) => {
  let badges = [];
  let badgePoints = null;
  const badgeCount = $('ul#user-badges li').length;

  $('ul#user-badges li').each((i, elm) => {
    if (i === (badgeCount - 1)) {
      // last badge
      const badgeText = $(elm).text();
      const badge = (badgeText.replace(/[0-9]/g, ''));
      badges.push({
        name: badge.substring(0, badge.length - 3),
        description: null
      });
      // scrape badge points
      badgePoints = parseInt(badgeText.replace(/^.*?(\d+).*/,'$1'));
    } else {
      badges.push({
        name: $(elm).text(),
        description: $(elm).find('a').attr('title')
      });
    }
  });

  return {badges, badgePoints};
}

const getUser = (username, callback) => {

  // make username url ready
  username = username.replace(' ', '-');

  const options = {
    endpoint: 'biri',
    id: username
  };

  r(options, $ => {

    const status = $.statusCode;
    let user = {status};

    // get badges
    const {badges, badgePoints} = getKarma($);

    switch (status) {
      case 200:
        user.data = {
          username: $('h1#user-profile-title a').text(),
          user_url: urls.user + username,
          user_badges: badges,
          user_badge_points: badgePoints,
          entry_count_total: parseInt($('ul li#entry-count-total').text()),
          entry_count_lastmonth: parseInt($('ul li#entry-count-lastmonth').text()),
          entry_count_lastweek: parseInt($('ul li#entry-count-lastweek').text()),
          entry_count_today: parseInt($('ul li#entry-count-today').text()),
          last_entry_time: $('ul li#last-entry-time').text().trim()
        };
        break;

      case 404:
        user.data = {
          error: 'Not Found',
          message: 'User does not exist.'
        };
        break;

      default:
        user.data = {
          error: 'Unknow Error',
          message: 'An unknow error occurred.'
        };
        break;
    }

    callback(user);
  });
};

module.exports = getUser;
