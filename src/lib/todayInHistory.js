const objectAssignDeep = require('object-assign-deep')
const c = require('../constants')
const { NotFoundError } = require('../exceptions')

const todayInHistory = (_request, year, options) => {
  return new Promise((resolve, reject) => {
    // handle default options
    const _options = objectAssignDeep({
      page: 1
    }, options)

    // handle params
    const params = {
      year,
      p: _options.page
    }

    _request({ endpoint: '/basliklar/m/tarihte-bugun', params }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const titles = []
        $('ul.topic-list.partial.mobile li').each(function (i, elm) {
          const title = $(elm).text().trim()
          const entryCount = $(elm).find('a small').text().trim()
          titles.push({
            title: title.substring(0, title.length - (entryCount.length + 1)), // clear title
            title_url: c.urls.base + $(elm).find('a').attr('href'),
            entry_count: entryCount.includes('b')
              ? 1000 * parseInt(entryCount)
              : parseInt(entryCount) // calculate entry count
          })
        })
        resolve(titles)
      }

      if (status === 404) {
        reject(new NotFoundError('Today in history not found.'))
      }
    })
  })
}

module.exports = todayInHistory
