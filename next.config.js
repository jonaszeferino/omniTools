module.exports = {
  images: {
    domains: [
      'image.tmdb.org',
      'https://image.tmdb.org/t/p/original',
      'image.tmdb.org/t/p/original',
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
  experimental: {
    forceSwcTransforms: true,
    newNextLinkBehavior: false,
    topLevelAwait: true,
    esmExternals: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};
