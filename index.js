'use strict';

const auth = require('./lib/auth');
const entries = require('./lib/entries');
const titles = require('./lib/titles');
const users = require('./lib/users');

const eksisozluk = {
  auth,
  entries,
  titles,
  users
};

module.exports = eksisozluk;
