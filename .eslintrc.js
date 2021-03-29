module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/self-closing-comp': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    // 'react-hooks/exhaustive-deps': 'off',
    'object-shorthand': ['error', 'always'],
    'no-unused-vars': 'error',
  },
}
