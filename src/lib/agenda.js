const { Title } = require('../models')

const agenda = (_request) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/basliklar/gundem', ajax: true }, ($) => {
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

module.exports = agenda
