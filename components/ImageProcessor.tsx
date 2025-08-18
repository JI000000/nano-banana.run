import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useApi } from '../lib/api/useApi';
import { SceneTransformationOptions, TextReplacementOptions, MultiRegionOptions, RegionDefinition } from '../lib/api/ApiService';
import { UserInput, EditParameters, EditType } from '../lib/workflow/WorkflowOptimizer';
import { FiZap, FiEdit, FiRefreshCw, FiLayers, FiCpu, FiAlertCircle, FiCheckCircle, FiImage } from 'react-icons/fi';

// Types of processing operations
type ProcessingType = 'text' | 'scene' | 'style' | 'multi-region' | 'one-click';

interface ImageProcessorProps {
  processingType: ProcessingType;
  image?: File | Blob;
  textToReplace?: string;
  newText?: string;
  sceneDescription?: string;
  regions?: RegionDefinition[];
  options?: TextReplacementOptions | SceneTransformationOptions | MultiRegionOptions;
  onProcessingComplete?: (resultUrl: string) => void;
  onError?: (error: Error) => void;
  smartWorkflow?: boolean;
  suggestedParams?: EditParameters;
}

/**
 * A component that handles image processing operations
 */
const ImageProcessor: React.FC<ImageProcessorProps> = ({
  processingType,
  image,
  textToReplace,
  newText,
  sceneDescription,
  regions,
  options = {},
  onProcessingComplete,
  onError,
  smartWorkflow = true,
  suggestedParams
}) => {
  // State for parameters
  const [optimalParams, setOptimalParams] = useState<EditParameters | null>(suggestedParams || null);
  const [isUsingOptimalParams, setIsUsingOptimalParams] = useState<boolean>(smartWorkflow);
  
  // Update optimal params when suggested params change
  useEffect(() => {
    if (suggestedParams) {
      setOptimalParams(suggestedParams);
    }
  }, [suggestedParams]);
  
  // Use our API hook
  const {
    replaceText,
    transformScene,
    processMultiRegion,
    getOptimalParameters,
    executeOneClickWorkflow,
    status,
    progress,
    data,
    error
  } = useApi({
    onSuccess: (data) => {
      if (data?.resultUrl && onProcessingComplete) {
        onProcessingComplete(data.resultUrl);
      }
    },
    onError: (err) => {
      if (onError) onError(err);
    }
  });
  
  // Function to determine edit type based on processing type
  const getEditType = useCallback((): EditType | undefined => {
    switch (processingType) {
      case 'text': return 'textReplacement';
      case 'scene': return 'sceneTransformation';
      case 'style': return 'styleTransfer';
      case 'multi-region': return 'objectRemoval'; // map multi-region to the closest available type
      default: return undefined;
    }
  }, [processingType]);
  
  // Function to process image
  const processImage = useCallback(async () => {
    if (!image) return;
    
    try {
      // Merge options with optimal parameters if using smart workflow
      const mergedOptions = isUsingOptimalParams && optimalParams
        ? { ...options, ...optimalParams }
        : options;
        
      switch (processingType) {
        case 'text':
          if (!textToReplace || !newText) {
            throw new Error('Text replacement requires both source and target text');
          }
          await replaceText(
            image,
            textToReplace,
            newText,
            mergedOptions as TextReplacementOptions
          );
          break;
          
        case 'scene':
          if (!sceneDescription) {
            throw new Error('Scene transformation requires a scene description');
          }
          await transformScene(
            image,
            sceneDescription,
            mergedOptions as SceneTransformationOptions
          );
          break;
          
        case 'multi-region':
          if (!regions || regions.length === 0) {
            throw new Error('Multi-region editing requires at least one region');
          }
          await processMultiRegion(
            image,
            {
              regions,
              ...mergedOptions
            } as MultiRegionOptions
          );
          break;
          
        case 'one-click':
          const input: UserInput = {
            type: 'image',
            data: image instanceof File ? image : new File([image], 'image.png'),
            editType: getEditType(),
            options: mergedOptions
          };
          await executeOneClickWorkflow(input);
          break;
          
        default:
          throw new Error(`Unsupported processing type: ${processingType}`);
      }
    } catch (err) {
      console.error('Processing error:', err);
      // Error is already handled by the useApi hook
    }
  }, [
    image,
    processingType,
    textToReplace,
    newText,
    sceneDescription,
    regions,
    options,
    isUsingOptimalParams,
    optimalParams,
    replaceText,
    transformScene,
    processMultiRegion,
    executeOneClickWorkflow,
    getEditType
  ]);
  
  // Get optimal parameters when needed
  useEffect(() => {
    const fetchOptimalParams = async () => {
      if (image && isUsingOptimalParams) {
        try {
          // Determine edit type based on processing type
          const editType = processingType === 'text' 
            ? 'text'
            : processingType === 'scene'
              ? 'scene'
              : processingType === 'style'
                ? 'style'
                : 'object';
          
          const result = await getOptimalParameters(image, editType);
          if (result.data) {
            setOptimalParams(result.data);
          }
        } catch (err) {
          console.error('Failed to get optimal parameters:', err);
          // If we can't get optimal parameters, just proceed with defaults
          setIsUsingOptimalParams(false);
        }
      }
    };
    
    fetchOptimalParams();
  }, [image, isUsingOptimalParams, processingType, getOptimalParameters]);
  
  return (
    <div className="relative">
      {/* Status indicator */}
      {status === 'loading' && (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin mx-auto"></div>
          </div>
          <p className="text-gray-700 mb-2">Processing your image...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 max-w-md mx-auto">
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress.percent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{progress.percent}% complete</p>
          {progress.stage && (
            <p className="text-xs text-gray-400 mt-1">Current stage: {progress.stage}</p>
          )}
        </div>
      )}
      
      {/* Success state */}
      {status === 'success' && data && (
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start mb-4 max-w-md mx-auto">
            <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-green-800 font-medium">Processing Complete</h3>
              <p className="text-green-700 text-sm mt-1">
                Your image has been successfully processed.
              </p>
            </div>
          </div>
          
          {data.resultUrl && (
            <div className="relative w-full max-w-lg h-64 mx-auto mb-4">
              <Image 
                src={data.resultUrl} 
                alt="Processed result" 
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      )}
      
      {/* Error state */}
      {status === 'error' && error && (
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start mb-4 max-w-md mx-auto">
            <FiAlertCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium">Processing Failed</h3>
              <p className="text-red-700 text-sm mt-1">
                {error.message || 'An error occurred during processing'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Ready state - show process button */}
      {status === 'idle' && (
        <div className="text-center py-8">
          <button
            onClick={processImage}
            disabled={!image}
            className={`bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center mx-auto ${
              !image && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {processingType === 'text' ? (
              <><FiEdit className="mr-2" /> Replace Text</>
            ) : processingType === 'scene' ? (
              <><FiRefreshCw className="mr-2" /> Transform Scene</>
            ) : processingType === 'multi-region' ? (
              <><FiLayers className="mr-2" /> Process Regions</>
            ) : (
              <><FiZap className="mr-2" /> Process Image</>
            )}
          </button>
          
          {/* Smart workflow toggle */}
          <div className="mt-4 flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <div className="mr-3">
                <input
                  type="checkbox"
                  checked={isUsingOptimalParams}
                  onChange={(e) => setIsUsingOptimalParams(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 relative"></div>
              </div>
              <span className="text-sm text-gray-700">
                <FiCpu className="inline-block mr-1" /> 
                Smart Workflow
              </span>
            </label>
          </div>
          
          {/* Info message about smart workflow if enabled */}
          {isUsingOptimalParams && (
            <div className="mt-3 text-xs text-gray-500 max-w-md mx-auto">
              Smart Workflow automatically determines the optimal processing parameters for your image.
            </div>
          )}
          
          {/* Show image preview */}
          {image && (
            <div className="mt-6">
              <div className="relative w-full max-w-md h-48 mx-auto border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                <Image 
                  src={URL.createObjectURL(image)} 
                  alt="Image to process" 
                  fill
                  className="object-contain"
                  onLoadingComplete={() => {
                    // Clean up object URL when image is loaded
                    return () => URL.revokeObjectURL(URL.createObjectURL(image));
                  }}
                />
              </div>
            </div>
          )}
          
          {/* No image message */}
          {!image && (
            <div className="mt-6 text-center py-6 text-gray-500 max-w-md mx-auto">
              <FiImage className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Please upload an image to process</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
