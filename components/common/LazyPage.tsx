import React, { lazy } from 'react';
import DynamicImport from './DynamicImport';

// 懒加载页面组件
export const LazyImageEditor = lazy(() => import('../../pages/image-editor'));
export const LazyShowcase = lazy(() => import('../../pages/showcase'));
export const LazyTutorials = lazy(() => import('../../pages/tutorials/index'));
export const LazyAbout = lazy(() => import('../../pages/about'));
export const LazyContact = lazy(() => import('../../pages/contact'));
export const LazyFAQ = lazy(() => import('../../pages/faq'));

// 懒加载组件包装器
interface LazyPageWrapperProps {
  children: React.ReactNode;
  fallback?: 'page' | 'inline' | 'spinner';
  fallbackText?: string;
}

export const LazyPageWrapper: React.FC<LazyPageWrapperProps> = ({
  children,
  fallback = 'page',
  fallbackText = 'Loading page...'
}) => {
  return (
    <DynamicImport fallback={fallback} fallbackText={fallbackText}>
      {children}
    </DynamicImport>
  );
};

// 预定义的懒加载页面
export const LazyImageEditorPage = () => (
  <LazyPageWrapper fallbackText="Loading Image Editor...">
    <LazyImageEditor />
  </LazyPageWrapper>
);

export const LazyShowcasePage = () => (
  <LazyPageWrapper fallbackText="Loading Showcase...">
    <LazyShowcase />
  </LazyPageWrapper>
);


export const LazyTutorialsPage = () => (
  <LazyPageWrapper fallbackText="Loading Tutorials...">
    <LazyTutorials />
  </LazyPageWrapper>
);

export const LazyAboutPage = () => (
  <LazyPageWrapper fallbackText="Loading About Page...">
    <LazyAbout />
  </LazyPageWrapper>
);

export const LazyContactPage = () => (
  <LazyPageWrapper fallbackText="Loading Contact Page...">
    <LazyContact />
  </LazyPageWrapper>
);

export const LazyFAQPage = () => (
  <LazyPageWrapper fallbackText="Loading FAQ...">
    <LazyFAQ />
  </LazyPageWrapper>
);
