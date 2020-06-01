'use strict';

const login = require('./login');
const logout = require('./logout');

const auth = {
  login,
  logout
};

module.exports = auth;
