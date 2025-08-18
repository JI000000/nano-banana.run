import React from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import { generateWebPageSchema, generateBreadcrumbSchema } from '../lib/seo/StructuredDataGenerator';
import WebVitalsDisplay from './WebVitalsDisplay';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  showWebVitals?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Nano-Banana AI - Advanced Image Editing Resource',
  description = 'The definitive resource for Nano-Banana AI image editing model. Discover tutorials, examples, and comparisons for this powerful AI tool.',
  keywords = 'nano-banana, AI image editing, image model, scene transformation, text replacement',
  canonicalPath,
  ogType,
  ogImage = '/images/og-default.jpg',
  structuredData,
  showWebVitals = process.env.NODE_ENV === 'development' ? false : false
}) => {
  const router = useRouter();
  
  // 生成面包屑结构化数据
  const generateBreadcrumbs = () => {
    // 移除查询参数
    const path = router.asPath.split('?')[0];
    
    // 拆分路径
    const pathSegments = path.split('/').filter(Boolean);
    
    // 生成面包屑数据
    const breadcrumbItems = [
      { name: 'Home', item: 'https://nano-banana.run/' }
    ];
    
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // 将路径段转换为可读名称 (例如 "getting-started" 转换为 "Getting Started")
      const readableName = segment
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      
      breadcrumbItems.push({
        name: readableName,
        item: `https://nano-banana.run${currentPath}`
      });
    });
    
    return generateBreadcrumbSchema({ items: breadcrumbItems });
  };
  
  // 生成当前页面的默认结构化数据
  const generateDefaultStructuredData = () => {
    const baseUrl = 'https://nano-banana.run';
    const currentPath = canonicalPath || router.asPath;
    const fullUrl = `${baseUrl}${currentPath}`;
    
    // 生成网页结构化数据
    const webPageSchema = generateWebPageSchema({
      url: fullUrl,
      title: title,
      description: description,
    });
    
    // 生成面包屑结构化数据
    const breadcrumbSchema = generateBreadcrumbs();
    
    return [webPageSchema, breadcrumbSchema];
  };
  
  // 使用提供的结构化数据或生成默认结构化数据
  const finalStructuredData = structuredData || generateDefaultStructuredData();
  
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonicalPath}
        ogType={ogType}
        ogImage={ogImage}
        structuredData={finalStructuredData}
      >
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* 字体预加载 - 已经在_document.tsx中包含 */}
      </SEO>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        
        {/* 性能监测组件 - 仅在开发环境或通过URL参数启用时显示 */}
        {showWebVitals && (
          <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full">
            <WebVitalsDisplay showDetails={process.env.NODE_ENV === 'development'} />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
