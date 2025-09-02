import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { 
  FiEye, 
  FiEyeOff, 
  FiZoomIn, 
  FiZoomOut, 
  FiRotateCw, 
  FiSettings,
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiMaximize,
  FiMinimize
} from 'react-icons/fi';
import { RealTimePreviewEngine, PreviewUpdate, PreviewConfig } from '../lib/real-time-preview/RealTimePreviewEngine';

interface RealTimePreviewProps {
  prompt: string;
  baseImage?: string;
  metadata?: {
    style?: string;
    quality?: string;
    industry?: string;
    userPreferences?: string[];
  };
  onPreviewReady?: (preview: PreviewUpdate) => void;
  className?: string;
}

export default function RealTimePreview({
  prompt,
  baseImage,
  metadata,
  onPreviewReady,
  className = ''
}: RealTimePreviewProps) {
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);
  const [currentPreview, setCurrentPreview] = useState<PreviewUpdate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewConfig, setPreviewConfig] = useState<PreviewConfig>({
    quality: 'medium',
    updateFrequency: 'debounced',
    cacheEnabled: true,
    maxCacheSize: 50,
    previewResolution: 'preview'
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [previewStats, setPreviewStats] = useState({
    fps: 0,
    cacheHitRate: 0,
    averageProcessingTime: 0
  });

  const previewEngineRef = useRef<RealTimePreviewEngine | null>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // Initialize preview engine
  useEffect(() => {
    if (!previewEngineRef.current) {
      previewEngineRef.current = new RealTimePreviewEngine(previewConfig);
      
      // Subscribe to preview updates
      const unsubscribe = previewEngineRef.current.subscribe((update) => {
        setCurrentPreview(update);
        onPreviewReady?.(update);
        
        // Update FPS calculation
        const now = performance.now();
        if (lastUpdateTimeRef.current > 0) {
          frameCountRef.current++;
          if (now - lastUpdateTimeRef.current >= 1000) { // Every second
            setPreviewStats(prev => ({
              ...prev,
              fps: Math.round(frameCountRef.current * 1000 / (now - lastUpdateTimeRef.current))
            }));
            frameCountRef.current = 0;
            lastUpdateTimeRef.current = now;
          }
        } else {
          lastUpdateTimeRef.current = now;
        }
      });
      
      return unsubscribe;
    }
  }, [onPreviewReady]);

  const generatePreview = useCallback(async () => {
    if (!previewEngineRef.current || !prompt.trim()) return;

    setIsGenerating(true);
    try {
      await previewEngineRef.current.generatePreview(prompt, baseImage, metadata);
    } catch (error) {
      console.error('Failed to generate preview:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, baseImage, metadata]);

  // Update preview when prompt or metadata changes
  useEffect(() => {
    if (isPreviewEnabled && prompt.trim() && previewEngineRef.current) {
      generatePreview();
    }
  }, [prompt, metadata, isPreviewEnabled, generatePreview]);

  // Update preview engine config when config changes
  useEffect(() => {
    if (previewEngineRef.current) {
      previewEngineRef.current.updateConfig(previewConfig);
    }
  }, [previewConfig]);

  // Update cache stats
  useEffect(() => {
    const updateStats = () => {
      if (previewEngineRef.current) {
        const cacheStats = previewEngineRef.current.getCacheStats();
        setPreviewStats(prev => ({
          ...prev,
          cacheHitRate: Math.round(cacheStats.hitRate * 100),
          averageProcessingTime: Math.round(cacheStats.totalAccesses > 0 ? 
            cacheStats.totalAccesses / cacheStats.size : 0)
        }));
      }
    };

    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.3));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen && previewContainerRef.current) {
      previewContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (isFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  const togglePreview = useCallback(() => {
    setIsPreviewEnabled(prev => !prev);
  }, []);

  const refreshPreview = useCallback(() => {
    generatePreview();
  }, [generatePreview]);

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FiEye className={`w-5 h-5 ${isPreviewEnabled ? 'text-green-600' : 'text-gray-400'}`} />
          <div>
            <h3 className="font-semibold text-gray-900">Real-time Preview</h3>
            <p className="text-sm text-gray-500">
              {isPreviewEnabled ? 'Live preview updates enabled' : 'Preview disabled'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePreview}
            className={`p-2 rounded-lg transition-colors ${
              isPreviewEnabled 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isPreviewEnabled ? 'Disable preview' : 'Enable preview'}
          >
            {isPreviewEnabled ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
          
          <button
            onClick={refreshPreview}
            disabled={isGenerating}
            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors"
            title="Refresh preview"
          >
            <FiRefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title={showControls ? 'Hide controls' : 'Show controls'}
          >
            <FiSettings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div 
        ref={previewContainerRef}
        className="relative overflow-hidden bg-gray-50 min-h-[300px] flex items-center justify-center"
      >
        {currentPreview ? (
          <div 
            className="relative transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <Image
              src={currentPreview.previewData}
              alt="AI Preview"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
              style={{ objectFit: 'contain' }}
            />
            
            {/* Preview Overlay */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {Math.round(currentPreview.confidence * 100)}% confidence
            </div>
            
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {Math.round(currentPreview.processingTime)}ms
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <FiEye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No Preview Available</p>
            <p className="text-sm">Start typing a prompt to see live preview</p>
            {isGenerating && (
              <div className="mt-4">
                <FiRefreshCw className="w-8 h-8 mx-auto animate-spin text-primary-600" />
                <p className="text-sm text-primary-600 mt-2">Generating preview...</p>
              </div>
            )}
          </div>
        )}

        {/* Zoom Controls */}
        {showControls && currentPreview && (
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
            <div className="flex flex-col space-y-1">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Zoom in"
              >
                <FiZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Zoom out"
              >
                <FiZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Reset zoom"
              >
                <FiRotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <FiMinimize className="w-4 h-4" /> : <FiMaximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Stats */}
      {showControls && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Preview FPS</p>
              <p className="text-lg font-semibold text-green-600">{previewStats.fps}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cache Hit Rate</p>
              <p className="text-lg font-semibold text-blue-600">{previewStats.cacheHitRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Processing</p>
              <p className="text-lg font-semibold text-purple-600">{previewStats.averageProcessingTime}ms</p>
            </div>
          </div>
          
          {/* Configuration Options */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Preview Quality</label>
                <select
                  value={previewConfig.previewResolution}
                  onChange={(e) => setPreviewConfig(prev => ({
                    ...prev,
                    previewResolution: e.target.value as any
                  }))}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="thumbnail">Thumbnail (Fast)</option>
                  <option value="preview">Preview (Balanced)</option>
                  <option value="full">Full (High Quality)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Update Frequency</label>
                <select
                  value={previewConfig.updateFrequency}
                  onChange={(e) => setPreviewConfig(prev => ({
                    ...prev,
                    updateFrequency: e.target.value as any
                  }))}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="manual">Manual</option>
                  <option value="debounced">Debounced (Recommended)</option>
                  <option value="realtime">Real-time</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
