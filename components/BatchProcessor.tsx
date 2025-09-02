import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { FiPlus, FiTrash, FiUpload, FiCpu, FiZap, FiCheck, FiX, FiAlertCircle, FiImage, FiDownload, FiEye } from 'react-icons/fi';
import { useApi } from '../lib/api/useApi';
import { ProcessingOptions } from '../lib/api/ApiService';

interface BatchImageItem {
  id: string;
  file: File;
  previewUrl: string;
  resultUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  progress: number;
}

interface BatchProcessorProps {
  processingType: 'text' | 'scene' | 'style';
  prompt: string;
  options?: ProcessingOptions;
  maxBatchSize?: number;
}

/**
 * A component for batch processing multiple images with the same operation
 */
const BatchProcessor: React.FC<BatchProcessorProps> = ({
  processingType,
  prompt,
  options = {},
  maxBatchSize = 20
}) => {
  // Images to process
  const [images, setImages] = useState<BatchImageItem[]>([]);
  
  // Process status
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [overallProgress, setOverallProgress] = useState(0);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // API hooks
  const { 
    replaceText, 
    transformScene, 
    executeOneClickWorkflow,
    status
  } = useApi({
    onError: (err) => {
      setError(`Error processing image ${currentIndex + 1}: ${err.toString()}`);
    }
  });
  
  // Calculate stats
  const stats = useMemo(() => {
    const completed = images.filter(img => img.status === 'completed').length;
    const pending = images.filter(img => img.status === 'pending').length;
    const processing = images.filter(img => img.status === 'processing').length;
    const failed = images.filter(img => img.status === 'error').length;
    
    return { 
      total: images.length,
      completed,
      pending,
      processing,
      failed
    };
  }, [images]);
  
  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // Check if adding these files would exceed the limit
    if (images.length + files.length > maxBatchSize) {
      setError(`Cannot add more than ${maxBatchSize} images in total`);
      return;
    }
    
    // Create new image items
    const newImages: BatchImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'pending',
      progress: 0
    }));
    
    setImages([...images, ...newImages]);
    setError(null);
    
    // Reset input value so the same file can be added again
    event.target.value = '';
  }, [images, maxBatchSize]);
  
  // Remove an image
  const removeImage = useCallback((id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    
    setImages(images.filter(img => img.id !== id));
  }, [images]);
  
  // Remove all images
  const clearAllImages = useCallback(() => {
    // Clean up URLs
    images.forEach(img => {
      if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
    });
    
    setImages([]);
  }, [images]);
  
  // Process a single image
  const processImage = useCallback(async (image: BatchImageItem, index: number) => {
    setCurrentIndex(index);
    
    // Update image status to processing
    const updatedImages = [...images];
    updatedImages[index].status = 'processing';
    setImages(updatedImages);
    
    try {
      // Track progress for this image
      const updateProgress = (progress: number) => {
        const newImages = [...images];
        newImages[index].progress = progress;
        setImages(newImages);
        
        // Calculate overall progress
        const completedWeight = stats.completed / stats.total;
        const currentWeight = (1 / stats.total) * (progress / 100);
        setOverallProgress(Math.round((completedWeight + currentWeight) * 100));
      };
      
      let result;
      
      // Process based on type
      if (processingType === 'text') {
        // Split prompt for text replacement
        const [textToReplace, newText] = prompt.split(' to ').map(p => p.trim());
        if (!textToReplace || !newText) {
          throw new Error('Invalid text replacement prompt. Format: "old text to new text"');
        }
        
        result = await replaceText(image.file, textToReplace, newText, options);
      } else if (processingType === 'scene') {
        result = await transformScene(image.file, prompt, options);
      } else {
        // Style or other types - use one-click workflow
        // 创建合适的输入格式
        const input: import('../lib/workflow/WorkflowOptimizer').UserInput = {
          type: 'image' as const,
          data: image.file,
          editType: processingType === 'style' ? 'styleTransfer' : 'objectRemoval',
          options: {
            ...options,
            prompt
          }
        };
        
        result = await executeOneClickWorkflow(input);
      }
      
      // Update image with result
      if (result.data?.resultUrl) {
        const newImages = [...images];
        newImages[index].resultUrl = result.data.resultUrl;
        newImages[index].status = 'completed';
        newImages[index].progress = 100;
        setImages(newImages);
      } else {
        throw new Error('No result URL returned');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      // Update image with error
      const newImages = [...images];
      newImages[index].status = 'error';
      newImages[index].error = errorMessage;
      setImages(newImages);
      
      // Set error but continue processing
      setError(`Error processing image ${index + 1}: ${errorMessage}`);
    }
  }, [images, stats, processingType, prompt, options, replaceText, transformScene, executeOneClickWorkflow]);
  
  // Process all images
  const processAllImages = useCallback(async () => {
    if (images.length === 0 || !prompt) {
      setError('Please add images and provide a prompt');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    setOverallProgress(0);
    
    // Reset images with errors to pending
    const resetImages = images.map(img => {
      if (img.status === 'error') {
        return { ...img, status: 'pending' as const, progress: 0, error: undefined };
      }
      return img;
    });
    setImages(resetImages);
    
    try {
      // Process images sequentially
      for (let i = 0; i < resetImages.length; i++) {
        const image = resetImages[i];
        
        // Skip already completed images
        if (image.status === 'completed') {
          continue;
        }
        
        await processImage(image, i);
      }
    } finally {
      setIsProcessing(false);
      setCurrentIndex(-1);
    }
  }, [images, prompt, processImage]);
  
  // Download all results
  const downloadAllResults = useCallback(() => {
    // This is a simplified implementation
    // In a real application, you might want to create a ZIP file or handle downloads differently
    
    images.forEach(img => {
      if (img.resultUrl) {
        const link = document.createElement('a');
        link.href = img.resultUrl;
        link.download = `processed-${img.file.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }, [images]);
  
  // Determine if we can start processing
  const canProcess = images.length > 0 && prompt && !isProcessing;
  
  // Check if all images are processed
  const allProcessed = images.length > 0 && images.every(img => img.status === 'completed');
  
  // Render component
  return (
    <div className="space-y-6">
      {/* Batch settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-medium text-lg mb-4">Batch Processing</h3>
        
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-500 mb-1">Processing Type</label>
            <div className="p-2 bg-gray-100 rounded text-gray-700">
              {processingType === 'text' ? 'Text Replacement' : 
               processingType === 'scene' ? 'Scene Transformation' : 'Style Transfer'}
            </div>
          </div>
          
          <div className="flex-[2] min-w-[300px]">
            <label className="block text-sm text-gray-500 mb-1">Prompt</label>
            <div className="p-2 bg-gray-100 rounded text-gray-700 line-clamp-1">
              {prompt || <span className="text-gray-400 italic">No prompt provided</span>}
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>Total: <span className="font-medium">{stats.total}</span></div>
            <div>Pending: <span className="font-medium">{stats.pending}</span></div>
            <div>Processing: <span className="font-medium">{stats.processing}</span></div>
            <div>Completed: <span className="text-green-600 font-medium">{stats.completed}</span></div>
            <div>Failed: <span className="text-red-600 font-medium">{stats.failed}</span></div>
          </div>
        )}
      </div>
      
      {/* Image upload */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Images ({images.length}/{maxBatchSize})</h3>
          <div className="flex space-x-2">
            <label className={`px-3 py-1.5 rounded text-sm font-medium cursor-pointer
              ${images.length >= maxBatchSize ? 'bg-gray-100 text-gray-400' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                className="hidden"
                onChange={handleFileUpload}
                disabled={images.length >= maxBatchSize || isProcessing}
              />
              <FiUpload className="inline-block mr-1" /> Add Images
            </label>
            
            {images.length > 0 && (
              <button
                onClick={clearAllImages}
                disabled={isProcessing}
                className={`px-3 py-1.5 rounded text-sm font-medium
                  ${isProcessing ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
              >
                <FiTrash className="inline-block mr-1" /> Clear All
              </button>
            )}
          </div>
        </div>
        
        {/* Image grid */}
        {images.length === 0 ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-300 hover:bg-gray-50"
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          >
            <FiUpload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-1">Drag and drop image files here, or click to browse</p>
            <p className="text-xs text-gray-500">JPEG, PNG, or WebP • Max {maxBatchSize} images</p>
          </div>
        ) : (
          <div>
            {/* Overall progress bar */}
            {isProcessing && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <div>Overall Progress</div>
                  <div>{overallProgress}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div 
                  key={img.id}
                  className={`border rounded-md overflow-hidden relative ${
                    currentIndex === idx ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-200'
                  }`}
                >
                  {/* Status indicator */}
                  <div className={`absolute top-0 left-0 right-0 z-10 text-xs font-medium text-white px-2 py-0.5
                    ${img.status === 'pending' ? 'bg-gray-500' : 
                      img.status === 'processing' ? 'bg-primary-600' : 
                      img.status === 'completed' ? 'bg-green-600' : 'bg-red-600'}`}
                  >
                    {img.status === 'pending' ? 'Pending' : 
                     img.status === 'processing' ? `Processing ${img.progress}%` : 
                     img.status === 'completed' ? 'Completed' : 'Failed'}
                  </div>
                  
                  {/* Image preview */}
                  <div className="relative h-36 bg-gray-100">
                    {img.resultUrl && img.status === 'completed' ? (
                      <Image 
                        src={img.resultUrl} 
                        alt="Processed result" 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <Image 
                        src={img.previewUrl} 
                        alt="Image preview" 
                        fill 
                        className="object-cover"
                      />
                    )}
                    
                    {/* Processing overlay */}
                    {img.status === 'processing' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Error overlay */}
                    {img.status === 'error' && (
                      <div className="absolute inset-0 bg-red-900 bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded p-2 max-w-full">
                          <p className="text-xs text-red-600 font-medium line-clamp-3">
                            <FiAlertCircle className="inline-block mr-1" />
                            {img.error || 'Processing failed'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer with file name */}
                  <div className="p-2 bg-white">
                    <div className="text-xs text-gray-700 truncate">{img.file.name}</div>
                    
                    {/* Actions */}
                    <div className="flex justify-between mt-1">
                      {/* Left actions */}
                      <div className="flex space-x-1">
                        {img.status === 'completed' && (
                          <>
                            <a
                              href={img.resultUrl}
                              download={`processed-${img.file.name}`}
                              className="p-1 text-xs rounded text-gray-600 hover:bg-gray-100"
                              title="Download result"
                            >
                              <FiDownload size={14} />
                            </a>
                            <a
                              href={img.resultUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-xs rounded text-gray-600 hover:bg-gray-100"
                              title="View result"
                            >
                              <FiEye size={14} />
                            </a>
                          </>
                        )}
                      </div>
                      
                      {/* Right actions */}
                      <div>
                        {!isProcessing && (
                          <button
                            onClick={() => removeImage(img.id)}
                            className="p-1 text-xs rounded text-red-600 hover:bg-red-50"
                            title="Remove image"
                          >
                            <FiTrash size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-between">
        <div>
          {allProcessed && stats.total > 0 && (
            <button
              onClick={downloadAllResults}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <FiDownload className="mr-2" /> Download All Results
            </button>
          )}
        </div>
        
        <div>
          <button
            onClick={processAllImages}
            disabled={!canProcess}
            className={`px-4 py-2 rounded-md flex items-center
              ${canProcess ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            {isProcessing ? (
              <><FiCpu className="animate-spin mr-2" /> Processing...</>
            ) : (
              <><FiZap className="mr-2" /> Process All Images</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchProcessor;
