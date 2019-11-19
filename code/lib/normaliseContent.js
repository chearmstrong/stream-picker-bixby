const {
  providers,
  backdropProfile,
  posterProfile,
  imageBaseUrl
} = require('../constants/justWatch.js')

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
 * @param {Object} content
 * @param {Array} content.offers
 * @param {String} provider
 * @return {String|null}
 */
const getStreamingLink = (content, provider) => {
  if (!content.offers || !content.offers.length) {
    return null
  }

  const filtered = content.offers.filter(item => {
    return item.monetization_type === 'flatrate'
      && item.provider_id === providers[provider].id
      && (item.urls && item.urls.standard_web)
  })

  if (!filtered.length) {
    return null
  }

  return filtered[0].urls.standard_web
}

const getJustWatchPoster = content => {
  if (!content.poster) {
    return null
  }

  return imageBaseUrl + content.poster.replace("{profile}", posterProfile)
}

const getJustWatchBackdrop = content => {
  if (!content.backdrops || !content.backdrops.length) {
    return null
  }

  return imageBaseUrl + content.backdrops[0].backdrop_url.replace("{profile}", backdropProfile)
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
const normaliseContent = (content, poster, provider, trailerStream, youTubeId) => {
  const normalised = {
    title: content.title,
    rating: getRating(content.scoring) || null,
    stars: getRating(content.scoring) ? '⭐️'.repeat(getRating(content.scoring)) : null,
    year: content.original_release_year,
    overview: content.short_description,
    type: content.object_type,
    provider: provider,
    backdrop: getJustWatchBackdrop(content),
    poster: getJustWatchPoster(content),
    play: getStreamingLink(content, provider),
    providerShort: providers[provider].shortCode
  }

  // CONDITIONAL ITEMS

  if (poster) {
    normalised.poster = poster || getJustWatchPoster(content)
  }

  if (trailerStream) {
    normalised.trailerStream = trailerStream
  }

  if (youTubeId) {
    normalised.youTubeId = youTubeId
  }

  return normalised
}

module.exports = normaliseContent
