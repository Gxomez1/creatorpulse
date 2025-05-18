/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',         // path Google tries
          destination: '/api/sitemap/',   // ✅ needs this trailing slash
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  