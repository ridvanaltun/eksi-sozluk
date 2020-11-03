const eksisozluk = require('../src/index')

const instance = new eksisozluk()

describe('Entry Test', () => {
  test('Getting Entry By Id', () => {
    return instance.entryById(1)
      .then((data) => {
        expect(data.author).toBe('ssg')
        expect(data.author_id).toBe(8097)
        expect(data.author_url).toBe('https://eksisozluk.com/biri/ssg')
        expect(data.content).toBe(' gitar calmak icin kullanilan minik plastik garip nesne. ')
        expect(data.content_encoded).toBe('gitar calmak icin kullanilan minik plastik garip nesne.')
        expect(data.entry_id).toBe(1)
        expect(typeof data.favorite_count).toBe('number')
        expect(data.permalink).toBe('https://eksisozluk.com/entry/1')
        expect(data.title).toBe('pena')
        expect(data.title_id).toBe(31782)
        expect(data.title_slug).toBe('pena')
        expect(data.title_url).toBe('https://eksisozluk.com/pena--31782')
      })
  })
})
