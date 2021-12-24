const config = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/indent': 'off'
  }
}

module.exports = config
