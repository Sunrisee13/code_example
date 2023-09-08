module.exports = {
  env: {
    browser: true,
    es2021: true
    // jest: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:i18next/recommended'],
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 0
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'sunrise-y-plugin'],
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/ban-ts-comment': 0, // нам нужно это для искусственных задержек
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'i18next/no-literal-string': ['error', { markupOnly: true, ignoreAttribute: ['as', 'border', 'role', 'to', 'data-testid', 'name', 'alt', 'target', 'justify', 'align', 'direction', 'gap'] }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react/display-name': 0,
    'sunrise-y-plugin/path-checker': ['error', { alias: '@' }],
    'sunrise-y-plugin/public-api-imports': ['error', { alias: '@' }]
  }
}
