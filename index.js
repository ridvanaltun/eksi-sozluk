'use strict';

const getEntryById = require('./lib/getEntryById');
const getUser = require('./lib/getUser');
const getDebe = require('./lib/getDebe');

const eksisozluk = {
  getEntryById,
  getUser,
  getDebe
};

module.exports = eksisozluk;
