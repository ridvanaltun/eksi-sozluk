const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Entries Test', () => {
  test('Getting Entries', () => {
    return instance.entries('pena', { page: 1 })
      .then((data) => {
        expect(data.length).toBe(11)
        expect(data[0].author).toBe('ssg')
        expect(data[0].authorId).toBe(8097)
        expect(data[0].authorUrl).toBe('https://eksisozluk.com/biri/ssg')
        expect(data[0].content).toBe(' gitar calmak icin kullanilan minik plastik garip nesne. ')
        expect(data[0].contentEncoded).toBe('gitar calmak icin kullanilan minik plastik garip nesne.')
        expect(data[0].id).toBe(1)
        expect(typeof data[0].favoriteCount).toBe('number')
        expect(data[0].permalink).toBe('https://eksisozluk.com/entry/1')
        expect(data[0].title).toBe('pena')
        expect(data[0].titleId).toBe(31782)
        expect(data[0].titleSlug).toBe('pena')
        expect(data[0].titleUrl).toBe('https://eksisozluk.com/pena--31782')
      })
  })
})
