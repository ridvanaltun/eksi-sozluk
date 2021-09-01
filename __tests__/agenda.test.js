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

describe('Agenda Test', () => {
  test('Getting Agenda', () => {
    return instance.agenda()
      .then((data) => {
        // todo: write agenda tests
      })
  })
})
