const c = require('../constants')

const questions = (_request) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/basliklar/sorunsal', ajax: true }, ($) => {
      const status = $.statusCode

      // success
      if (status === 200) {
        const questions = []
        $('ul.topic-list.partial li a').each(function (i, elm) {
          const title = $(elm).find('div').text()
          const answerCount = $(elm).find('small').text()
          const questionTitle = $(elm).text().split(title)[0]
          questions.push({
            title: title.substring(1, title.length - 1), // clear title,
            question_title: questionTitle.substring(0, questionTitle.length - 1), // delete last white space
            question_link: c.urls.base + $(elm).attr('href'),
            answer_count: answerCount.includes('b')
              ? 1000 * parseInt(answerCount)
              : parseInt(answerCount) // calculate answer count,
          })
        })
        resolve(questions)
      }
    })
  })
}

module.exports = questions
