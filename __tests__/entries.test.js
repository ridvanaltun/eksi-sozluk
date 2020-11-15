const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('Entries Test', () => {
  test('Getting Entries', () => {
    return instance.entries('pena', { page: 1 })
      .then((data) => {
        expect(data.entries.length).toBe(11)
        const firstEntry = data.entries[0]
        expect(firstEntry.author).toBe('ssg')
        expect(firstEntry.authorId).toBe(8097)
        expect(firstEntry.authorUrl).toBe('https://eksisozluk.com/biri/ssg')
        expect(firstEntry.content).toBe(' gitar calmak icin kullanilan minik plastik garip nesne. ')
        expect(firstEntry.contentEncoded).toBe('gitar calmak icin kullanilan minik plastik garip nesne.')
        expect(firstEntry.id).toBe(1)
        expect(typeof firstEntry.favoriteCount).toBe('number')
        expect(firstEntry.permalink).toBe('https://eksisozluk.com/entry/1')
        expect(firstEntry.title).toBe('pena')
        expect(firstEntry.titleId).toBe(31782)
        expect(firstEntry.titleSlug).toBe('pena')
        expect(firstEntry.titleUrl).toBe('https://eksisozluk.com/pena--31782')
      })
  })
})
