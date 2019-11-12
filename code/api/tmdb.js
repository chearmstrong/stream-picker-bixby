const { getUrl } = require('http')
const secrets = require('secret')
const cfg = require('config')

const apiKey = secrets.get('tmdb.apiKey')
const baseUrl = cfg.get('tmdb.baseUrl')
const imageBaseUrl = cfg.get('tmdb.imageBaseUrl')

/**
 * Uses the TMDB API to fetch the poster URL for the content.
 * 
 * If there is an error, it doesn't matter and we just return `null`.
 * 
 * @param {String} id - the TMDB ID
 * @param {String} type - `movie` or `show`
 * @return {String|null}
 */
const getMoviePoster = (id, type) => {
  const contentType = type === 'movie' ? type : 'tv'
  const options = {
    format: 'json',
    query: { api_key: apiKey,  language: 'en' }
  }
  const url = baseUrl + '/' + contentType + '/' + id + '/images'

  try {
    const response = getUrl(url, options)
    
    if (!response.posters || !response.posters.length) {
      return null
    }
    
    const filePath = response.posters[0].file_path
    
    return imageBaseUrl + '/w500' + filePath
  } catch (_) {
    return null // If it throws, just return `null` - it doesn't matter
  }
}

module.exports = getMoviePoster
