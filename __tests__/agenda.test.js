const eksisozluk = require('../src/index')

const instance = new eksisozluk()

describe('Agenda Test', () => {
  test('Getting Agenda', () => {
    return instance.agenda()
      .then((data) => {
        // no test
      })
  })
})
