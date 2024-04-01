module.exports = {
  settings: {
    'import/resolver': {
      typescript: { 'project': '<rootdir>tsconfig.json' },
    },// this loads <rootdir>/tsconfig.json to eslint
  },

  extends:
    ['@it-incubator/eslint-config',
      'plugin:@next/next/recommended',
      'plugin:storybook/recommended',
    ],

  rules:
    {
      'no-console':
        ['warn', { allow: ['warn', 'error'] }],
      'import/no-named-as-default':
        0,
      '@conarti/feature-sliced/layers-slices':
        'error',
      '@conarti/feature-sliced/public-api':
        'error',
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
    }
  ,
  plugins: ['@conarti/feature-sliced', 'testing-library'],
}