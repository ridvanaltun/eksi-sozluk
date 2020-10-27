const eksisozluk = require('../src/index')

describe('Today in History Test', () => {
  test('Getting Today in History', () => {
    return eksisozluk.getTodayInHistory('2018', { page: 1 })
      .then((data) => {
        expect(data.length).toBe(50)
      })
  })
})
