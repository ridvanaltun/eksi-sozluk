const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Agenda Test', () => {
  test('Getting Agenda', () => {
    return instance.agenda()
      .then((data) => {
        // todo: write agenda tests
      })
  })
})
