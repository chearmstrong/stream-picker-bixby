const { getRandomTitleByProvider } = require('./api/justWatch.js')
const getMoviePoster = require('./api/tmdb.js')
const normaliseContent = require('./lib/normaliseContent.js')
const errorNotify = require('./lib/errorNotify.js')
const getTrailerStream = require('./api/mc.js')
const getYouTubeId = require('./lib/getYouTubeId.js')
const getTmdbId = require('./lib/getTmdbId.js')

module.exports.function = function recommend(provider, $vivContext) {
  try {
    const { locale } = $vivContext
    const content = getRandomTitleByProvider(provider, locale || 'en-US')

    if (!content) {
      return null
    }

    const tmdbId = getTmdbId(content.external_ids || [])
    const youTubeId = getYouTubeId(content.clips || [])
    const poster = tmdbId ? getMoviePoster(tmdbId, content.object_type) : null
    const trailerStream = youTubeId ? getTrailerStream(youTubeId) : null

    return normaliseContent(content, poster, provider, trailerStream)
  } catch (error) {
    // If we get an error, send a notification
    errorNotify({ context: $vivContext, error: error, other: { provider: provider } })

    throw error
  }
}