'use strict';

const getEntryById = require('./lib/getEntryById');
const getEntries = require('./lib/getEntries');
const getTodayInHistory = require('./lib/getTodayInHistory');
const getUser = require('./lib/getUser');
const getDebe = require('./lib/getDebe');

const eksisozluk = {
  getEntryById,
  getEntries,
  getTodayInHistory,
  getUser,
  getDebe,
};

module.exports = eksisozluk;
