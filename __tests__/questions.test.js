const eksisozluk = require('../src/index')

const instance = new eksisozluk()

describe('Questions Test', () => {
  test('Getting Questions', () => {
    return instance.questions()
      .then((data) => {
        // no test
      })
  })
})
