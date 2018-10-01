module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  transform: {
    "^.+\\.js$": "babel-jest",
  },
}
