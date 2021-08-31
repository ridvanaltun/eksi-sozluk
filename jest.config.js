module.exports = {
  verbose: true,
  roots: ['__tests__/'],
  // This line solves: Cross origin http://localhost forbidden
  // @see https://github.com/axios/axios/issues/1754
  testEnvironment: 'node',
  testTimeout: 10000 // default 5 secs, we are using 10 secs
}
