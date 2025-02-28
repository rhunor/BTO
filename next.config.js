/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to import Node.js only modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        async_hooks: false, // This is the specific one causing your error
        util: false,
        child_process: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;