module.exports = {
  ...require('prettier-config-standard'),
  overrides: [
    {
      files: ['*.ate'],
      options: {
        parser: 'typescript'
      }
    }
  ]
}
