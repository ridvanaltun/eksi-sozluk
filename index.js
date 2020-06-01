'use strict';

const getEntryById = require('./lib/getEntryById');
const getEntries = require('./lib/getEntries');
const getUser = require('./lib/getUser');
const getDebe = require('./lib/getDebe');

const eksisozluk = {
  getEntryById,
  getEntries,
  getUser,
  getDebe,
};

module.exports = eksisozluk;
