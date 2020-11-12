const { Tag, TagForMember } = require('../models')

const tags = (_request, cookie = null) => {
  return new Promise((resolve, reject) => {
    _request({ endpoint: '/kanallar', cookie }, ($) => {
      const status = $.statusCode

      if (status !== 200) {
        return reject(new Error('An unknown error occurred.'))
      }

      const tags = []

      $('ul#channel-follow-list li').each((i, elm) => {
        const tag = cookie ? new TagForMember(cookie) : new Tag()
        tag.serialize($, elm)
        tags.push(tag)
      })

      resolve(tags)
    })
  })
}

module.exports = tags
