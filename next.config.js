/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx','ts', 'tsx', 'md', 'mdx'],
  

  async redirects() {
    return [
      {
        source: '/Homepage',
        destination: '/',
        permanent: true,
      },
    ]
  },
}