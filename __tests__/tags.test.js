const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Tags Test', () => {
  test('Getting Tags', () => {
    return instance.tags()
      .then((data) => {
        expect(data[0].name).toBe('haber')
        expect(data[0].description).toBe('yurtta ve dünyada olan biten')
        expect(data[0].link).toBe('https://eksisozluk.com/basliklar/kanal/haber')
      })
  })
})
