module.exports = {
  runTimeCaching: [
    {
      URLPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
    {
      URLPattern: /^\/_next\/image\?url=.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-images",
        expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      URLPattern: /^\/_next\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^https:\/\/api\.raorentals\.com\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-calls",
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 100, maxAgeSeconds: 5 * 60 },
      },
    },
    {
      urlPattern: /^https:\/\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "http-calls",
        networdkTimeoutSeconds: 10,
        expiration: { maxEntries: 200, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    {
      URLPattern: /.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "fallback",
        fallbackUrl: "/offline",
      },
    },
  ],
};
