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

describe('Questions Test', () => {
  test('Getting Questions in Agenda', () => {
    return instance.questionsInAgenda()
      .then((data) => {
        // no test
      })
  })

  test('Getting Questions in Today', () => {
    return instance.questionsInToday()
      .then((data) => {
        // no test
      })
  })
})
