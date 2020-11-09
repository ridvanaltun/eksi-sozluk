'use strict'

/**
 * Vote error.
 * @property {string} [name=VoteError]  Error name.
 * @property {string} message           Error message.
 */
class VoteError extends Error {
  /**
   * Create vote error.
   * @param {string} message Error message.
   */
  constructor (message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'VoteError'
    this.message = message
  }
}

module.exports = VoteError
