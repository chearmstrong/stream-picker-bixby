const { getUrl } = require('http')
const secrets = require('secret')
const cfg = require('config')

const apiKey = secrets.get('mc.apiKey')
const baseUrl = cfg.get('mc.baseUrl')

/**
 * Uses the Movie Critic API (my API) to fetch the MP4 streaming URL
 * for a particular YouTube video.
 * 
 * If there is an error, it doesn't matter and we just return `null`.
 * 
 * @param {String} youTubeId
 * @return {String|null}
 */
const getMovieTrailerStream = youTubeId => {
  const options = {
    format: 'json',
    headers: { 'x-api-key': apiKey }
  }
  const url = baseUrl + '/' + youTubeId

  try {
    const response = getUrl(url, options)
    
    if (!response.url) {
      return null
    }

    return response.url
  } catch (_) {
    return null // If it throws, just return `null` - it doesn't matter
  }
}

module.exports = getMovieTrailerStream
