const providers = {
  'apple tv plus': {
    shortCode: 'atp',
    id: 350
  },
  'amazon prime video': {
    shortCode: 'amp',
    id: 9
  },
  'netflix': {
    shortCode: 'nfx',
    id: 8
  },
  'hulu': {
    shortCode: 'hlu',
    id: 15
  }, // US only
  'hbo now': {
    shortCode: 'hbn',
    id: 27
  }, // US only
  'disney plus': {
    shortCode: 'dnp',
    id: 337
  }, // US only
  'disney life': {
    shortCode: 'dli',
    id: 129
  }, // UK only
  'starz on amazon': {
    shortCode: 'ast',
    id: 194
  }, // UK and US only
  'showtime on amazon': {
    shortCode: 'ash',
    id: 203
  }, // US only
  'starzplay': {
    shortCode: 'stz',
    id: 43
  }, // US Only
  'showtime': {
    shortCode: 'sho',
    id: 37
  }, // US Only
  'hbo on amazon': {
    shortCode: 'ahb',
    id: 200
  }, // US only
  'now tv': {
    shortCode: 'ntv',
    id: 39
  }
}

const backdropProfile = 's640'
const posterProfile = 's332'
const imageBaseUrl = 'https://images.justwatch.com'

module.exports = {
  providers: providers,
  backdropProfile: backdropProfile,
  posterProfile: posterProfile,
  imageBaseUrl: imageBaseUrl
}
