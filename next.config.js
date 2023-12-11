/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      // Uploadthing
      {
        hostname: "utfs.io",
      },
      // Discord
      {
        hostname: "cdn.discordapp.com",
      },
      // Google
      {
        hostname: "lh3.googleusercontent.com",
      },
      // Github
      {
        hostname: "avatars.githubusercontent.com",
      },
      // Yandex
      {
        hostname: "avatars.yandex.net",
      },
    ],
  },
};

export default config;
