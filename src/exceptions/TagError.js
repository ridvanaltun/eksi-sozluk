'use strict'

/**
 * Tag error.
 * @property {string} [name=TagError]  Error name.
 * @property {string} message          Error message.
 */
class TagError extends Error {
  /**
   * Create tag error.
   * @param {string} message Error message.
   */
  constructor (message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'TagError'
    this.message = message
  }
}

module.exports = TagError
