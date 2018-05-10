module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['prefer-object-spread'],
  settings: {
    'import/resolver': 'webpack'
  },
  env: { browser: true },
  rules: {
    indent: 0,
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'capitalized-comments': [
      'error',
      'always',
      {
        ignorePattern: '.*',
        ignoreInlineComments: true
      }
    ],
    'no-underscore-dangle': ['off'],
    'no-alert': ['off'],
    'jsx-quotes': ['error', 'prefer-single'],
    'max-len': ['off'],
    'prefer-object-spread/prefer-object-spread': 2,
    'import/extensions': ['error', 'never', { json: 'always' }],
    'react/jsx-filename-extension': 0,
    'function-paren-newline': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/first': 0,
    'prefer-promise-reject-errors': 0,
    'prefer-destructuring': 0,
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': 0,
    'react/require-default-props': 0, // This would be good to turn on at some point
    'react/forbid-prop-types': 0, // This would be good to turn on at some point
    'jsx-a11y/anchor-is-valid': 0, // Fix soon
    'jsx-a11y/label-has-for': 0, // Fix soon
    'jsx-a11y/no-static-element-interactions': 0, // Fix soon
    'jsx-a11y/click-events-have-key-events': 0, // Fix soon
    'jsx-a11y/mouse-events-have-key-events': 0 // Fix soon
  }
}
