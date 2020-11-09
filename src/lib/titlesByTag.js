const objectAssignDeep = require('object-assign-deep')
const c = require('../constants')

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

      // success
      if (status === 200) {
        const titles = []
        $('ul.topic-list.partial li a').each(function (i, elm) {
          const title = $(elm).text()
          const entryCount = $(elm).find('small').text()
          titles.push({
            title: title.substring(0, title.length - (entryCount.length)).trim(),
            title_link: c.urls.base + $(elm).attr('href'),
            entry_count: entryCount.includes('b')
              ? 1000 * parseInt(entryCount)
              : parseInt(entryCount) ? parseInt(entryCount) : 1 // calculate entry count,,
          })
        })
        resolve(titles)
      }
    })
  })
}

module.exports = titlesByTag
