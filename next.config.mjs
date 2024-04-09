/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_SHEETS_URL: process.env.GOOGLE_SHEETS_URL,
      }
};

export default nextConfig;
