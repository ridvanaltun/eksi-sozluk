const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Debe Test', () => {
  test('Getting Debe', () => {
    return instance.debe({ limit: 5 })
      .then((data) => {
        expect(data.length).toBe(5)
      })
  })
})
