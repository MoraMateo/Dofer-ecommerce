// next.config.js (CommonJS)
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    allowedDevOrigins: ['http://localhost:3000', 'https://dofer.com.mx'],
    // Otras configs
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "wp.dofer.com.mx",
          pathname: "/wp-content/uploads/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  