/**
 * ImageOptimizer.ts
 * 
 * 提供用于优化图像以提高页面性能的实用工具
 */

type ImageFormat = 'webp' | 'avif' | 'png' | 'jpeg';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
  placeholder?: 'blur' | 'empty';
}

/**
 * 构建优化的图像URL，应用质量、格式和尺寸优化
 */
export function getOptimizedImageUrl(
  src: string, 
  options: ImageOptimizationOptions = {}
): string {
  // 在实际实现中，这里会调用图像处理服务或CDN的API
  // 本示例假设使用的是Next.js内置的图像优化
  
  const {
    width,
    height,
    quality = 75,
    format = 'webp',
  } = options;
  
  // 处理绝对URL和相对URL
  const isExternalUrl = src.startsWith('http') || src.startsWith('//');
  
  // 外部URL的处理（例如使用图像优化服务）
  if (isExternalUrl) {
    return src; // 实际情况可能会使用Imgix、Cloudinary等服务
  }
  
  // 相对URL的处理（假设使用Next.js的图像优化）
  // 实际上这个函数会被LazyImage等组件直接调用，而不需要手动构建URL
  return src;
}

/**
 * 计算图像的最佳尺寸，基于视口宽度和目标分辨率
 */
export function calculateResponsiveImageSize(
  containerWidth: number,
  pixelDensity: number = 2
): { width: number; height: number } {
  // 计算适合容器宽度的图像尺寸，同时考虑高像素密度设备
  const optimizedWidth = containerWidth * pixelDensity;
  
  // 根据常见的纵横比计算高度（例如16:9）
  const aspectRatio = 16 / 9;
  const optimizedHeight = optimizedWidth / aspectRatio;
  
  return {
    width: Math.round(optimizedWidth),
    height: Math.round(optimizedHeight)
  };
}

/**
 * 生成图像的尺寸集
 * 用于响应式图像的srcset属性
 */
export function generateSrcSet(
  src: string,
  widths: number[] = [320, 480, 640, 768, 1024, 1280, 1536]
): string {
  return widths
    .map(width => {
      const optimizedSrc = getOptimizedImageUrl(src, { width });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
}

/**
 * 确定要延迟加载的图像的加载优先级
 */
export function determineImagePriority(
  imagePath: string,
  isAboveFold: boolean = false
): 'high' | 'low' {
  // 优先加载首屏（above the fold）图像
  if (isAboveFold) {
    return 'high';
  }
  
  // 优先加载特定重要路径的图像
  const criticalPaths = ['/images/hero', '/images/logo'];
  if (criticalPaths.some(path => imagePath.includes(path))) {
    return 'high';
  }
  
  // 默认其他图像为低优先级（延迟加载）
  return 'low';
}