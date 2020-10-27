const eksisozluk = require('../src/index')

describe('Debe Test', () => {
  test('Getting Debe', () => {
    return eksisozluk.getDebe({ limit: 5 })
      .then((data) => {
        expect(data.length).toBe(5)
      })
  })
})
