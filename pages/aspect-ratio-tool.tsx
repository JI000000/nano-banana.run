import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiUpload, FiDownload, FiInfo, FiCheck, FiAlertCircle, FiCopy, FiRefreshCw } from 'react-icons/fi';

interface AspectRatioTemplate {
  id: string;
  name: string;
  ratio: string;
  description: string;
  template: string;
  useCase: string;
}

const ASPECT_RATIO_TEMPLATES: AspectRatioTemplate[] = [
  {
    id: 'square',
    name: 'Square (1:1)',
    ratio: '1:1',
    description: 'Perfect for social media posts, profile pictures, and square formats',
    template: '/templates/square.jpg',
    useCase: 'Instagram posts, profile pictures, square banners'
  },
  {
    id: 'widescreen',
    name: 'Widescreen (16:9)',
    ratio: '16:9',
    description: 'Standard widescreen format for videos and presentations',
    template: '/templates/widescreen.jpg',
    useCase: 'YouTube thumbnails, presentations, desktop wallpapers'
  },
  {
    id: 'vertical',
    name: 'Vertical (9:16)',
    ratio: '9:16',
    description: 'Mobile-first format for stories and vertical videos',
    template: '/templates/vertical.jpg',
    useCase: 'Instagram stories, TikTok videos, mobile wallpapers'
  },
  {
    id: 'standard',
    name: 'Standard (4:3)',
    ratio: '4:3',
    description: 'Classic format for photos and traditional displays',
    template: '/templates/standard.jpg',
    useCase: 'Traditional photos, computer monitors, tablets'
  },
  {
    id: 'portrait',
    name: 'Portrait (3:4)',
    ratio: '3:4',
    description: 'Portrait orientation for vertical content',
    template: '/templates/portrait.jpg',
    useCase: 'Portrait photos, magazine covers, vertical displays'
  },
  {
    id: 'ultrawide',
    name: 'Ultrawide (21:9)',
    ratio: '21:9',
    description: 'Ultra-wide format for cinematic content',
    template: '/templates/ultrawide.jpg',
    useCase: 'Cinematic videos, ultrawide monitors, movie posters'
  }
];

const PROMPT_TEMPLATE = `Redraw the content of Figure 1 onto Figure 2, add content to Figure 1 to fit the aspect ratio of Figure 2, completely clear the content of Figure 2, and only retain the aspect ratio of Figure 2.`;

