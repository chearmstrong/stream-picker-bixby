const { getPopularTitlesByProvider } = require('./api/justWatch.js')
const normaliseContent = require('./lib/normaliseContent.js')
const errorNotify = require('./lib/errorNotify.js')
const { getManyMovieTrailerStreams } = require('./api/mc.js')
const getYouTubeId = require('./lib/getYouTubeId.js')
const getTmdbId = require('./lib/getTmdbId.js')

module.exports.function = function getPopular(provider, $vivContext) {
  try {
    provider = provider ? provider.toString() : provider // To deal with bug
    const { locale, bixbyUserId } = $vivContext
    
    const content = getPopularTitlesByProvider(provider, locale)

    if (!content) {
      return null
    }

    const youTubeIds = []

    const normalisedContent = content.map(item => {
      const tmdbId = getTmdbId(item.external_ids || [])
      const youTubeId = getYouTubeId(item.clips || [])

      if (youTubeId) {
        youTubeIds.push(youTubeId)
      }

      return normaliseContent(item, null, provider, null, youTubeId)
    })

    const trailerStreams = youTubeIds.length && getManyMovieTrailerStreams(youTubeIds)

    if (trailerStreams) {
      const contentWithYouTube = normalisedContent.map(item => {
        if (item.youTubeId && trailerStreams[item.youTubeId]) {
          item.trailerStream = trailerStreams[item.youTubeId]
        }

        return item
      })

      return contentWithYouTube
    }

    return normalisedContent
  } catch (error) {
    // If we get an error, send a notification
    errorNotify({ context: $vivContext, error: error, other: { provider: provider } })

    throw error
  }
}
