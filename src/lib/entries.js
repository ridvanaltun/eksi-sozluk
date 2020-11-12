const objectAssignDeep = require('object-assign-deep')
const { Entry, EntryForMember } = require('../models')
const { NotFoundError } = require('../exceptions')

const entries = (_request, title, options) => {
  return new Promise((resolve, reject) => {
    // handle default options
    const _options = objectAssignDeep({
      page: 1
    }, options)

    // handle params
    const params = {
      q: title,
      p: _options.page
    }

    _request({ endpoint: '/', params, cookie: _options.cookies }, ($) => {
      const status = $.statusCode

      // title has not any entry
      if (status === 404) {
        return reject(new NotFoundError('Entries not found.'))
      }

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const entries = []

      $('ul#entry-item-list li').each((i, elm) => {
        const entryId = $(elm).data('id')
        const entry = _options.cookies ? new EntryForMember(_request, entryId, _options.cookies) : new Entry(_request, entryId)
        entry.serialize($, elm)
        entries.push(entry)
      })

      resolve(entries)
    })
  })
}

module.exports = entries
