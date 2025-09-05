import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiUpload, FiCpu, FiImage, FiType, FiRefreshCw, FiZap, FiCheck, FiInfo, FiLayers, FiGrid, FiEye, FiDownload, FiShare2 } from 'react-icons/fi';
import { useApi } from '../lib/api/useApi';
import UnifiedImageEditor from '../components/UnifiedImageEditor';
import RegionSelector from '../components/RegionSelector';
import SmartParamsSuggester from '../components/SmartParamsSuggester';
import BatchProcessor from '../components/BatchProcessor';
import { RegionDefinition } from '../lib/api/ApiService';
import { GAEvents, trackEvent } from '../lib/analytics/ga';

// Tabs for different editing modes
type EditingMode = 'text' | 'scene' | 'style' | 'multi-region' | 'batch';

// Main component
const ImageEditor: React.FC = () => {
  // State for the uploaded image
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<EditingMode>('text');
  const [isSmartWorkflow, setIsSmartWorkflow] = useState(true);
  const [regions, setRegions] = useState<RegionDefinition[]>([]);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [suggestedParams, setSuggestedParams] = useState<any>(null);
  
  // Use our API hook
  const { status, progress } = useApi();

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      setFile(selectedFile);
      trackEvent(GAEvents.upload_image, { source: 'file_input', size: selectedFile.size, type: selectedFile.type });
      
      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setImage(url);
    }
  };
  
  // Handle drag and drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      const droppedFile = files[0];
      setFile(droppedFile);
      trackEvent(GAEvents.upload_image, { source: 'drag_drop', size: droppedFile.size, type: droppedFile.type });
      
      // Create preview URL
      const url = URL.createObjectURL(droppedFile);
      setImage(url);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  // Process completion handler
  const handleProcessingComplete = (url: string) => {
    setResultImage(url);
  };
  
  // Error handler
  const handleProcessingError = (error: Error) => {
    console.error('Processing error:', error);
    // Could add a toast notification here
  };
  
  // Clear the image and result
  const handleReset = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setFile(null);
    setPrompt('');
    setResultImage(null);
    setRegions([]);
    trackEvent('reset_editor');
  };
  
  // Example prompts for each mode
  const examplePrompts: Record<EditingMode, string[]> = {
    text: [
      "Replace sign text: 'Coming Soon' -> 'Now Open'",
      "Translate all visible text into Japanese (match fonts)",
      "Update phone number to 555-123-4567 (keep layout)"
    ],
    scene: [
      "Place subject in a snowy mountain at golden hour",
      "Convert daytime to sunset with warm lighting",
      "Move the scene from office to a forest trail"
    ],
    style: [
      "Apply oil painting style with visible brush strokes",
      "Convert to watercolor while keeping outlines",
      "Anime style with soft shading and clean lines"
    ],
    "multi-region": [
      "Replace poster text (Region A) and change wall color (Region B)",
      "Blur license plate (Region A) and enhance sky (Region B)",
      "Remove object (Region A) and add logo (Region B)"
    ],
    batch: [
      "Process all images with the same text replacement",
      "Apply consistent style across multiple images",
      "Batch transform scene backgrounds"
    ]
  };

  // Use an example prompt
  const useExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    trackEvent(GAEvents.use_example_prompt, { mode, examplePrompt });
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <Layout
      title="Nano Banana Free - Try Nano Banana AI Image Editor Online | How to Use Nano Banana"
      description="Try nano banana free online! Access nano banana AI image editor with text replacement, scene transformation, and style matching. Learn how to use nano banana with our free online tool. No registration required."
      keywords="nano banana free, try nano banana, nano banana online, nano banana ai editor, how to use nano banana, nano banana tutorial, nano banana examples, nano banana prompt, nano banana text replacement, nano banana scene transformation, nano banana style matching, nano banana google, google nano banana, nano banana gemini, gemini nano banana, nano banana ai studio, nano banana lmarena, lmarena nano banana, nano banana vs flux kontext, nano banana comparison, what is nano banana, nano banana model, nano banana ai, nano banana access, nano banana api, nano banana 使い方, nano banana使用方法, nano banana是什么, nano banana 無料, nano banana教学, nano banana exampies"
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-2">Nano Banana Free - AI Image Editor</h1>
            <p className="text-sm md:text-base text-primary-100">
              Try nano banana free! AI-powered image editing with enhanced text replacement and scene transformation. Learn how to use nano banana.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content - Compact Single Page Layout */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Unified Editor Layout */}
            <UnifiedImageEditor 
              compact={false}
              showModeTabs={true}
              showFeatures={true}
              showTips={true}
              showStats={true}
            />
          </div>
        </div>
      </div>
      
      {/* Compact SEO Content Section */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold mb-2">Text Replacement</h3>
                <p className="text-gray-600 text-xs">Intelligently replace text in images while maintaining natural fonts and layouts.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold mb-2">Scene Transformation</h3>
                <p className="text-gray-600 text-xs">Transform backgrounds and environments while preserving subjects.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold mb-2">Style Matching</h3>
                <p className="text-gray-600 text-xs">Apply artistic styles while maintaining character consistency.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold mb-2">Batch Processing</h3>
                <p className="text-gray-600 text-xs">Process multiple images simultaneously with consistent results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Nano-Banana AI Image Editor',
            'url': 'https://nano-banana.run/image-editor',
            'description': 'Free AI-powered image editor with text replacement, scene transformation, and style matching. Create stunning images with natural language prompts.',
            'applicationCategory': 'DesignApplication',
            'operatingSystem': 'Web browser',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            },
            'featureList': [
              'Text Replacement',
              'Scene Transformation', 
              'Style Matching',
              'AI-Powered Generation',
              'Real-time Preview',
              'Batch Processing'
            ],
            'screenshot': 'https://nano-banana.run/images/image-editor-screenshot.jpg'
          })
        }}
      />
    </Layout>
  );
};

export default ImageEditor;

