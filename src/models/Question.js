const { URLS } = require('../constants')

/**
 * Question.
 */
class Question {
  /**
   * Title name.
   *
   * @type {string}
   */
  title

  /**
   * Question title.
   *
   * @type {string}
   */
  questionTitle

  /**
   * Question URL.
   *
   * @type {string}
   */
  questionLink

  /**
   * Answer count, null means 0 or 1.
   *
   * @type {(number|null)}
   */
  answerCount

  /**
   * Parse properties with given document.
   *
   * @param {object}  $   Cheerio document.
   * @param {object}  elm Cheerio element.
   * @ignore
   */
  serialize ($, elm) {
    const title = $(elm)
      .find('div')
      .text()
    const answerCountStr = $(elm)
      .find('small')
      .text()
    const answerCount = parseInt(answerCountStr)
    const questionTitle = $(elm)
      .text()
      .split(title)[0]

    this.title = title.substring(1, title.length - 1)
    this.questionTitle = questionTitle.substring(0, questionTitle.length).trim()
    this.questionLink =
      URLS.BASE +
      $(elm)
        .find('a')
        .attr('href')
    this.answerCount = answerCountStr.includes('b')
      ? 1000 * answerCount
      : answerCount || null
  }
}

module.exports = Question
