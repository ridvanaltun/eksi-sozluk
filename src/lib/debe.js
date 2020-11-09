const objectAssignDeep = require('object-assign-deep')
const c = require('../constants')
const { NotFoundError } = require('../exceptions')

const debe = (_request, options) => {
  return new Promise((resolve, reject) => {
    // handle default options
    const _options = objectAssignDeep({
      limit: null
    }, options)

    _request({ endpoint: '/m/debe' }, ($) => {
      const status = $.statusCode

      if (status === 200) {
        let debe = $('li', 'ul.topic-list.partial.mobile')
          .map(function () {
            return {
              title: $(this).text().trim(),
              url: c.urls.base + $(this).find('a').attr('href')
            }
          })
          .get()

        if (_options.limit) debe = debe.slice(0, _options.limit)

        resolve(debe)
      } else if (status === 404) {
        reject(new NotFoundError('Debe not found.'))
      } else {
        reject(new Error('An unknown error occurred.'))
      }
    })
  })
}

module.exports = debe
