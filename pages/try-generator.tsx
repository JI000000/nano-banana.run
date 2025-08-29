import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiUpload, FiCpu, FiImage, FiType, FiRefreshCw, FiZap, FiCheck, FiInfo, FiLayers } from 'react-icons/fi';
import { useApi } from '../lib/api/useApi';
import ImageProcessor from '../components/ImageProcessor';
import RegionSelector from '../components/RegionSelector';
import SmartParamsSuggester from '../components/SmartParamsSuggester';
import { RegionDefinition } from '../lib/api/ApiService';
import { GAEvents, trackEvent } from '../lib/analytics/ga';

// Tabs for different editing modes
type EditingMode = 'text' | 'scene' | 'style' | 'multi-region';

// Main component
const TryGenerator: React.FC = () => {
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
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Try Nano-Banana Generator</h1>
            <p className="text-lg text-primary-100">
              Experience the power of our enhanced AI image editing system with improved text replacement, 
              scene transformation, and accelerated processing.
            </p>
          </div>
        </div>
      </div>
      
      {/* 使用重新设计的ImageProcessor组件 */}
      <div className="py-12">
        <ImageProcessor />
      </div>
      
      {/* Pro tips section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Pro Tips</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <ul className="space-y-6">
                <li className="flex">
                  <FiZap className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Use natural language prompts like "place in a blizzard"</h3>
                    <p className="text-gray-600 text-sm">Our enhanced language understanding can interpret complex instructions.</p>
                  </div>
                </li>
                <li className="flex">
                  <FiZap className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Try "imagine the whole face" for face completion</h3>
                    <p className="text-gray-600 text-sm">The new face generation algorithm creates more natural facial features.</p>
                  </div>
                </li>
                <li className="flex">
                  <FiZap className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Maintains character consistency across all edits</h3>
                    <p className="text-gray-600 text-sm">Our improved character preservation ensures subjects remain consistent.</p>
                  </div>
                </li>
                <li className="flex">
                  <FiZap className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">Perfect one-shot editing - no iterations needed</h3>
                    <p className="text-gray-600 text-sm">With 40% higher accuracy, most edits are perfect on the first try.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to transform more images?</h2>
            <p className="text-lg text-primary-100 mb-8">
              Learn advanced techniques and unlock the full potential of Nano-Banana
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutorials" className="btn bg-white text-primary-900 hover:bg-primary-50 px-6 py-3 rounded-md font-medium inline-block">
                View Tutorials
              </Link>
              <Link href="/examples" className="btn border border-white text-white hover:bg-primary-800 px-6 py-3 rounded-md font-medium inline-block">
                Browse Examples
              </Link>
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
            'url': 'https://nano-banana.run/try-generator',
            'description': 'Experience the power of Nano-Banana AI with enhanced text replacement, scene transformation, and accelerated processing.',
            'applicationCategory': 'DesignApplication',
            'operatingSystem': 'Web browser',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })
        }}
      />
    </Layout>
  );
};

export default TryGenerator;

