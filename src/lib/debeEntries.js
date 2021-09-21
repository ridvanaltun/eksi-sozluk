const { Entry, EntryForMember } = require('../models')
const { URLS } = require('../constants')

const debeEntries = (_request, cookie = null) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      endpoint: '/debe',
      ajax: true,
      resourceName: 'Debe'
    }
    _request(requestOptions, $ => {
      const entries = []

      $('ul.topic-list.partial li').each((i, elm) => {
        const entryId = parseInt($(elm).find('a').attr('href').split('/')[2])
        const entry = cookie
          ? new EntryForMember(_request, entryId, cookie)
          : new Entry(_request, entryId)
        entry.title = $(elm).text().trim()
        entry.permalink = URLS.BASE + $(elm).find('a').attr('href')
        entries.push(entry)
      })

      resolve(entries)
    })
  })
}

module.exports = debeEntries
