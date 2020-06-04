module.exports = {
  'verbose': true,
  'roots': ['__tests__/'],
  // This line solves: Cross origin http://localhost forbidden
  // @see https://github.com/axios/axios/issues/1754
  'testEnvironment': 'node',
};
