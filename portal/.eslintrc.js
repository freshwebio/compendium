module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    // Prevent warnings against empty array dependencies for useEffect,
    // which we can use as an equivalent of componentDidMount in class components.
    'react-hooks/exhaustive-deps': 'off',
    // A lot of the third-party library type definitions used explicitly use any.
    '@typescript-eslint/no-explicit-any': 'off',
    // Really not relevant for React components, which are the only uses of classes
    // in this project.
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
}
