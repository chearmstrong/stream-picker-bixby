const { log } = require('console')

const providerDict = {
  'apple tv plus': 350,
  'amazon prime video': 9,
  'netflix': 8
}

/**
 * Gets the avarage rating score from IMDB and TMDB.
 * 
 * @param {Array} scores
 * @return {Number}
 */
const getRating = scores => {
  const filtered = scores.filter(item => {
    return item.provider_type === 'imdb:score' || item.provider_type === 'tmdb:score'
  })

  const average = filtered.reduce((acc, curr) => acc + curr.value, 0) / filtered.length

  return Math.round(average)
}

/**
 * Gets the streaming link for the chosen provider.
 * 
 * @param {Array} offers
 * @param {String} provider
 * @return {String|null}
 */
const getStreamingLink = (offers, provider) => {
  const filtered = offers.filter(item => {
    return item.monetization_type === 'flatrate'
      && item.provider_id === providerDict[provider]
      && (item.urls && item.urls.standard_web)
  })

  if (!filtered.length) {
    return null
  }

  return filtered[0].urls.standard_web
}

/**
 * Normalises the content returned from the API.
 * 
 * @param {Object} content
 * @param {Sring} poster - URL of the poster image
 * @param {String} provider
 * @param {String} trailerStream - URL of the trailer stream
 * @return {Object}
 */
const normaliseContent = (content, poster, provider, trailerStream) => {
  const normalised = {
    title: content.title,
    rating: getRating(content.scoring) || null,
    stars: getRating(content.scoring) ? '⭐️'.repeat(getRating(content.scoring)) : null,
    year: content.original_release_year,
    overview: content.short_description,
    type: content.object_type,
    provider: provider
  }

  if (poster) {
    normalised.poster = poster
  }

  if (true) {
    normalised.play = getStreamingLink(content.offers, provider)
  }

  if (trailerStream) {
    normalised.trailerStream = trailerStream
  }

  return normalised
}

module.exports = normaliseContent
