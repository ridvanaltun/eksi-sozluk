const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Agenda Test', () => {
  test('Getting Agenda', () => {
    return instance.agenda()
      .then((data) => {
        // no test
      })
  })
})
