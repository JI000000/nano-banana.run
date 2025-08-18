import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';
import { measureWebVitals } from '../lib/optimization/WebVitalsMonitor';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 在页面路由变化时测量Web Vitals
  useEffect(() => {
    const handleRouteChange = () => {
      // 在客户端渲染时测量Web Vitals
      if (typeof window !== 'undefined') {
        // 延迟测量，确保页面已完全加载
        setTimeout(() => {
          measureWebVitals(false); // false表示只测量Core Web Vitals
        }, 100);
      }
    };

    // 初次加载时测量
    handleRouteChange();

    // 监听路由变化
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-ET9DS0X68H`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ET9DS0X68H');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
