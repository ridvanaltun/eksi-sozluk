'use strict'

const entries = require('./entries')
const todayInHistory = require('./todayInHistory')
const tags = require('./tags')
const titlesByTag = require('./titlesByTag')
const agenda = require('./agenda')
const debeEntries = require('./debeEntries')
const questions = require('./questions')
const trashEntries = require('./trashEntries')

module.exports = {
  entries,
  todayInHistory,
  tags,
  titlesByTag,
  agenda,
  debeEntries,
  questions,
  trashEntries
}
