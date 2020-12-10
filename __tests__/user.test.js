const { EksiSozluk } = require('../src/index')

const instance = new EksiSozluk()

describe('User Test', () => {
  test('Getting User', () => {
    return instance.user('ssg')
      .then((data) => {
        expect(data.username).toBe('ssg')
        expect(data.url).toBe('https://eksisozluk.com/biri/ssg')
        expect(typeof data.badgePoints).toBe('number')
        expect(typeof data.entryCountTotal).toBe('number')
        expect(typeof data.entryCountLastmonth).toBe('number')
        expect(typeof data.entryCountLastweek).toBe('number')
        expect(typeof data.entryCountToday).toBe('number')
      })
  })
})
