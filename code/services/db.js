/**
 * When fetching content, also fetch the favoutites list.
 * In the same way as I do for YT videos, match the favourites up with
 * returned content.
 * -- If content is in the favourites list, show "remove from favs".
 * -- Otherwise show "add" to favs.
 * 
 * When click "add":
 * -- Update the current favs with content ID and type.
 * -- Pass the updated favs to `updateFavourites` fn.
 * -- For each favourite - fetch and list (like get Popular).
 * -- Match up like above.
 * 
 * Need a favourites view (see above).
 * 
 * Have an `on-click` that goes to addToFavourites action.
 * -- Have hidden input to process via action/JS.
 *    -> Fetch favs.
 *    -> update DB (add remove - know from action/JS)
 *    -> return updated content (new fav status)
 *    -> return to detail view.
 * 
 * Use filter to remove itmes (!== ID)
 * 
 * Will it be better to store FULL items?
 * 
 * query with PICK - if possible?
 */

const { postUrl, deleteUrl, getUrl, putUrl } = require('http')

const baseUrl = 'https://streampicker-6530.restdb.io/rest/stream-picker'
const apiKey = 'd5b86f5803974b60a40a4ece263af2ad4782d'

const normaliseResponse = dbResponse => ({
  '_id': dbResponse['_id'] || null,
  bixbyUserId: dbResponse.bixbyUserId,
  favourites: favourites
})

const getFavourites = bixbyUserId =>{
  const options = {
    format: 'json',
    query: { q: JSON.stringify({ bixbyUserId: bixbyUserId }) },
    headers: { 'x-apikey': apiKey },
    cacheTime: 0
  }

  const response =  getUrl(baseUrl, options)

  if (response && response.length === 1) {
    return normaliseResponse(response)
  }

  return { '_id': null, bixbyUserId: bixbyUserId, favourites: [] }
}

const updateFavourites = favouritesObject => {
  const { _id, bixbyUserId, favourites } = favouritesObject
  const options = {
    format: 'json',
    headers: { 'x-apikey': apiKey },
    cacheTime: 0
  }
  const body = {
    bixbyUserId: bixbyUserId,
    favourites: favourites
  }

  if (_id) {
    // Favourites empty
    if (!favourites.length) {
      const deleteResponse = deleteUrl(baseUrl + '/' + _id, {}, options)

      return { '_id': null, bixbyUserId: bixbyUserId, favourites: [] }
    }

    // Favourites update
    const putResponse = putUrl(baseUrl + '/' + _id, body, options)

    return normaliseResponse(putResponse)
  }

  // Favourite created
  const postResponse = putUrl(baseUrl, body, options)

  return normaliseResponse(postResponse)
}

module.exports = {
  getFavourites: getFavourites,
  updateFavourites: updateFavourites
}
