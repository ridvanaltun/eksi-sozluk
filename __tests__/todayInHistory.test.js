const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Today in History Test', () => {
  test('Getting Today in History', () => {
    return instance.todayInHistory('2018', { page: 1 })
      .then((data) => {
        expect(data.length).toBe(50)
      })
  })
})
