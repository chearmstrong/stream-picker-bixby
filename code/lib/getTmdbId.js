/**
 * Gets the TMDB ID from the list of external site objects.
 * 
 * @param {Array} exIds
 * @return {Number|null}
 */
const getTmdbId = exIds => {
  const filtered = exIds.filter(item => item.provider=== 'tmdb')

  return filtered.length ? filtered[0].external_id : null
}

module.exports = getTmdbId
