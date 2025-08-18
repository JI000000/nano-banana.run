import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags for better SEO and performance */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* DNS预解析，减少DNS查询时间 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* 预连接到关键资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 预加载关键字体 */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* 预加载关键图像 */}
        <link rel="preload" as="image" href="/images/hero-banner.webp" />
        
        {/* 添加manifest文件，支持PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'Nano-Banana.Run',
              'url': 'https://nano-banana.run',
              'logo': 'https://nano-banana.run/logo.png',
              'sameAs': [
                'https://twitter.com/nanobananai',
                'https://github.com/nano-banana'
              ],
              'description': 'The definitive resource for Nano-Banana AI image editing model.'
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* 嵌入关键CSS以减少渲染阻塞 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 检测网络状况
              function detectSlowConnection() {
                if (navigator.connection) {
                  const conn = navigator.connection;
                  if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.saveData) {
                    return true;
                  }
                }
                return false;
              }
              
              // 如果是慢速连接，推迟加载非关键资源
              if (detectSlowConnection()) {
                document.documentElement.classList.add('slow-connection');
              }
            `
          }}
        />
      </body>
    </Html>
  );
}
