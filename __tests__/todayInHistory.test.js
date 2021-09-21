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

describe('Today in History Test', () => {
  test('Getting Today in History', () => {
    return instance.todayInHistory('2018', { page: 1 })
      .then((data) => {
        // todo: write today in history tests
      })
  })
})
