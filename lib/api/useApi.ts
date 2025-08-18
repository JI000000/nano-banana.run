import { useState, useCallback } from 'react';
import apiService, {
  ApiResponse,
  ProcessingOptions,
  TextReplacementOptions,
  SceneTransformationOptions,
  MultiRegionOptions,
  RegionDefinition
} from './ApiService';
import { EditParameters, UserInput } from '../workflow/WorkflowOptimizer';

/**
 * Status of an API operation
 */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Progress information for operations that support progress tracking
 */
export interface ProgressInfo {
  percent: number;
  stage?: string;
}

/**
 * Options for the useApi hook
 */
interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: ProgressInfo) => void;
}

/**
 * A React hook for interacting with the API service
 */
export function useApi(options: UseApiOptions = {}) {
  // State for tracking API call status
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<ProgressInfo>({ percent: 0 });
  
  /**
   * Generic function to handle API calls
   */
  const callApi = useCallback(async <T>(
    apiFunction: () => Promise<ApiResponse<T>>
  ): Promise<ApiResponse<T>> => {
    setStatus('loading');
    setError(null);
    setProgress({ percent: 0 });
    
    try {
      const response = await apiFunction();
      
      setData(response.data);
      setStatus('success');
      
      if (options.onSuccess) {
        options.onSuccess(response.data);
      }
      
      return response;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error');
      
      setError(errorObj);
      setStatus('error');
      
      if (options.onError) {
        options.onError(errorObj);
      }
      
      throw errorObj;
    } finally {
      // Ensure progress is complete when done
      setProgress({ percent: 100 });
    }
  }, [options]);
  
  /**
   * Track progress for operations that support it
   */
  const trackProgress = useCallback((percent: number, stage?: string) => {
    const progressInfo = { percent, stage };
    setProgress(progressInfo);
    
    if (options.onProgress) {
      options.onProgress(progressInfo);
    }
  }, [options]);
  
  /**
   * Process text replacement
   */
  const replaceText = useCallback(async (
    image: File | Blob,
    textToReplace: string,
    newText: string,
    options?: TextReplacementOptions
  ) => {
    return callApi(() => apiService.replaceText(
      image,
      textToReplace,
      newText,
      options,
      (percent) => trackProgress(percent, 'text-replacement')
    ));
  }, [callApi, trackProgress]);
  
  /**
   * Process scene transformation
   */
  const transformScene = useCallback(async (
    image: File | Blob,
    targetDescription: string,
    options?: SceneTransformationOptions
  ) => {
    return callApi(() => apiService.transformScene(
      image,
      targetDescription,
      options,
      (percent) => trackProgress(percent, 'scene-transformation')
    ));
  }, [callApi, trackProgress]);
  
  /**
   * Process multi-region editing
   */
  const processMultiRegion = useCallback(async (
    image: File | Blob,
    options: MultiRegionOptions
  ) => {
    return callApi(() => apiService.processMultiRegion(
      image,
      options,
      (percent) => trackProgress(percent, 'multi-region')
    ));
  }, [callApi, trackProgress]);
  
  /**
   * Get optimal parameters for an image
   */
  const getOptimalParameters = useCallback(async (
    image: File | Blob,
    editType: 'text' | 'scene' | 'style' | 'object'
  ) => {
    return callApi(() => apiService.getOptimalParameters(image, editType));
  }, [callApi]);
  
  /**
   * Get system capabilities for performance optimization
   */
  const getSystemCapabilities = useCallback(async () => {
    return callApi(() => apiService.getSystemCapabilities());
  }, [callApi]);
  
  /**
   * Execute a one-click workflow
   */
  const executeOneClickWorkflow = useCallback(async (input: UserInput) => {
    return callApi(() => apiService.executeOneClickWorkflow(
      input,
      (percent) => trackProgress(percent, 'workflow')
    ));
  }, [callApi, trackProgress]);
  
  /**
   * Check if the API service is ready
   */
  const isApiReady = useCallback(() => {
    return apiService.isReady();
  }, []);
  
  /**
   * Reset the hook state
   */
  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
    setProgress({ percent: 0 });
  }, []);
  
  return {
    // API functions
    replaceText,
    transformScene,
    processMultiRegion,
    getOptimalParameters,
    getSystemCapabilities,
    executeOneClickWorkflow,
    isApiReady,
    
    // State
    status,
    data,
    error,
    progress,
    
    // Utils
    reset
  };
}

export default useApi;
