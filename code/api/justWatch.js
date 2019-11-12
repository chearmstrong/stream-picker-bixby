const { getUrl } = require('http')
const cfg = require('config')

const baseUrl = cfg.get('justWatch.baseUrl')
const pageSize = parseInt(cfg.get('justWatch.pageSize'))

const supportedProviders = ['atp', 'amp', 'ntx']
const providerDict = {
  'apple tv plus': 'atp',
  'amazon prime video': 'amp',
  'netflix': 'nfx'
}

/**
 * Gets the full details for the content ID passed in.
 * 
 * @param {String} id
 * @param {String} type - `show` or `movie`
 * @param {String} locale
 * @return {Object}
 */
const getTitleDetailed = (id, type, locale) => {
  const options = {
    format: 'json',
    query: {
      language: 'en'
    }
  }
  const url = baseUrl + '/content/titles/' + type + '/' + id + '/locale/' + locale
  const response = getUrl(url, options)

  return response
}

/**
 * Get random content from the popular list, based on the given provider.
 * 
 * @param {String} provider
 * @param {string} locale
 * @return {Object|null}
 */
const getRandomTitleByProvider = (provider, locale) => {
  const providers = provider ? [providerDict[provider]] : supportedProviders
  const localeSlug = locale.replace(/\-/g, '_')
  const options = {
    format: 'json',
    query: {
      body: JSON.stringify({
        monetization_types: ['flatrate'], // flatrate === streaming service like netflix
        providers: providers,
        'page_size': pageSize
      })
    }
  }
  const url = baseUrl + '/content/titles/' + localeSlug + '/popular'
  const response = getUrl(url, options)

  if (!response.items || !response.items.length) {
    return null
  }
  
  const index = (Math.floor(Math.random() * response.items.length) + 1) - 1
  const { id, object_type } = response.items[index]
  const content = getTitleDetailed(id, object_type, localeSlug)

  return content
}

module.exports = {
  getRandomTitleByProvider: getRandomTitleByProvider
}
