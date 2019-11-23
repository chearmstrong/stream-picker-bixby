// const getMoviePoster = require('./api/tmdb.js')
const { getRandomTitleByProvider } = require('./api/justWatch.js')
const normaliseContent = require('./lib/normaliseContent.js')
const errorNotify = require('./lib/errorNotify.js')
const { getMovieTrailerStream } = require('./api/mc.js')
const getYouTubeId = require('./lib/getYouTubeId.js')
const getTmdbId = require('./lib/getTmdbId.js')

module.exports.function = function recommend(provider, $vivContext) {
  try {
    provider = provider ? provider.toString() : provider // To deal with bug
    const { locale, bixbyUserId } = $vivContext
    const content = getRandomTitleByProvider(provider, locale || 'en-US')

    if (!content) {
      return null
    }

    const tmdbId = getTmdbId(content.external_ids || [])
    const youTubeId = getYouTubeId(content.clips || [])
    const trailerStream = youTubeId ? getMovieTrailerStream(youTubeId) : null
    // const poster = tmdbId ? getMoviePoster(tmdbId, content.object_type) : null

    return normaliseContent(content, null, provider, trailerStream, youTubeId)
  } catch (error) {
    // If we get an error, send a notification
    errorNotify({ context: $vivContext, error: error, other: { provider: provider } })

    throw error
  }
}
