import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const workboxConfig = require("./workbox.config");

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: workboxConfig,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
};

export default withPWA(nextConfig as any);
