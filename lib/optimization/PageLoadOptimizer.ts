/**
 * PageLoadOptimizer.ts
 * 
 * 优化页面加载性能的工具库
 */

// 关键路径CSS注入
export const injectCriticalCSS = (css: string): void => {
  if (typeof document === 'undefined') return; // 仅在客户端执行
  
  // 创建style元素
  const style = document.createElement('style');
  style.setAttribute('data-critical', 'true');
  style.textContent = css;
  
  // 插入到head中
  document.head.appendChild(style);
};

// 预加载关键资源
export const preloadCriticalAssets = (assets: string[]): void => {
  if (typeof document === 'undefined') return; // 仅在客户端执行
  
  assets.forEach(asset => {
    // 判断资源类型
    let type: string;
    if (asset.endsWith('.js')) type = 'script';
    else if (asset.endsWith('.css')) type = 'style';
    else if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].some(ext => asset.endsWith(ext))) type = 'image';
    else if (asset.endsWith('.woff2')) type = 'font';
    else return; // 跳过未知类型
    
    // 创建预加载链接
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    link.as = type;
    if (type === 'font') link.setAttribute('crossorigin', 'anonymous');
    
    // 插入到head中
    document.head.appendChild(link);
  });
};

// 优化第三方脚本加载
export const optimizeThirdPartyScripts = (
  scripts: {url: string, async?: boolean, defer?: boolean, id?: string}[]
): void => {
  if (typeof document === 'undefined') return; // 仅在客户端执行
  
  // 使用requestIdleCallback在浏览器空闲时加载脚本
  const loadScript = (scriptInfo: {url: string, async?: boolean, defer?: boolean, id?: string}) => {
    const script = document.createElement('script');
    script.src = scriptInfo.url;
    if (scriptInfo.async) script.async = true;
    if (scriptInfo.defer) script.defer = true;
    if (scriptInfo.id) script.id = scriptInfo.id;
    
    document.body.appendChild(script);
  };
  
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    scripts.forEach(scriptInfo => {
      ((window as any).requestIdleCallback)(() => loadScript(scriptInfo), { timeout: 3000 });
    });
  } else {
    // 降级方案：使用setTimeout
    scripts.forEach((scriptInfo, index) => {
      setTimeout(() => loadScript(scriptInfo), 200 * index);
    });
  }
};

// 延迟低优先级图片加载
export const deferLowPriorityImages = (): void => {
  if (typeof document === 'undefined') return; // 仅在客户端执行
  
  // 查找所有带有data-src属性的图像
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }
          
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // 降级方案：使用setTimeout循环检查图像可见性
    const lazyLoad = () => {
      lazyImages.forEach(img => {
        const htmlImg = img as HTMLImageElement;
        const rect = htmlImg.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
        );
        
        if (isVisible) {
          const dataSrc = htmlImg.getAttribute('data-src');
          if (dataSrc) {
            htmlImg.src = dataSrc;
            htmlImg.removeAttribute('data-src');
          }
        }
      });
    };
    
    // 初始检查
    lazyLoad();
    
    // 滚动时检查
    if (typeof window !== 'undefined') {
      (window as Window).addEventListener('scroll', lazyLoad);
      (window as Window).addEventListener('resize', lazyLoad);
      (window as Window).addEventListener('orientationchange', lazyLoad);
    }
  }
};

// 检测网络状况并相应地优化
export const adaptToNetworkConditions = (): 'slow' | 'medium' | 'fast' => {
  if (typeof navigator === 'undefined') return 'medium'; // 默认值
  
  // 尝试使用Network Information API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      const effectiveType = conn.effectiveType || '';
      
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          return 'slow';
        case '3g':
          return 'medium';
        case '4g':
          return 'fast';
        default:
          // 判断带宽
          const downlink = conn.downlink || 0;
          if (downlink < 1) return 'slow';
          if (downlink < 5) return 'medium';
          return 'fast';
      }
    }
  }
  
  // 降级方案：加载时间的估算
  return 'medium';
};
