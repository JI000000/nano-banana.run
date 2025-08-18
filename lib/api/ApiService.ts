/**
 * API Service for Nano-Banana
 * 
 * This service provides a unified interface for communicating with backend APIs
 * for image processing, text replacement, scene transformation, and other features.
 */

import { EnhancedFontMatcher, FontFeatures, TextRegion } from '../text-replacement/EnhancedFontMatcher';
import { EnhancedSceneTransformer, TransformationParameters } from '../scene-transformation/EnhancedSceneTransformer';
import { PerformanceOptimizer } from '../performance/PerformanceOptimizer';
import { WorkflowOptimizer, UserInput, EditParameters } from '../workflow/WorkflowOptimizer';

// Error handling
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Base interface for all API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
  processingTime?: number;
}

// Processing options shared across multiple endpoints
export interface ProcessingOptions {
  webglEnabled?: boolean;
  quality?: 'draft' | 'standard' | 'high';
  preserveMetadata?: boolean;
  smartWorkflow?: boolean;
  chunkSize?: number;
  outputFormat?: 'original' | 'jpg' | 'png' | 'webp';
}

// Text replacement specific options
export interface TextReplacementOptions extends ProcessingOptions {
  fontMatchingStrength?: number; // 0-1
  backgroundPreservation?: number; // 0-1
  multiLayerDetection?: boolean;
  layerSensitivity?: number; // 0-1
}

// Scene transformation specific options
export interface SceneTransformationOptions extends ProcessingOptions {
  preserveSubjects?: boolean;
  preserveLighting?: boolean;
  depthAwareness?: number; // 0-1
  styleIntensity?: number; // 0-1
}

// Multi-region editing options
export interface RegionDefinition {
  id: string;
  name: string;
  type: 'rectangle' | 'ellipse' | 'polygon' | 'freeform' | 'smart';
  coordinates: number[][]; // Array of [x, y] points defining the region
  prompt: string;
  processingType?: 'text' | 'scene' | 'style' | 'object';
  priority?: number; // Higher = more priority
  transitionRegion?: boolean;
}

export interface MultiRegionOptions extends ProcessingOptions {
  regions: RegionDefinition[];
  harmonyLevel?: number; // 0-1
  boundaryTreatment?: 'hard' | 'soft' | 'smart';
  globalConstraints?: string;
}

/**
 * Main API Service class
 */
export class ApiService {
  private baseUrl: string;
  private apiKey?: string;
  private enhancedFontMatcher: EnhancedFontMatcher;
  private enhancedSceneTransformer: EnhancedSceneTransformer;
  private performanceOptimizer: PerformanceOptimizer;
  private workflowOptimizer: WorkflowOptimizer;
  
  constructor(baseUrl: string = '/api', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    
    // Initialize core service components
    this.enhancedFontMatcher = new EnhancedFontMatcher();
    this.enhancedSceneTransformer = new EnhancedSceneTransformer();
    this.performanceOptimizer = new PerformanceOptimizer();
    this.workflowOptimizer = new WorkflowOptimizer();
    
    // Initialize services
    this.initializeServices();
  }
  
  /**
   * Initialize all service components
   */
  private async initializeServices(): Promise<void> {
    try {
      // Initialize in parallel for faster startup
      await Promise.all([
        this.enhancedFontMatcher.initialize(),
        this.enhancedSceneTransformer.initialize(),
        this.performanceOptimizer.initialize(),
        this.workflowOptimizer.initialize()
      ]);
      
      console.log('API Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize API Service:', error);
      throw new ApiError('Service initialization failed', 500);
    }
  }
  
