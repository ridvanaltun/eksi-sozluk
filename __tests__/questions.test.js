const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Questions Test', () => {
  test('Getting Questions', () => {
    return instance.questions()
      .then((data) => {
        // no test
      })
  })
})
