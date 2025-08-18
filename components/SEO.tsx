import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterCreator?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  children?: React.ReactNode;
}

/**
 * SEO组件，用于统一管理页面的SEO元数据和结构化数据
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/images/og-image.jpg',
  twitterCard = 'summary_large_image',
  twitterCreator = '@nanobananai',
  structuredData,
  children,
}) => {
  const router = useRouter();
  
  // 生成默认的网站标题
  const defaultTitle = 'Nano-Banana.Run - The AI Image Editing Resource Center';
  const defaultDescription = 'The definitive resource for Nano-Banana AI image editing model with tutorials, examples, and comparisons.';
  const defaultKeywords = 'nano-banana, AI image editing, text replacement AI, AI image model, scene transformation AI';
  
  // 设置最终使用的值
  const seoTitle = title 
    ? `${title} | Nano-Banana.Run` 
    : defaultTitle;
  
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  
  // 处理规范链接
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nano-banana.run';
  const seoCanonical = canonical || `${origin}${router.asPath}`;
  
  return (
    <Head>
      {/* 基本元数据 */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      
      {/* 规范链接 */}
      <link rel="canonical" href={seoCanonical} />
      
      {/* Open Graph 元数据 */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:image" content={`${origin}${ogImage}`} />
      <meta property="og:site_name" content="Nano-Banana.Run" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter 卡片元数据 */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`${origin}${ogImage}`} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:site" content="@nanobananai" />
      
      {/* 结构化数据 */}
      {structuredData && Array.isArray(structuredData) ? (
        structuredData.map((data, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))
      ) : structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
      
      {/* 其他SEO相关元素 */}
      {children}
    </Head>
  );
};

export default SEO;