  /**
   * Generic API fetch method with error handling
   */
  private async fetchApi<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }
      
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new ApiError(data.error || 'API request failed', response.status);
      }
      
      return {
        success: true,
        data,
        status: response.status,
        processingTime: data.processingTime
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown API error',
        500
      );
    }
  }
  
  /**
   * Handle file uploads with progress tracking
   */
  private async uploadFile(
    endpoint: string,
    file: File | Blob,
    options?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<any>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      
      // Add file to form data
      // Make sure we have a file name
      if (file instanceof File) {
        formData.append('file', file);
      } else {
        // Create a File from the Blob with a default name
        formData.append('file', new File([file], 'image.png', { type: file.type || 'image/png' }));
      }
      
      // Add options if provided
      if (options) {
        formData.append('options', JSON.stringify(options));
      }
      
      // Setup progress tracking
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        });
      }
      
      // Handle completion
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve({
              success: true,
              data,
              status: xhr.status,
              processingTime: data.processingTime
            });
          } catch (error) {
            reject(new ApiError('Invalid response format', xhr.status));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new ApiError(errorData.error || 'Upload failed', xhr.status));
          } catch (e) {
            reject(new ApiError('Upload failed', xhr.status));
          }
        }
      };
      
      // Handle errors
      xhr.onerror = () => {
        reject(new ApiError('Network error during upload', 0));
      };
      
      // Add auth header if available
      if (this.apiKey) {
        xhr.setRequestHeader('Authorization', `Bearer ${this.apiKey}`);
      }
      
      // Send the request
      xhr.open('POST', url);
      xhr.send(formData);
    });
  }
  
  /**
   * Check if service is ready (all components initialized)
   */
  public isReady(): boolean {
    // Check if all required services are initialized
    return true; // This would actually check component status in a real implementation
  }
  
  /**
   * Convert UI edit type to WorkflowOptimizer edit type
   */
  private convertEditType(editType: 'text' | 'scene' | 'style' | 'object'): import('../workflow/WorkflowOptimizer').EditType {
    switch (editType) {
      case 'text': return 'textReplacement';
      case 'scene': return 'sceneTransformation';
      case 'style': return 'styleTransfer';
      case 'object': return 'objectRemoval';
      default:
        return 'textReplacement'; // Default case
    }
  }
  
  /**
   * Process text replacement
   */
  public async replaceText(
    image: File | Blob,
    textToReplace: string,
    newText: string,
    options?: TextReplacementOptions,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ resultUrl: string }>> {
    // Check if we should use WebGL acceleration
    const useWebGL = options?.webglEnabled !== false && 
                    await this.performanceOptimizer.detectGPUCapabilities()
                      .then(caps => caps.webGLAvailable)
                      .catch(() => false);
    
    // Prepare request body
    const requestBody = {
      textToReplace,
      newText,
      options: {
        ...options,
        webglEnabled: useWebGL
      }
    };
    
    // For client-side processing (demo/development):
    if (process.env.NEXT_PUBLIC_CLIENT_SIDE_PROCESSING === 'true') {
      // This would be a simplified client-side implementation
      // In production, this would call the actual API endpoint
      
      // Simulate processing with progress
      if (onProgress) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          onProgress(Math.min(progress, 95));
          
          if (progress >= 95) {
            clearInterval(interval);
          }
        }, 300);
      }
      
      // Return simulated result
      return {
        success: true,
        data: {
          resultUrl: '/images/examples/result-1.jpg' // Placeholder
        },
        status: 200,
        processingTime: 2500 // Simulated processing time in ms
      };
    }
    
    // For real API processing:
    return this.uploadFile('/text-replacement', image, requestBody, onProgress);
  }
  
  /**
   * Process scene transformation
   */
  public async transformScene(
    image: File | Blob,
    targetDescription: string,
    options?: SceneTransformationOptions,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ resultUrl: string }>> {
    // Check for WebGL availability
    const useWebGL = options?.webglEnabled !== false && 
                    await this.performanceOptimizer.detectGPUCapabilities()
                      .then(caps => caps.webGLAvailable)
                      .catch(() => false);
    
    // Prepare transformation parameters
    const transformParams: TransformationParameters = {
      targetScene: targetDescription,
      preserveSubjects: options?.preserveSubjects ?? true,
      preserveLighting: options?.preserveLighting ?? true,
      styleIntensity: options?.styleIntensity ?? 0.8
    };
    
    // Prepare request body
    const requestBody = {
      targetDescription,
      transformationParameters: transformParams,
      options: {
        ...options,
        webglEnabled: useWebGL
      }
    };
    
    // For client-side processing (demo/development):
    if (process.env.NEXT_PUBLIC_CLIENT_SIDE_PROCESSING === 'true') {
      // Simulate processing with progress
      if (onProgress) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 8;
          onProgress(Math.min(progress, 95));
          
          if (progress >= 95) {
            clearInterval(interval);
          }
        }, 300);
      }
      
      // Return simulated result
      return {
        success: true,
        data: {
          resultUrl: '/images/examples/result-2.jpg' // Placeholder
        },
        status: 200,
        processingTime: 3200 // Simulated processing time in ms
      };
    }
    
    // For real API processing:
    return this.uploadFile('/scene-transformation', image, requestBody, onProgress);
  }
  
  /**
   * Process multi-region editing
   */
  public async processMultiRegion(
    image: File | Blob,
    options: MultiRegionOptions,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ resultUrl: string }>> {
    // Check for WebGL availability
    const useWebGL = options?.webglEnabled !== false && 
                    await this.performanceOptimizer.detectGPUCapabilities()
                      .then(caps => caps.webGLAvailable)
                      .catch(() => false);
    
    // Update options with WebGL status
    const updatedOptions = {
      ...options,
      webglEnabled: useWebGL
    };
    
    // For client-side processing (demo/development):
    if (process.env.NEXT_PUBLIC_CLIENT_SIDE_PROCESSING === 'true') {
      // Simulate processing with progress
      if (onProgress) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          onProgress(Math.min(progress, 95));
          
          if (progress >= 95) {
            clearInterval(interval);
          }
        }, 300);
      }
      
      // Return simulated result
      return {
        success: true,
        data: {
          resultUrl: '/images/examples/result-3.jpg' // Placeholder
        },
        status: 200,
        processingTime: 4500 // Simulated processing time in ms
      };
    }
    
    // For real API processing:
    return this.uploadFile('/multi-region', image, updatedOptions, onProgress);
  }
  
  /**
   * Get optimal processing parameters for an image
   */
  public async getOptimalParameters(
    image: File | Blob,
    editType: 'text' | 'scene' | 'style' | 'object'
  ): Promise<ApiResponse<EditParameters>> {
    // For client-side processing (demo/development):
    if (process.env.NEXT_PUBLIC_CLIENT_SIDE_PROCESSING === 'true') {
      // Create a temporary image to analyze
      const imageUrl = URL.createObjectURL(image);
      
      try {
        // Load the image
        const imgElement = document.createElement('img');
        await new Promise((resolve, reject) => {
          imgElement.onload = resolve;
          imgElement.onerror = reject;
          imgElement.src = imageUrl;
        });
        
        // Create canvas to get ImageData
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }
        
        ctx.drawImage(imgElement, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Convert the edit type to the format expected by WorkflowOptimizer
        const convertedEditType = this.convertEditType(editType);
        
        // Use the workflow optimizer to suggest parameters
        const suggestedParams = this.workflowOptimizer.suggestOptimalParameters(
          imageData,
          convertedEditType
        );
        
        return {
          success: true,
          data: suggestedParams,
          status: 200
        };
      } catch (error) {
        throw new ApiError('Failed to analyze image', 500);
      } finally {
        // Clean up
        URL.revokeObjectURL(imageUrl);
      }
    }
    
    // For real API processing:
    const formData = new FormData();
    formData.append('image', image);
    formData.append('editType', editType);
    
    return this.fetchApi<EditParameters>('/parameters/optimal', 'POST', formData);
  }
  
  /**
   * Get system capabilities (for performance optimization)
   */
  public async getSystemCapabilities(): Promise<ApiResponse<{
    webGLAvailable: boolean;
    webGL2Available: boolean;
    maxTextureSize: number;
    performance: 'low' | 'medium' | 'high';
  }>> {
    try {
      // Use the performance optimizer to detect capabilities
      const capabilities = await this.performanceOptimizer.detectGPUCapabilities();
      
      return {
        success: true,
        data: {
          webGLAvailable: capabilities.webGLAvailable,
          webGL2Available: capabilities.webGL2Available,
          maxTextureSize: capabilities.maxTextureSize,
          performance: capabilities.performance
        },
        status: 200
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to detect system capabilities',
        status: 500
      };
    }
  }
  
  /**
   * Execute a one-click workflow that automatically determines the best processing
   */
  public async executeOneClickWorkflow(
    input: UserInput,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ resultUrl: string }>> {
    // For client-side processing (demo/development):
    if (process.env.NEXT_PUBLIC_CLIENT_SIDE_PROCESSING === 'true') {
      // Simulate processing with progress
      if (onProgress) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          onProgress(Math.min(progress, 95));
          
          if (progress >= 95) {
            clearInterval(interval);
          }
        }, 200);
      }
      
      // Return simulated result
      return {
        success: true,
        data: {
          resultUrl: '/images/examples/result-4.jpg' // Placeholder
        },
        status: 200,
        processingTime: 1800 // Simulated processing time in ms
      };
    }
    
    // For real API processing:
    // Prepare form data
    const formData = new FormData();
    
    // Handle different input types
    if (input.type === 'image' && input.data instanceof File) {
      formData.append('image', input.data);
    } else if (input.type === 'text' && typeof input.data === 'string') {
      formData.append('text', input.data);
    } else if (input.type === 'imageWithText' && 
              typeof input.data === 'object' && 
              'image' in input.data && 
              'text' in input.data) {
      formData.append('image', input.data.image);
      formData.append('text', input.data.text);
    }
    
    // Add edit type if specified
    if (input.editType) {
      formData.append('editType', input.editType);
    }
    
    // Add options if provided
    if (input.options) {
      formData.append('options', JSON.stringify(input.options));
    }
    
    // Handle progress tracking
    if (onProgress) {
      // This requires a custom implementation for the fetch API
      // Here we're simplifying by using our uploadFile method
      return this.uploadFile('/workflow/one-click', 
        input.data instanceof File ? input.data : new Blob(['placeholder']),
        { input }, onProgress);
    }
    
    // Use regular fetch if no progress tracking needed
    return this.fetchApi<{ resultUrl: string }>('/workflow/one-click', 'POST', formData);
  }
}

// Export a singleton instance for use throughout the application
export const apiService = new ApiService(
  process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  process.env.NEXT_PUBLIC_API_KEY
);

export default apiService;
