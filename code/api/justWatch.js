const { getUrl } = require('http')
const cfg = require('config')
const getLocaleSlug = require('../lib/getLocaleSlug.js')
const { providers } = require('../constants/justWatch.js')

const baseUrl = cfg.get('justWatch.baseUrl')
const pageSize = parseInt(cfg.get('justWatch.pageSize'))

// Local functions

/**
 * Get random content from the popular list, based on the given provider.
 * 
 * @param {String} provider
 * @param {string} locale
 * @return {Object|null}
 */
const getRandomTitleByProvider = (provider, locale) => {
  const items = getPopularTitles(provider, locale)

  if (!items) {
    return null
  }
  
  const index = (Math.floor(Math.random() * items.length) + 1) - 1
  const { id, object_type } = items[index]
  const content = getTitleDetailed(id, object_type, locale)

  return content
}

/**
 * Get 10 items from the popular list, based on the given provider.
 * 
 * @param {String} provider
 * @param {string} locale
 * @return {Array|null}
 */
const getPopularTitlesByProvider = (provider, locale) => {
  const items = getPopularTitles(provider, locale)

  if (!items) {
    return null
  }

  const index = (Math.floor(Math.random() * items.length) + 1) - 1
  const chunk = items.length <= 10 // TODO: Can this be better?
    ? items
    : index <= 9
    ? items.slice(index, index + 10)
    : items.slice(index - 10, index) 

  const contentArray = chunk.map(content => getTitleDetailed(content.id, content.object_type, locale))

  return contentArray
}

// API Functions

/**
 * Gets the full details for the content ID passed in.
 * 
 * @param {String} id
 * @param {String} type - `show` or `movie`
 * @param {String} locale
 * @return {Object}
 */
const getTitleDetailed = (id, type, locale) => {
  const localeSlug = getLocaleSlug(locale)
  const options = {
    format: 'json',
    query: {
      language: 'en'
    }
  }
  const url = baseUrl + '/content/titles/' + type + '/' + id + '/locale/' + localeSlug
  const response = getUrl(url, options)

  return response
}

/**
 * Gets the polular list for the given provider.
 * 
 * @param {String} provider
 * @param {String} locale
 * @return {Array}
 */
const getPopularTitles = (provider, locale) => {
  if (!provider || !locale) {
    return null
  }

  const { shortCode } = providers.find(item => item.name === provider)
  const localeSlug = getLocaleSlug(locale)
  const options = {
    format: 'json',
    query: {
      body: JSON.stringify({
        monetization_types: ['flatrate'], // flatrate === streaming service like netflix
        providers: [shortCode],
        'page_size': pageSize
      })
    }
  }
  const url = baseUrl + '/content/titles/' + localeSlug + '/popular'
  const response = getUrl(url, options)

  if (!response.items || !response.items.length) {
    return null
  }

  return response.items
}

module.exports = {
  getRandomTitleByProvider: getRandomTitleByProvider,
  getPopularTitlesByProvider: getPopularTitlesByProvider
}
