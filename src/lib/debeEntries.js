const { Entry, EntryForMember } = require('../models')
const { URLS } = require('../constants')
const { NotFoundError } = require('../exceptions')

const debeEntries = (_request, cookie = null) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/debe', ajax: true }, $ => {
      const status = $.statusCode

      if (status === 404) {
        return reject(new NotFoundError('Debe not found.'))
      }

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const entries = []

      $('ul.topic-list.partial li').each((i, elm) => {
        const entryId = parseInt(
          $(elm)
            .find('a')
            .attr('href')
            .split('/')[2]
        )
        const entry = cookie
          ? new EntryForMember(_request, entryId, cookie)
          : new Entry(_request, entryId)
        entry.title = $(elm)
          .text()
          .trim()
        entry.permalink =
          URLS.BASE +
          $(elm)
            .find('a')
            .attr('href')
        entries.push(entry)
      })

      resolve(entries)
    })
  })
}

module.exports = debeEntries
