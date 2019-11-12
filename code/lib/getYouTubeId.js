/**
 * Gets the YouTube ID from the list of external site objects.
 * 
 * @param {Array} clips
 * @return {Number|null}
 */
const getYouTubeId = clips => {
  const filtered = clips.filter(item => item.provider === 'youtube' && item.type === 'trailer')

  return filtered.length ? filtered[0].external_id : null
}

module.exports = getYouTubeId
