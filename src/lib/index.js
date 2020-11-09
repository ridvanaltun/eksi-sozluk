'use strict'

const entryById = require('./entryById')
const entries = require('./entries')
const todayInHistory = require('./todayInHistory')
const user = require('./user')
const tags = require('./tags')
const titlesByTag = require('./titlesByTag')
const agenda = require('./agenda')
const debe = require('./debe')
const questions = require('./questions')

module.exports = {
  entryById,
  entries,
  todayInHistory,
  user,
  tags,
  titlesByTag,
  agenda,
  debe,
  questions
}
