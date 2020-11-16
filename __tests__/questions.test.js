const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Questions Test', () => {
  test('Getting Questions in Agenda', () => {
    return instance.questionsInAgenda()
      .then((data) => {
        // no test
      })
  })

  test('Getting Questions in Today', () => {
    return instance.questionsInToday()
      .then((data) => {
        // no test
      })
  })
})
