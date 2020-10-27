const axios = require('axios')
const urls = require('../utils/urls')
const e = require('../exceptions')

const formUrlEncoded = (x) => {
  return Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
}

/**
 * A promise for fetch user.
 *
 * @promise Vote
 * @reject  {VoteError} Throws when vote error.
 */

/**
 * Upvote.
 *
 * @return {Vote} Promise object
 */
function upvote () {
  return new Promise((resolve, reject) => {
    const { author_id: authorId, entry_id: entryId } = this
    const rate = 1

    axios({
      url: urls.vote,
      method: 'post',
      headers: { 'x-requested-with': 'XMLHttpRequest' },
      data: formUrlEncoded({
        id: entryId,
        rate,
        owner: authorId
      })
    })
      .then((res) => {
        // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
        resolve()
      })
      .catch((error) => {
        reject(new e.VoteError(error.message))
      })
  })
}

/**
 * Downvote.
 *
 * @return {Vote} Promise object
 */
function downvote () {
  return new Promise((resolve, reject) => {
    const { author_id: authorId, entry_id: entryId } = this
    const rate = -1

    axios({
      url: urls.vote,
      method: 'post',
      headers: { 'x-requested-with': 'XMLHttpRequest' },
      data: formUrlEncoded({
        id: entryId,
        rate,
        owner: authorId
      })
    })
      .then((res) => {
        // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
        resolve()
      })
      .catch((error) => {
        reject(new e.VoteError(error.message))
      })
  })
}

module.exports = {
  upvote,
  downvote
}
