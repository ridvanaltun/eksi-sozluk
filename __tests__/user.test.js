const { EksiSozluk } = require('../src/index')
const HttpsProxyAgent = require('https-proxy-agent')

let httpClient = {};

// use proxy over Travis
if (process.env.TRAVIS) {
  httpClient = {
    httpsAgent: new HttpsProxyAgent(process.env.PROXY)
  }
}

const instance = new EksiSozluk({httpClient})

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
