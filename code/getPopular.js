const { getPopularTitlesByProvider } = require('./api/justWatch.js')
const normaliseContent = require('./lib/normaliseContent.js')
const errorNotify = require('./lib/errorNotify.js')
const getYouTubeId = require('./lib/getYouTubeId.js')
const getTmdbId = require('./lib/getTmdbId.js')

module.exports.function = function getPopular(provider, type, $vivContext) {
  try {
    provider = provider ? provider.toString() : provider // To deal with bug
    const { locale, bixbyUserId } = $vivContext
    
    const content = getPopularTitlesByProvider(provider, type || null, locale || 'en-US')

    if (!content) {
      return null
    }

    const normalisedContent = content.map(item => {
      const tmdbId = getTmdbId(item.external_ids || [])
      const youTubeId = getYouTubeId(item.clips || [])

      return normaliseContent(item, null, provider, null, youTubeId)
    })

    return normalisedContent
  } catch (error) {
    // If we get an error, send a notification
    errorNotify({ context: $vivContext, error: error, other: { provider: provider } })

    throw error
  }
}
