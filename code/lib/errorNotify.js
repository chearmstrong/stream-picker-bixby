const { postUrl } = require('http')
const cfg = require('config')
const { log } = require('console')

const url = cfg.get('formSpree.url')

/**
 * Sends a notification email (via FormSpree).
 * Used to notify or any errors (API or otherwise).
 * 
 * @param {Object} params
 * @param {Object} params.context - $vivContext
 * @param {Object<Error>} params.error
 * @param {Object|String} params.other - more details if needed
 * @return {String}
 */
const errorNotify = params => {
  const { context, error, other } = params
  const body = {
    value1: context ? JSON.stringify(context, null, 2) : 'None',
    value2: error ? JSON.stringify(error, null, 2) : 'None',
    value3: other ? JSON.stringify(other, null, 2) : 'None',
  }
  
  const options = {
    format: 'json',
    cacheTime: 0,
    returnHeaders: true
  }

  try {
    postUrl(url, body, options)
  } catch (error) {
    log(error)
  }

  return 'done'
}

module.exports = errorNotify
