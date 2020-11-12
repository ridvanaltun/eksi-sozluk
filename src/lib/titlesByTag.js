const objectAssignDeep = require('object-assign-deep')
const { Title } = require('../models')

const titlesByTag = (_request, tagName, options) => {
  // handle default options
  const _options = objectAssignDeep(
    {
      page: 1
    },
    options
  )

  // handle params
  const params = {
    p: _options.page
  }

  return new Promise((resolve, reject) => {
    _request({
      endpoint: `/basliklar/kanal/${tagName}`,
      ajax: true,
      params
    }, ($) => {
      const status = $.statusCode

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const titles = []

      $('ul.topic-list.partial li a').each((i, elm) => {
        const title = new Title()
        title.serialize($, elm)
        titles.push(title)
      })

      resolve(titles)
    })
  })
}

module.exports = titlesByTag
