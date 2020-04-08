const { getMovieTrailerStream } = require('./api/mc.js')
const errorNotify = require('./lib/errorNotify.js')

module.exports.function = function getTrailerStream(content) {
  try {
    const trailerStream = content.youTubeId ? getMovieTrailerStream(content.youTubeId) : null

    return trailerStream
  } catch (error) {
    // If we get an error, send a notification
    errorNotify({ context: $vivContext, error: error, other: { content: content } })

    return null
  }
}