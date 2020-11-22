const axios = require('axios')
const setCookie = require('set-cookie-parser')
const qs = require('querystring')
const objectAssignDeep = require('object-assign-deep')
const { EntryForMember, DraftEntry } = require('../models')
const { URLS } = require('../constants')
const { getActualPath } = require('../utils')

const createEntry = (request, title, content, options, cookie) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // handle default options
    const _options = objectAssignDeep(
      {
        saveAsDraft: false
      },
      options
    )

    // save content as draft
    if (_options.saveAsDraft) {
      const actualPath = await getActualPath(title)

      const requestBody = {
        title,
        content
      }

      const config = {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          cookie
        }
      }

      axios
        .post(
          `${URLS.BASE}/${actualPath}/savedraft`,
          qs.stringify(requestBody),
          config
        )
        .then(res => {
          if (res.data.Success) {
            resolve(new DraftEntry(request, title, cookie))
          } else {
            reject(new Error('An unknow error occurred.'))
          }
        })
        .catch(err => {
          reject(new Error(err.message))
        })
    } else {
      // create entry
      axios
        .get(`${URLS.BASE}/?q=${title}`, {
          headers: {
            Cookie: cookie
          }
        })
        .then(res => {
          // parse csrf token and cookies
          const csrfRegex = new RegExp(
            '(?<=input name="__RequestVerificationToken" type="hidden" value=")(.*)(?=" />)',
            'u'
          )
          const csrfToken = csrfRegex.exec(res.data)[0]

          const cookies = setCookie.parse(res.headers['set-cookie'], {
            map: true
          })
          const csrfTokenInCookies = cookies.__RequestVerificationToken.value

          return { csrfToken, csrfTokenInCookies }
        })
        .then(async ({ csrfToken, csrfTokenInCookies }) => {
          // create entry
          const _res = await axios({
            url: URLS.CREATE_ENTRY,
            method: 'POST',
            headers: {
              Cookie: `__RequestVerificationToken=${csrfTokenInCookies}; ${cookie}`
            },
            data: qs.stringify({
              __RequestVerificationToken: csrfToken,
              Title: title,
              Content: content
            })
          })

          return _res
        })
        .then(res => {
          const entryIdRegex = new RegExp(
            '(?<=li class="hidden" data-id=")(.*)(?=" data-author=")',
            'u'
          )
          const entryId = entryIdRegex.exec(res.data)[0]
          resolve(new EntryForMember(request, entryId, cookie))
        })
        .catch(err => {
          // detect if entry already exist
          if (
            err.response &&
            err.response.status === 404 &&
            err.response.data.includes('böyle bir entry zaten var')
          ) {
            return reject(new Error('Entry already exist.'))
          }

          // handle errors
          reject(new Error(err.message))
        })
    }
  })
}

module.exports = createEntry
