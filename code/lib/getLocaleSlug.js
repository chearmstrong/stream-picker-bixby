/**
 * Takes a locale with dashes and converts them to underscores.
 * 
 * @param {String} locale
 * @return {String}
 */
const getLocaleSlug = locale => locale.replace(/\-/g, '_')

module.exports = getLocaleSlug
