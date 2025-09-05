import React, { lazy } from 'react';
import DynamicImport from './DynamicImport';

// 懒加载功能组件
export const LazyImageProcessor = lazy(() => import('../ImageProcessor'));
export const LazyBatchProcessor = lazy(() => import('../BatchProcessor'));
export const LazySmartPromptSuggester = lazy(() => import('../SmartPromptSuggester'));
export const LazyRealTimePreview = lazy(() => import('../RealTimePreview'));
export const LazyRegionSelector = lazy(() => import('../RegionSelector'));
export const LazySmartParamsSuggester = lazy(() => import('../SmartParamsSuggester'));

// 懒加载UI组件
export const LazyModal = lazy(() => import('../ui/Modal'));
export const LazyProgressBar = lazy(() => import('../ui/ProgressBar'));

// 懒加载Section组件
export const LazyHeroSection = lazy(() => import('../sections/HeroSection'));
export const LazyQuickAccessSection = lazy(() => import('../sections/QuickAccessSection'));
export const LazyFeaturesSection = lazy(() => import('../sections/FeaturesSection'));
export const LazyShowcaseSection = lazy(() => import('../sections/ShowcaseSection'));
export const LazyReviewsSection = lazy(() => import('../sections/ReviewsSection'));
export const LazyCTASection = lazy(() => import('../sections/CTASection'));

// 懒加载教程组件
export const LazyTutorialGrid = lazy(() => import('../tutorials/TutorialGrid'));
export const LazyTutorialProgress = lazy(() => import('../tutorials/TutorialProgress'));

// 组件包装器
interface LazyComponentWrapperProps {
  children: React.ReactNode;
  fallback?: 'page' | 'inline' | 'spinner';
  fallbackText?: string;
}

export const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({
  children,
  fallback = 'spinner',
  fallbackText = 'Loading component...'
}) => {
  return (
    <DynamicImport fallback={fallback} fallbackText={fallbackText}>
      {children}
    </DynamicImport>
  );
};

// 预定义的懒加载组件
export const LazyImageProcessorComponent = () => (
  <LazyComponentWrapper fallbackText="Loading Image Processor...">
    <LazyImageProcessor />
  </LazyComponentWrapper>
);

export const LazyBatchProcessorComponent = () => (
  <LazyComponentWrapper fallbackText="Loading Batch Processor...">
    <LazyBatchProcessor processingType="text" prompt="" />
  </LazyComponentWrapper>
);

export const LazySmartPromptSuggesterComponent = () => (
  <LazyComponentWrapper fallbackText="Loading AI Assistant...">
    <LazySmartPromptSuggester onPromptSelected={() => {}} />
  </LazyComponentWrapper>
);

export const LazyRealTimePreviewComponent = () => (
  <LazyComponentWrapper fallbackText="Loading Preview...">
    <LazyRealTimePreview prompt="" />
  </LazyComponentWrapper>
);

export const LazyModalComponent = () => (
  <LazyComponentWrapper fallbackText="Loading Modal...">
    <LazyModal isOpen={false} onClose={() => {}}>
      <div>Modal content</div>
    </LazyModal>
  </LazyComponentWrapper>
);

export const LazyProgressBarComponent = () => (
  <LazyComponentWrapper fallbackText="Loading Progress...">
    <LazyProgressBar progress={0} />
  </LazyComponentWrapper>
);
