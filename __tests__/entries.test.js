const eksisozluk = require('../src/index')

const instance = new eksisozluk()

describe('Entries Test', () => {
  test('Getting Entries', () => {
    return instance.entries('pena', { page: 1 })
      .then((data) => {
        expect(data.length).toBe(11)
        expect(data[0].author).toBe('ssg')
        expect(data[0].author_id).toBe(8097)
        expect(data[0].author_url).toBe('https://eksisozluk.com/biri/ssg')
        expect(data[0].content).toBe(' gitar calmak icin kullanilan minik plastik garip nesne. ')
        expect(data[0].content_encoded).toBe('gitar calmak icin kullanilan minik plastik garip nesne.')
        expect(data[0].entry_id).toBe(1)
        expect(typeof data[0].favorite_count).toBe('number')
        expect(data[0].permalink).toBe('https://eksisozluk.com/entry/1')
        expect(data[0].title).toBe('pena')
        expect(data[0].title_id).toBe(31782)
        expect(data[0].title_slug).toBe('pena')
        expect(data[0].title_url).toBe('https://eksisozluk.com/pena--31782')
      })
  })
})