export default function AspectRatioTool() {
  const [selectedTemplate, setSelectedTemplate] = useState<AspectRatioTemplate | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!uploadedImage || !selectedTemplate) return;
    
    setIsProcessing(true);
    // 模拟处理过程
    setTimeout(() => {
      setResultImage('/images/examples/result-1.jpg');
      setIsProcessing(false);
    }, 3000);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(PROMPT_TEMPLATE);
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Nano Banana Aspect Ratio Control Tool",
    "description": "Solve Nano Banana aspect ratio issues with our intelligent control tool. Convert any image to your desired aspect ratio while preserving content quality.",
    "url": "https://nano-banana.run/aspect-ratio-tool",
    "applicationCategory": "DesignApplication",
    "featureList": [
      "Aspect Ratio Control",
      "Content Preservation",
      "Multiple Format Support",
      "Easy-to-use Interface"
    ]
  };

  return (
    <Layout
      title="Nano Banana Aspect Ratio Control Tool - Solve Proportion Issues | Free Online"
      description="Fix Nano Banana aspect ratio problems instantly! Our free tool helps you control image proportions while preserving content quality. Try it now!"
      keywords="nano banana aspect ratio, nano banana proportion control, nano banana ratio fix, image aspect ratio tool, nano banana比例控制, nano banana比例问题"
      structuredData={websiteSchema}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nano Banana Aspect Ratio Control Tool
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Solve Nano Banana's aspect ratio issues and make generated images production-ready
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiCheck className="w-4 h-4 inline mr-2" />
              90%+ Success Rate
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiCheck className="w-4 h-4 inline mr-2" />
              All Common Ratios
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiCheck className="w-4 h-4 inline mr-2" />
              Completely Free
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Do You Need an Aspect Ratio Control Tool?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              While Nano Banana is powerful, it has aspect ratio control issues that prevent generated images from being used directly in production environments. Our tool perfectly solves this problem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FiAlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Problem</h3>
              <p className="text-gray-600">Nano Banana generates images with random aspect ratios, making it impossible to control output dimensions</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <FiInfo className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">Cannot be used for video production, social media publishing, and other production scenarios</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-gray-600">Use our aspect ratio control tool to precisely control output proportions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Use the Aspect Ratio Control Tool
            </h2>
            <p className="text-lg text-gray-600">
              Simple three steps to solve aspect ratio problems
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Upload and Template Selection */}
            <div className="space-y-6">
              {/* Step 1: Upload Image */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Upload Image to Adjust Aspect Ratio
                </h3>
                
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {uploadedImage ? (
                    <div className="space-y-2">
                      <img src={uploadedImage} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                      <p className="text-sm font-medium text-gray-700">✓ Image uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FiUpload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-gray-600">Drag & drop image here or click to upload</p>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Step 2: Select Template */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Select Target Aspect Ratio Template
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {ASPECT_RATIO_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.useCase}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Process */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Generate Adjusted Image
                </h3>
                
                <button
                  onClick={handleProcess}
                  disabled={!uploadedImage || !selectedTemplate || isProcessing}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4 mr-2" />
                      Start Processing
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Instructions and Prompt */}
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-900">
                  <FiInfo className="w-5 h-5 mr-2" />
                  Usage Instructions
                </h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex items-start">
                    <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>Image order is important: original image first, aspect ratio template second</span>
                  </div>
                  <div className="flex items-start">
                    <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>If blue background appears, try a few more times</span>
                  </div>
                  <div className="flex items-start">
                    <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>Recommend using Gemini 2.5 Pro model for better results</span>
                  </div>
                </div>
              </div>

              {/* Prompt Template */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Prompt Template</h3>
                <div className="bg-white rounded-lg p-4 border">
                  <p className="text-sm text-gray-700 font-mono leading-relaxed">
                    {PROMPT_TEMPLATE}
                  </p>
                </div>
                <button
                  onClick={copyPrompt}
                  className="mt-3 flex items-center text-sm text-primary-600 hover:text-primary-800"
                >
                  <FiCopy className="w-4 h-4 mr-1" />
                  Copy Prompt
                </button>
              </div>

              {/* Result Preview */}
              {resultImage && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Processing Result</h3>
                  <div className="space-y-4">
                    <img src={resultImage} alt="Result" className="w-full rounded-lg" />
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary-600 text-white py-2 rounded text-sm font-medium hover:bg-primary-700">
                        <FiDownload className="w-4 h-4 mr-1 inline" />
                        Download Image
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-200">
                        <FiCopy className="w-4 h-4 mr-1 inline" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Why does a blue background appear?</h3>
              <p className="text-gray-600 text-sm">This is a known issue with Nano Banana. Try a few more times to resolve it. We recommend using the Gemini 2.5 Pro model for more stable results.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Can I change the image order?</h3>
              <p className="text-gray-600 text-sm">We don't recommend changing the order. The original image must be placed first, and the aspect ratio template second, to get correct results.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">What image formats are supported?</h3>
              <p className="text-gray-600 text-sm">We support common image formats like JPG, PNG, WEBP, etc. We recommend using high-quality original images for the best results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Using the Aspect Ratio Control Tool
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Solve Nano Banana aspect ratio issues and make generated images production-ready
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/image-editor" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <FiUpload className="w-5 h-5 mr-2" />
              Start Now
            </Link>
            <Link href="/tutorials" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center">
              <FiInfo className="w-5 h-5 mr-2" />
              View Tutorials
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
