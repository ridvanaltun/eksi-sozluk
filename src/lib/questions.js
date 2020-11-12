const { Question } = require('../models')
const c = require('../constants')

const questions = (_request) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/basliklar/sorunsal', ajax: true }, ($) => {
      const status = $.statusCode

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const questions = []

      $('ul.topic-list.partial li a').each((i, elm) => {
        const title = $(elm).find('div').text()
        const answerCountStr = $(elm).find('small').text()
        const answerCount = parseInt(answerCountStr)
        const questionTitle = $(elm).text().split(title)[0]

        const question = new Question()
        question.title = title.substring(1, title.length - 1)
        question.questionTitle = questionTitle.substring(0, questionTitle.length).trim()
        question.questionLink = c.urls.base + $(elm).attr('href')
        question.answerCount = answerCountStr.includes('b') ? (1000 * answerCount) : answerCount || 0
        questions.push(question)
      })

      resolve(questions)
    })
  })
}

module.exports = questions
