/* eslint-disable prefer-object-spread/prefer-object-spread */
const parent = require('../.eslintrc')

module.exports = Object.assign({}, parent, {
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  plugins: [...parent.plugins, 'mocha'],
  rules: Object.assign({}, parent.rules, {
    'no-unused-expressions': ['off'],
    'mocha/no-skipped-tests': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/handle-done-callback': 'warn',
    'react/no-children-prop': 0
  })
})
