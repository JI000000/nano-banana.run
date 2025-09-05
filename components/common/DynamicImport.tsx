import React, { Suspense } from 'react';
import LoadingSpinner, { PageLoader, InlineLoader } from '../ui/LoadingSpinner';

interface DynamicImportProps {
  children: React.ReactNode;
  fallback?: 'page' | 'inline' | 'spinner';
  fallbackText?: string;
}

const DynamicImport: React.FC<DynamicImportProps> = ({
  children,
  fallback = 'spinner',
  fallbackText
}) => {
  const renderFallback = () => {
    switch (fallback) {
      case 'page':
        return <PageLoader text={fallbackText} />;
      case 'inline':
        return <InlineLoader text={fallbackText} />;
      default:
        return <LoadingSpinner size="md" text={fallbackText} />;
    }
  };

  return (
    <Suspense fallback={renderFallback()}>
      {children}
    </Suspense>
  );
};

export default DynamicImport;
