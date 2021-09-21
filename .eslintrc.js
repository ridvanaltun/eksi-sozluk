module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  plugins: ['prettier', 'jsdoc'],
  extends: [
    'standard',
    // resolve conflicts between prettier and eslint
    'plugin:prettier/recommended',
    // from eslint-plugin-jsdoc
    // @see https://github.com/gajus/eslint-plugin-jsdoc#configuration
    'plugin:jsdoc/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prefer-regex-literals': ['off'],
    'jsdoc/no-undefined-types': ['off']
  }
}
