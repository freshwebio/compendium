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
    // Prettier controls indentation as it can vary between 4 and 2, especially for formatting type parameters.
    '@typescript-eslint/indent': 'off',
    // Prevent warnings against empty array dependencies for useEffect,
    // which we can use as an equivalent of componentDidMount in class components.
    'react-hooks/exhaustive-deps': 'off',
    // A lot of the third-party library type definitions used explicitly use any.
    '@typescript-eslint/no-explicit-any': 'off',
    // Really not relevant for React components, which are the only uses of classes
    // in this project.
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // Deprecated, using naming convention instead.
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      // PascalCase for React + Styled components.
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'property',
        format: [],
        // Best to support as much as we can, think headers with upper kebab case
        // and request bodies expected to use snake case.
        custom: { regex: '^[A-Za-z][A-Z-a-z0-9_]*$', match: true },
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        // In test files, due to ts-jest not hoisting mock* variables to the top like the babel plugin
        // we need to be able to import after calling jest.doMock.
        'import/first': 'off',
      },
    },
  ],
}
