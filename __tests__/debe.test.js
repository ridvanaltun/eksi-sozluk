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

describe('Debe Test', () => {
  test('Getting Debe', () => {
    return instance.debeEntries()
      .then((data) => {
        // todo: write debe tests
      })
  })
})
