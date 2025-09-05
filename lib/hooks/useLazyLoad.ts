import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseLazyLoadReturn {
  isVisible: boolean;
  ref: React.RefObject<HTMLElement>;
}

/**
 * Hook for lazy loading elements when they come into viewport
 */
export const useLazyLoad = (options: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting) {
      setIsVisible(true);
      
      if (triggerOnce && ref.current) {
        observer.unobserve(ref.current);
      }
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [triggerOnce]);

  const observer = new IntersectionObserver(handleIntersection, {
    threshold,
    rootMargin
  });

  useEffect(() => {
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observer]);

  return { isVisible, ref };
};

/**
 * Hook for preloading components
 */
export const usePreload = () => {
  const preloadedComponents = useRef<Set<string>>(new Set());

  const preloadComponent = useCallback((componentPath: string) => {
    if (preloadedComponents.current.has(componentPath)) {
      return;
    }

    // Mark as preloaded
    preloadedComponents.current.add(componentPath);

    // Preload the component
    import(componentPath).catch(error => {
      console.warn(`Failed to preload component: ${componentPath}`, error);
      preloadedComponents.current.delete(componentPath);
    });
  }, []);

  const preloadOnHover = useCallback((componentPath: string) => {
    return {
      onMouseEnter: () => preloadComponent(componentPath),
      onFocus: () => preloadComponent(componentPath)
    };
  }, [preloadComponent]);

  return {
    preloadComponent,
    preloadOnHover
  };
};

/**
 * Hook for managing component loading states
 */
export const useComponentLoader = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((componentId: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [componentId]: loading
    }));
  }, []);

  const isLoading = useCallback((componentId: string) => {
    return loadingStates[componentId] || false;
  }, [loadingStates]);

  const loadComponent = useCallback(async (componentId: string, loader: () => Promise<any>) => {
    setLoading(componentId, true);
    
    try {
      const result = await loader();
      setLoading(componentId, false);
      return result;
    } catch (error) {
      setLoading(componentId, false);
      throw error;
    }
  }, [setLoading]);

  return {
    setLoading,
    isLoading,
    loadComponent
  };
};
