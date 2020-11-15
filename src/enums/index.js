'use strict'

/**
 * @typedef {number} TitleType
 **/

/**
 * Enum for tri-state values.
 * @readonly
 * @enum {TitleType}
 */
var TITLE_TYPES = {
  TITLE: 1,
  DRAFT: 2,
  FOLLOWED_USER: 3,
  FOLLOWED_USER_FAVORITE_ENTRY: 4
}

module.exports = {
  TITLE_TYPES
}
