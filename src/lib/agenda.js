const c = require('../constants')

const agenda = (_request) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/basliklar/gundem', ajax: true }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const agenda = []
        $('ul.topic-list.partial li a').each(function (i, elm) {
          const title = $(elm).text()
          const entryCount = $(elm).find('small').text()
          agenda.push({
            title: title.substring(0, title.length - (entryCount.length + 1)), // clear title,
            title_link: c.urls.base + $(elm).attr('href'),
            entry_count: entryCount.includes('b')
              ? 1000 * parseInt(entryCount)
              : parseInt(entryCount) // calculate entry count,
          })
        })
        resolve(agenda)
      }
    })
  })
}

module.exports = agenda
