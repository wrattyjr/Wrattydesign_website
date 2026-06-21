/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/melto.html', destination: '/melto' },
      { source: '/tangaroa.html', destination: '/tangaroa' },
      { source: '/cymusic.html', destination: '/cymusic' },
      { source: '/gallipoli.html', destination: '/gallipoli' },
      { source: '/pretty-ugly.html', destination: '/pretty-ugly' },
      { source: '/touch-soil.html', destination: '/touch-soil' },
    ]
  },
}

module.exports = nextConfig
