import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { determineImagePriority, generateSrcSet } from '../lib/optimization/ImageOptimizer';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  isAboveFold?: boolean;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  isAboveFold = false,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(isAboveFold);
  
  // 决定图像的加载优先级
  const priority = determineImagePriority(src, isAboveFold);
  
  useEffect(() => {
    // 如果图像在首屏，不需要设置交叉观察器
    if (isAboveFold) {
      return;
    }

    // 创建一个交叉观察器来检测元素何时进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px 0px', // 提前200px开始加载
      threshold: 0.01 // 当1%的元素可见时触发
    });
    
    // 获取当前组件的DOM引用
    const element = document.getElementById(`lazy-image-${src.replace(/\W/g, '')}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [src, isAboveFold]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  // 创建一个唯一ID，用于IntersectionObserver
  const uniqueId = `lazy-image-${src.replace(/\W/g, '')}`;

  // 如果外部传入了 h-full，我们采用填充模式以适配卡片定高容器
  const useFill = className?.includes('h-full');

  // 仅当不填充时使用内联尺寸样式，避免破坏父容器高度控制
  const wrapperStyle = useFill ? undefined : { width: '100%', height: 'auto', maxWidth: `${width}px` } as React.CSSProperties;

  return (
    <div 
      id={uniqueId}
      className={`relative ${className}`}
      style={wrapperStyle}
    >
      {/* 占位符 */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          style={{ aspectRatio: `${width}/${height}` }}
        />
      )}
      
      {/* 实际图像 */}
      {isVisible && (
        useFill ? (
          <Image
            src={src}
            alt={alt}
            fill
            onLoad={handleImageLoad}
            className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading={priority === 'high' ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleImageLoad}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading={priority === 'high' ? 'eager' : 'lazy'}
            sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`}
          />
        )
      )}
    </div>
  );
};

export default LazyImage;