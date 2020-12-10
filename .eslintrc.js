module.exports = {
  plugins: ['eslint-plugin-jsdoc'],
  extends: [
    // from eslint-plugin-jsdoc
    // @see https://github.com/gajus/eslint-plugin-jsdoc#configuration
    // warnings not work with prettier-standard therefore this ruleset not effective
    'plugin:jsdoc/recommended'
  ]
}
