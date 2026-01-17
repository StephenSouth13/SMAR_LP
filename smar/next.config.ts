/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.smar.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bdnrwaqsfnjmaglzyslr.supabase.co', // Hostname Supabase của bạn
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;