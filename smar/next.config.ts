/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.smar.vn', // Thêm hostname này theo lỗi bạn gặp
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'your-project-id.supabase.co', // Thêm hostname Supabase của bạn để upload ảnh CMS hoạt động
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;