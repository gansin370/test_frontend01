/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      "ua-apt.s3.ap-northeast-2.amazonaws.com",
      "d22mbkaaqujaqr.cloudfront.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ua-apt.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "d22mbkaaqujaqr.cloudfront.net",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
