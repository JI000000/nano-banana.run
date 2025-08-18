import React, { useState } from 'react';
import Layout from '../components/Layout';
import BatchProcessor from '../components/BatchProcessor';
import SmartParamsSuggester from '../components/SmartParamsSuggester';
import { FiUpload, FiCpu, FiType, FiRefreshCw, FiImage, FiZap, FiInfo } from 'react-icons/fi';

// Types
type ProcessingType = 'text' | 'scene' | 'style';

const BatchProcessingPage: React.FC = () => {
  // State
  const [mode, setMode] = useState<ProcessingType>('text');
  const [prompt, setPrompt] = useState('');
  const [isSmartWorkflow, setIsSmartWorkflow] = useState(true);
  const [suggestedParams, setSuggestedParams] = useState<any>(null);
  
  // Example prompts for each mode
  const examplePrompts = {
    text: [
      "Coming Soon to Now Open",
      "Contact us at info@example.com to Contact us at support@example.com",
      "Free Trial to Premium Version"
    ],
    scene: [
      "Transform to a beach at sunset",
      "Change to a snowy mountain landscape",
      "Convert to nighttime cityscape with neon lights"
    ],
    style: [
      "Convert to watercolor painting style",
      "Apply oil painting effect",
      "Transform to anime style illustration"
    ]
  };
  
  // Use an example prompt
  const useExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };
  
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Batch Processing</h1>
            <p className="text-lg text-primary-100">
              Process multiple images in one operation. Apply the same text replacement, scene transformation,
              or style transfer to a batch of images for consistent results and maximum efficiency.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FiCpu className="mr-2" /> Batch Settings
            </h2>
            
            {/* Processing mode */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processing Type
              </label>
              
              <div className="flex border border-gray-200 rounded-md">
                <button
                  className={`flex-1 py-3 px-4 flex justify-center items-center text-sm font-medium ${
                    mode === 'text' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } rounded-l-md`}
                  onClick={() => setMode('text')}
                >
                  <FiType className="mr-2" /> Text Replacement
                </button>
                <button
                  className={`flex-1 py-3 px-4 flex justify-center items-center text-sm font-medium ${
                    mode === 'scene' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } border-l border-r border-gray-200`}
                  onClick={() => setMode('scene')}
                >
                  <FiRefreshCw className="mr-2" /> Scene Transform
                </button>
                <button
                  className={`flex-1 py-3 px-4 flex justify-center items-center text-sm font-medium ${
                    mode === 'style' ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-white text-gray-700'
                  } rounded-r-md`}
                  onClick={() => setMode('style')}
                >
                  <FiImage className="mr-2" /> Style Transfer
                </button>
              </div>
            </div>
            
            {/* Prompt */}
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'text' ? 'Text Replacement Instructions' : 
                mode === 'scene' ? 'Scene Transformation Description' : 'Style Transfer Instructions'}
              </label>
              <textarea
                id="prompt"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:ring-primary-500 focus:border-primary-500"
                rows={2}
                placeholder={
                  mode === 'text' ? 'Describe the text you want to replace and what to replace it with...' : 
                  mode === 'scene' ? 'Describe how you want to transform the scene...' : 
                  'Describe the artistic style you want to apply...'
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
              
              {/* Example prompts */}
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Example prompts:</p>
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
            
            {/* Smart Parameters */}
            <div className="mb-6">
              <SmartParamsSuggester
                editType={mode}
                isAutomatic={isSmartWorkflow}
                onParamsSelected={(params) => setSuggestedParams(params)}
              />
            </div>
            
            {/* Smart workflow toggle */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-6">
              <div className="flex items-center">
                <FiZap className="text-yellow-500 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">Smart Workflow</p>
                  <p className="text-sm text-gray-600">Optimize parameters automatically for each image</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isSmartWorkflow} onChange={(e) => setIsSmartWorkflow(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          
          {/* Batch processor */}
          <div className="mb-6">
            {prompt ? (
              <BatchProcessor
                processingType={mode}
                prompt={prompt}
                options={{ ...suggestedParams, smartWorkflow: isSmartWorkflow }}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <FiInfo className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Enter a prompt to begin</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Provide instructions for how you want to process your batch of images,
                  then add images and start batch processing.
                </p>
              </div>
            )}
          </div>
          
          {/* Info section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium mb-2">About Batch Processing</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Process up to 20 images in a single batch</li>
              <li>All images will use the same prompt and settings</li>
              <li>Images are processed one at a time to ensure quality</li>
              <li>You can download individual results or all results at once</li>
              <li>For best results, use images with similar characteristics in each batch</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'Nano-Banana Batch Processing',
            'applicationCategory': 'DesignApplication',
            'operatingSystem': 'Web browser',
            'description': 'Process multiple images in one operation with Nano-Banana AI. Apply the same text replacement, scene transformation, or style transfer to a batch of images.',
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

export default BatchProcessingPage;
