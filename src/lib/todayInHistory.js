const objectAssignDeep = require('object-assign-deep')
const { Title } = require('../models')
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

      if (status === 404) {
        return reject(new NotFoundError('Today in history not found.'))
      }

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const titles = []

      $('ul.topic-list.partial.mobile li').each((i, elm) => {
        const title = new Title()
        title.serialize($, elm)
        titles.push(title)
      })

      resolve(titles)
    })
  })
}

module.exports = todayInHistory
