const objectAssignDeep = require('object-assign-deep')
const { TrashEntry } = require('../models')

const trashEntries = (_request, cookie, options) => {
  return new Promise((resolve, reject) => {
    // handle default options
    const _options = objectAssignDeep({
      page: 1
    }, options)

    // handle params
    const params = {
      p: _options.page
    }

    _request({ endpoint: '/cop', params, cookie }, ($) => {
      const status = $.statusCode

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const entries = []

      $('ul#trash-items li article').each((i, elm) => {
        const entryId = parseInt($(elm).find('h2 > a').attr('href').split('/')[2])
        const entry = new TrashEntry(_request, entryId, cookie)
        entry.extendTrashProps($, elm)
        // await entry.retrieve()
        entries.push(entry)
      })

      resolve(entries)
    })
  })
}

module.exports = trashEntries
