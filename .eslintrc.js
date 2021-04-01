module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/self-closing-comp': 'error',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-uses-react': 'error',
    // 'react-hooks/exhaustive-deps': 'off',
    'object-shorthand': ['error', 'always'],
    'no-unused-vars': 'warn',
  },
}
