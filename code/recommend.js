const { getRandomTitleByProvider } = require('./api/justWatch.js')
const normaliseContent = require('./lib/normaliseContent.js')
const errorNotify = require('./lib/errorNotify.js')
const getYouTubeId = require('./lib/getYouTubeId.js')
const getTmdbId = require('./lib/getTmdbId.js')

module.exports.function = function recommend(provider, type, $vivContext) {
  try {
    provider = provider ? provider.toString() : provider // To deal with bug
    const { locale, bixbyUserId } = $vivContext
    const content = getRandomTitleByProvider(provider, type || null, locale || 'en-US')

    if (!content) {
      return null
    }

    const tmdbId = getTmdbId(content.external_ids || [])
    const youTubeId = getYouTubeId(content.clips || [])

    return normaliseContent(content, null, provider, null, youTubeId)
  } catch (error) {
    // If we get an error, send a notification
    errorNotify({ context: $vivContext, error: error, other: { provider: provider } })

    throw error
  }
}
