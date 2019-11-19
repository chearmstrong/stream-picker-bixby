const { providers } = require('./constants/justWatch.js')

module.exports.function = function getProviders($vivContext) {
  const { locale } = $vivContext
  const filtered = providers.filter(item => {
    return item.locales.indexOf('default') !== -1 || item.locales.indexOf(locale) !== -1
  })

  return filtered
}
