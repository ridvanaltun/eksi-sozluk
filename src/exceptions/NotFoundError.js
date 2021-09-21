/**
 * Not found error.
 *
 * @property {string} [name=NotFoundError]          Error name.
 * @property {string} [resourceName=Resource]       Resource name.
 * @property {string} [message=Resource not found.] Error message.
 */
class NotFoundError extends Error {
  /**
   * Create not found error.
   *
   * @param {string} [resourceName=Resource]  Resource name.
   */
  constructor(resourceName = 'Resource') {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'NotFoundError'
    this.resourceName = resourceName
    this.message = `${resourceName} not found.`
  }
}

module.exports = NotFoundError
