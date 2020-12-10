const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Entry Test', () => {
  test('Getting Entry By Id', () => {
    return instance.entryById(1)
      .then((data) => {
        expect(data.author).toBe('ssg')
        expect(data.authorId).toBe(8097)
        expect(data.authorUrl).toBe('https://eksisozluk.com/biri/ssg')
        expect(data.content).toBe(' gitar calmak icin kullanilan minik plastik garip nesne. ')
        expect(data.contentEncoded).toBe('gitar calmak icin kullanilan minik plastik garip nesne.')
        expect(data.id).toBe(1)
        expect(typeof data.favoriteCount).toBe('number')
        expect(data.permalink).toBe('https://eksisozluk.com/entry/1')
        expect(data.title).toBe('pena')
        expect(data.titleId).toBe(31782)
        expect(data.titleSlug).toBe('pena')
        expect(data.titleUrl).toBe('https://eksisozluk.com/pena--31782')
      })
  })
})
