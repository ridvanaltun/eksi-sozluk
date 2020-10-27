'use strict'

/**
 * Not found error.
 *
 * @property {string} name Error name.
 * @property {string} message Error message.
 */
class NotFoundError extends Error {
  /**
   * Create not found error.
   *
   * @param {string} message Error message.
   */
  constructor (message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'NotFoundError'
    this.message = message
  }
}

module.exports = NotFoundError
