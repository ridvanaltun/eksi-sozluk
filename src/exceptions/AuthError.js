/**
 * Auth error.
 *
 * @property {string} [name=AuthError]         Error name.
 * @property {string} [message=Not Authorized] Error message.
 */
class AuthError extends Error {
  /**
   * Create auth error.
   */
  constructor() {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'AuthError'
    this.message = 'Not Authorized'
  }
}

module.exports = AuthError
