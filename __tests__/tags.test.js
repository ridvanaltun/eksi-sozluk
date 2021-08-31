const { EksiSozluk } = require('../src/index')
const HttpsProxyAgent = require('https-proxy-agent')

let httpClient = {};

// use proxy over Travis
if (process.env.TRAVIS) {
  httpClient = {
    httpsAgent: new HttpsProxyAgent(process.env.HTTP_PROXY)
  }
}

const instance = new EksiSozluk({httpClient})

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
