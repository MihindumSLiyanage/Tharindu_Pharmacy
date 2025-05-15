const nextTranslate = require("next-translate");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = nextTranslate(
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      runtimeCaching,
      buildExcludes: [/middleware-manifest\.json$/],
      scope: "/",
      sw: "service-worker.js",
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    },
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: [
        "images.unsplash.com",
        "img.icons8.com",
        "i.ibb.co",
        "i.postimg.cc",
        "fakestoreapi.com",
        "res.cloudinary.com",
        "lh3.googleusercontent.com",
        "firebasestorage.googleapis.com",
      ],
    },
  })
);
