const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Debe Test', () => {
  test('Getting Debe', () => {
    return instance.debeEntries()
      .then((data) => {
        // todo: write debe tests
      })
  })
})
