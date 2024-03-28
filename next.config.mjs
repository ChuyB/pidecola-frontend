/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhsot:3000", "pidecola-frontend"]
    }
  }
};

export default nextConfig;
