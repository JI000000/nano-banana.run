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
  };
  
  // Example prompts for each mode
  const examplePrompts: Record<EditingMode, string[]> = {
    text: [
      "Change 'Coming Soon' to 'Now Open'",
      "Replace all text with Japanese translation",
      "Change the phone number to 555-123-4567"
    ],
    scene: [
      "Transform the beach to a snowy mountain",
      "Change daytime scene to sunset",
      "Move the scene from office to forest"
    ],
    style: [
      "Apply oil painting style",
      "Convert to watercolor artwork",
      "Make it look like an anime scene"
    ],
    "multi-region": [
      "Edit multiple regions of the image",
      "Apply different styles to different parts",
      "Replace text while changing background"
    ]
  };

  // Use an example prompt
  const useExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
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
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: Input */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FiUpload className="mr-2" /> Upload Image
              </h2>
              
              {/* File upload area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer 
                  ${image ? 'border-primary-300 bg-primary-50' : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {image ? (
                  <div className="space-y-4">
                    <div className="relative w-full h-64">
                      <Image 
                        src={image} 
                        alt="Uploaded image" 
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <FiImage className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-gray-600">
                      Drag and drop an image here, or click to select a file
                    </p>
                    <p className="text-sm text-gray-500">
                      JPEG, PNG, or WebP • Max 5MB
                    </p>
                  </div>
                )}
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            {/* Editing mode selection */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FiCpu className="mr-2" /> Edit Mode
              </h2>
              
              <div className="flex flex-wrap border border-gray-200 rounded-md mb-6">
                <button
                  className={`flex-1 py-3 px-3 flex justify-center items-center text-sm font-medium ${
                    mode === 'text' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } rounded-l-md`}
                  onClick={() => setMode('text')}
                >
                  <FiType className="mr-1" /> Text Replacement
                </button>
                <button
                  className={`flex-1 py-3 px-3 flex justify-center items-center text-sm font-medium ${
                    mode === 'scene' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } border-l border-r border-gray-200`}
                  onClick={() => setMode('scene')}
                >
                  <FiRefreshCw className="mr-1" /> Scene Transform
                </button>
                <button
                  className={`flex-1 py-3 px-3 flex justify-center items-center text-sm font-medium ${
                    mode === 'style' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } border-r border-gray-200`}
                  onClick={() => setMode('style')}
                >
                  <FiImage className="mr-1" /> Style Transfer
                </button>
                <button
                  className={`flex-1 py-3 px-3 flex justify-center items-center text-sm font-medium ${
                    mode === 'multi-region' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } rounded-r-md`}
                  onClick={() => setMode('multi-region')}
                >
                  <FiLayers className="mr-1" /> Multi-Region
                </button>
              </div>
              
              {/* Smart Parameters Component */}
              {file && image && (
                <div className="mb-6">
                  <SmartParamsSuggester
                    image={file}
                    editType={mode === 'text' ? 'text' : mode === 'scene' ? 'scene' : 'style'}
                    isAutomatic={isSmartWorkflow}
                    onParamsSelected={(params) => setSuggestedParams(params)}
                  />
                </div>
              )}
              
              {/* Smart workflow toggle */}
              <div className="flex items-center justify-between mb-6 bg-gray-50 p-3 rounded-md">
                <div className="flex items-center">
                  <FiZap className="text-yellow-500 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Smart Workflow</p>
                    <p className="text-sm text-gray-600">Optimize parameters automatically</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isSmartWorkflow} onChange={(e) => setIsSmartWorkflow(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              {/* For Multi-Region mode */}
              {mode === 'multi-region' && file && image ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Multi-Region Editing
                  </label>
                  <div className="h-[400px] border border-gray-300 rounded-md mb-2">
                    <RegionSelector
                      imageUrl={image}
                      regions={regions}
                      onChange={setRegions}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Define multiple regions and specify different edits for each region
                  </p>
                </div>
              ) : (
                /* Prompt input for other modes */
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                    {mode === 'text' ? 'Text Replacement Instructions' : 
                    mode === 'scene' ? 'Scene Transformation Description' : 'Style Transfer Instructions'}
                  </label>
                  <textarea
                    id="prompt"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    placeholder={
                      mode === 'text' ? 'Describe the text you want to replace and what to replace it with...' : 
                      mode === 'scene' ? 'Describe how you want to transform the scene...' : 
                      'Describe the artistic style you want to apply...'
                    }
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
                  
                  {/* Example prompts */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Example prompts:</p>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts[mode].map((examplePrompt, index) => (
                        <button
                          key={index}
                          onClick={() => useExamplePrompt(examplePrompt)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-800"
                        >
                          {examplePrompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* No process button - using ImageProcessor component instead */}
            <div className="flex gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
          
          {/* Right column: Output */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 h-full">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FiImage className="mr-2" /> Output Gallery
              </h2>
              
              {/* Image Processor Component */}
              {file && (
                <ImageProcessor 
                  processingType={mode}
                  image={file}
                  textToReplace={mode === 'text' ? prompt.split(' to ')[0] : undefined}
                  newText={mode === 'text' ? prompt.split(' to ')[1] : undefined}
                  sceneDescription={mode === 'scene' ? prompt : undefined}
                  regions={mode === 'multi-region' ? regions : undefined}
                  options={{ smartWorkflow: isSmartWorkflow }}
                  onProcessingComplete={handleProcessingComplete}
                  onError={handleProcessingError}
                  smartWorkflow={isSmartWorkflow}
                  suggestedParams={suggestedParams}
                />
              )}
              
              {/* Result display */}
              {resultImage && status !== 'loading' && (
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    Download Result
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    Edit Again
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    Share
                  </button>
                </div>
              )}
              
              {/* Empty state */}
              {!file && status !== 'loading' && (
                <div className="text-center py-12 text-gray-500">
                  <FiInfo className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Ready for instant generation</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Upload an image and enter your prompt to see the power of Nano-Banana's enhanced AI image editing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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

