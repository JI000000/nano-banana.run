/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 图像优化设置
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // 国际化设置
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
  // 性能优化
  experimental: {
    // 禁用CSS优化以解决构建问题
    scrollRestoration: true, // 滚动恢复
    esmExternals: true, // 使用ESM外部模块
  },
  
  // 静态资源压缩
  compress: true,
  
  // 页面预热设置
  onDemandEntries: {
    // 页面保持热状态的时长（毫秒）
    maxInactiveAge: 25 * 1000,
    // 同时保持热状态的页面数量
    pagesBufferLength: 5,
  },
}

module.exports = nextConfig
