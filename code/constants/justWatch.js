const providerDict = {
  'apple tv plus': 'atp',
  'amazon prime video': 'amp',
  'netflix': 'nfx',
  'hulu': 'hlu', // US only
  'hbo now': 'hbn', // US only
  'hbo go': 'hbg', // US only
  'disney plus': 'dnp', // US only
  'disney life': 'dli', // UK only
}

const providerIds = {
  'apple tv plus': 350,
  'amazon prime video': 9,
  'netflix': 8,
  'hulu': 15,
  'hbo now': 27,
  'disney plus': 337,
  'disney life': 129
}

const backdropProfile = 's640'
const posterProfile = 's332'
const imageBaseUrl = 'https://images.justwatch.com'

module.exports = {
  providerIds: providerIds,
  providerDict: providerDict,
  backdropProfile: backdropProfile,
  posterProfile: posterProfile,
  imageBaseUrl: imageBaseUrl
}
