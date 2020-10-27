const axios = require('axios');
const urls = require('../utils/urls');
const e = require("../exceptions");

const formUrlEncoded = x => {
  return Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
}

function upvote() {
  return new Promise((resolve, reject) => {
    const {author_id: authorId, entry_id: entryId} = this;
    const rate = 1;

    axios({
      url: urls.vote,
      method: 'post',
      headers: { 'x-requested-with': 'XMLHttpRequest' },
      data: formUrlEncoded({
        id: entryId,
        rate,
        owner: authorId,
      })
    })
    .then((res) => {
      // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
      resolve()
    })
    .catch ((error) => {
      reject(new e.VoteError(error.message))
    })
  })
}

function downvote() {
  return new Promise((resolve, reject) => {
    const {author_id: authorId, entry_id: entryId} = this;
    const rate = -1;

    axios({
      url: urls.vote,
      method: 'post',
      headers: { 'x-requested-with': 'XMLHttpRequest' },
      data: formUrlEncoded({
        id: entryId,
        rate,
        owner: authorId,
      })
    })
    .then((res) => {
      // res.data -> { Success: true, AlreadyVotedAnonymously: false, Message: 'oldu' }
      resolve()
    })
    .catch ((error) => {
      reject(new e.VoteError(error.message))
    })
  })
}

module.exports = {
  upvote,
  downvote,
}
