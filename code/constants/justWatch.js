const providers = [
  {
    name: 'apple tv plus',
    shortCode: 'atp',
    id: 350,
    locales: ['en-US', 'en-GB']
  },
  {
    name: 'amazon prime video',
    shortCode: 'amp',
    id: 9,
    locales: ['default']
  },
  {
    name: 'netflix',
    shortCode: 'nfx',
    id: 8,
    locales: ['default']
  },
  {
    name: 'hulu',
    shortCode: 'hlu',
    id: 15,
    locales: ['en-US']
  },
  {
    name: 'hbo now',
    shortCode: 'hbn',
    id: 27,
    locales: ['en-US']
  },
  {
    name: 'disney plus',
    shortCode: 'dnp',
    id: 337,
    locales: ['en-US', 'en-GB']
  },
  {
    name: 'starz on amazon',
    shortCode: 'ast',
    id: 194,
    locales: ['en-US', 'en-GB']
  },
  {
    name: 'showtime on amazon',
    shortCode: 'ash',
    id: 203,
    locales: ['en-US']
  },
  {
    name: 'starzplay',
    shortCode: 'stz',
    id: 43,
    locales: ['en-US']
  },
  {
    name: 'hbo on amazon',
    shortCode: 'ahb',
    id: 200,
    locales: ['en-US']
  },
  {
    name: 'now tv',
    shortCode: 'ntv',
    id: 39,
    locales: ['en-GB']
  },
  {
    name: 'showtime',
    shortCode: 'sho',
    id: 37,
    locales: ['en-US']
  }
]

const backdropProfile = 's640'
const posterProfile = 's332'
const imageBaseUrl = 'https://images.justwatch.com'

module.exports = {
  providers: providers,
  backdropProfile: backdropProfile,
  posterProfile: posterProfile,
  imageBaseUrl: imageBaseUrl
}
