import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiCheckCircle, FiCopy, FiArrowRight, FiClock, FiDollarSign, FiUsers, FiStar, FiAlertCircle } from 'react-icons/fi';

interface PlatformInfo {
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  steps: string[];
  pros: string[];
  cons: string[];
  pricing: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToSetup: string;
}

const PLATFORMS: PlatformInfo[] = [
  {
    name: 'Google AI Studio',
    description: 'Official Google platform for accessing Nano Banana',
    url: 'https://aistudio.google.com',
    icon: 'G',
    color: 'blue',
    steps: [
      'Visit Google AI Studio',
      'Sign in with your Google account',
      'Navigate to the Gemini section',
      'Look for "Nano Banana" or "Gemini 2.5 Flash Image"',
      'Upload your image and start editing'
    ],
    pros: [
      'Official Google platform',
      'Free to use',
      'High quality results',
      'Integrated with Google services'
    ],
    cons: [
      'May have usage limits',
      'Requires Google account',
      'Interface can be complex'
    ],
    pricing: 'Free',
    difficulty: 'Easy',
    timeToSetup: '2-3 minutes'
  },
  {
    name: 'LMarena',
    description: 'Community platform for testing AI models',
    url: 'https://lmarena.ai',
    icon: 'L',
    color: 'green',
    steps: [
      'Visit LMarena website',
      'Create an account or sign in',
      'Search for "Nano Banana" in the models',
      'Select the model and start testing',
      'Upload image and enter your prompt'
    ],
    pros: [
      'Easy to use interface',
      'Community features',
      'Model comparison tools',
      'Free access'
    ],
    cons: [
      'May have queue times',
      'Limited customization',
      'Community-driven platform'
    ],
    pricing: 'Free',
    difficulty: 'Easy',
    timeToSetup: '1-2 minutes'
  },
  {
    name: 'Gemini',
    description: 'Google\'s AI assistant with image editing capabilities',
    url: 'https://gemini.google.com',
    icon: 'G',
    color: 'purple',
    steps: [
      'Go to Gemini website',
      'Sign in with Google account',
      'Upload an image to chat',
      'Ask Gemini to edit the image',
      'Specify your editing requirements'
    ],
    pros: [
      'Conversational interface',
      'Integrated with Google ecosystem',
      'Natural language processing',
      'Free to use'
    ],
    cons: [
      'Less direct control',
      'May not have all features',
      'Conversational limitations'
    ],
    pricing: 'Free',
    difficulty: 'Medium',
    timeToSetup: '3-5 minutes'
  }
];

export default function About() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformInfo | null>(null);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        icon: 'bg-blue-600',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'from-green-50 to-green-100',
        border: 'border-green-200',
        icon: 'bg-green-600',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'from-purple-50 to-purple-100',
        border: 'border-purple-200',
        icon: 'bg-purple-600',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Layout
      title="What is Nano Banana? Complete Guide to Google's AI Image Editor 2025"
      description="What is Nano Banana? Learn about Google's revolutionary AI image editing model (Gemini 2.5 Flash Image). Discover how to use nano banana, access nano banana free, and why nano banana vs flux kontext comparison shows superior results. Complete guide to nano banana tutorial, nano banana api, and nano banana examples."
      keywords="what is nano banana, nano banana是什么, how to use nano banana, nano banana tutorial, nano banana free, nano banana google, google nano banana, nano banana gemini, gemini nano banana, nano banana ai studio, google ai studio nano banana, nano banana lmarena, lmarena nano banana, nano banana vs flux kontext, nano banana vs midjourney, nano banana comparison, nano banana examples, nano banana prompt, nano banana api, nano banana access, nano banana open source, nano banana github, nano banana reddit, reddit nano banana, nano banana review, nano banana capabilities, nano banana features, nano banana 2025, nano banana latest, nano banana model, nano banana ai, nano banana image editing, nano banana scene transformation, nano banana text replacement, nano banana 使い方, nano banana使用方法, nano banana 無料, nano banana教学, nano banana exampies"
    >
      {/* Hero */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto mb-6">
              <p className="text-sm text-green-800">
                <strong>🔥 Trending:</strong> Nano Banana is now the most discussed AI image editing tool on Reddit and Twitter, 
                with users reporting 40% better results than competing models.
              </p>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">What is Nano Banana? About Nano-Banana AI</h1>
            <p className="text-xl text-gray-600 mb-8">
              Google's revolutionary AI image editing model (Gemini 2.5 Flash Image) that's changing how we transform visual content. 
              Superior performance over competing models - the #1 choice for image editing in 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/image-editor" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Try Nano Banana Free
                <FiArrowRight className="ml-2" />
              </Link>
              <Link href="/tutorials" className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Learn How to Use
              </Link>
            </div>
            
            {/* Additional Links to New Pages */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/nano-banana-vs-flux-kontext" className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm">
                Nano Banana vs Flux Kontext
              </Link>
              <Link href="/nano-banana-api" className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                API Documentation
              </Link>
              <Link href="/showcase" className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                View Examples
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to Access Nano Banana - Move this up */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Access Nano Banana</h2>
              <p className="text-xl text-gray-600">
                Choose the platform that best fits your needs and experience level
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {PLATFORMS.map((platform, index) => {
                const colors = getColorClasses(platform.color);
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                      selectedPlatform?.name === platform.name ? 'border-primary-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    <div className={`bg-gradient-to-br ${colors.bg} p-6 rounded-t-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">{platform.icon}</span>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            platform.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            platform.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {platform.difficulty}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{platform.name}</h3>
                      <p className="text-gray-600 mb-4">{platform.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <FiClock className="w-4 h-4 mr-1" />
                          {platform.timeToSetup}
                        </div>
                        <div className="flex items-center">
                          <FiDollarSign className="w-4 h-4 mr-1" />
                          {platform.pricing}
                        </div>
                      </div>

                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-2 ${colors.button} text-white rounded-lg hover:shadow-md transition-all`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink className="w-4 h-4 mr-2" />
                        Visit Platform
                      </a>
                    </div>

                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Pros & Cons</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center text-sm text-green-600 mb-1">
                            <FiCheckCircle className="w-4 h-4 mr-1" />
                            <span className="font-medium">Pros</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {platform.pros.slice(0, 2).map((pro, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-red-600 mb-1">
                            <FiAlertCircle className="w-4 h-4 mr-1" />
                            <span className="font-medium">Cons</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {platform.cons.slice(0, 2).map((con, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Guide */}
            {selectedPlatform && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedPlatform.name} Setup Guide
                  </h3>
                  <p className="text-gray-600">
                    Follow these steps to get started with Nano Banana on {selectedPlatform.name}
                  </p>
                </div>

                <div className="space-y-6">
                  {selectedPlatform.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-2">{step}</p>
                        <button
                          onClick={() => copyToClipboard(step, index)}
                          className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          <FiCopy className="w-4 h-4 mr-1" />
                          {copiedStep === index ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Advantages</h4>
                      <ul className="space-y-2">
                        {selectedPlatform.pros.map((pro, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations</h4>
                      <ul className="space-y-2">
                        {selectedPlatform.cons.map((con, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <FiAlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Key Capabilities */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Precise Text Replacement</h3>
              <p className="text-gray-700">
                Replace any text in an image while preserving the exact background, formatting, and surrounding elements. Even complex elements like QR codes remain intact when only the text is changed.
              </p>
            </div>
            
            {/* Capability 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scene Transformation</h3>
              <p className="text-gray-700">
                Transform entire environments while keeping subjects intact. Change day to night, summer to winter, or indoor to outdoor settings with remarkable consistency in lighting, perspective, and physics.
              </p>
            </div>
            
            {/* Capability 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Style Matching</h3>
              <p className="text-gray-700">
                Generate new content that perfectly matches the artistic style, brush strokes, and visual characteristics of the original image, creating a seamless blend between original and generated elements.
              </p>
            </div>
            
            {/* Capability 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Element Preservation</h3>
              <p className="text-gray-700">
                Make specific edits without affecting other parts of the image. Watermarks, timestamps, logos, and other details remain perfectly preserved during the editing process.
              </p>
            </div>
            
            {/* Capability 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rapid Processing</h3>
              <p className="text-gray-700">
                Generate high-quality edits in seconds, making it suitable for both individual projects and batch processing workflows requiring multiple image transformations.
              </p>
            </div>
            
            {/* Capability 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contextual Understanding</h3>
              <p className="text-gray-700">
                The model demonstrates an advanced understanding of image context, allowing it to make edits that respect the physics, lighting, and artistic intent of the original image.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who Should Use Nano-Banana */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/about/creative-professionals.jpg"
                alt="Creative professionals using Nano Banana for image editing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Should Use Nano-Banana?</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">
                    <strong className="font-medium text-gray-900">Designers & Creative Professionals</strong> who need to quickly iterate on visual concepts or make specific adjustments to their work.
                  </span>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">
                    <strong className="font-medium text-gray-900">E-commerce Businesses</strong> looking to efficiently generate product images in various settings without reshooting.
                  </span>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">
                    <strong className="font-medium text-gray-900">Marketing Teams</strong> that need to create multiple versions of visual assets adapted for different campaigns or audiences.
                  </span>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">
                    <strong className="font-medium text-gray-900">Content Creators</strong> who want to adapt visuals for different platforms while maintaining a consistent brand identity.
                  </span>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-gray-700">
                    <strong className="font-medium text-gray-900">Developers</strong> looking to integrate advanced image editing capabilities into their applications or workflows.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Updates & Community Insights */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates & Community Insights</h2>
              <p className="text-lg text-gray-700">
                Stay informed about the latest Nano Banana developments and what the community is discussing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiStar className="w-5 h-5 text-blue-600 mr-2" />
                  Official Updates (September 2025)
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Google AI Studio Integration:</strong> Full access to Nano Banana through official Google platform</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Enhanced Character Consistency:</strong> Improved face preservation across multiple edits</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Multi-Image Support:</strong> Process multiple images simultaneously for batch editing</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>API Access:</strong> Developer-friendly API for integration into custom workflows</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiUsers className="w-5 h-5 text-green-600 mr-2" />
                  Community Hot Topics
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>vs Flux Kontext:</strong> Users consistently report better results with Nano Banana</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Text Replacement:</strong> Superior accuracy in preserving fonts and layouts</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Free Access:</strong> No cost barriers compared to premium AI tools</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Learning Curve:</strong> Intuitive interface suitable for beginners and professionals</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-purple-600 mr-2" />
                Frequently Asked Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Is Nano Banana really free?</h4>
                  <p className="text-sm text-gray-600">Yes, Nano Banana is completely free to use through Google AI Studio and Gemini. No subscription or credit card required.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How does it compare to Midjourney?</h4>
                  <p className="text-sm text-gray-600">Nano Banana excels at editing existing images, while Midjourney is better for generating new images from scratch.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I use it commercially?</h4>
                  <p className="text-sm text-gray-600">Yes, Google's terms allow commercial use of Nano Banana-generated content with proper attribution.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h4>
                  <p className="text-sm text-gray-600">Supports JPG, PNG, WebP, and GIF formats. Output is typically in high-quality JPG or PNG.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions - Move this up and consolidate */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-700">
                Everything you need to know about Nano Banana
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">General Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Is Nano Banana really free?</h4>
                    <p className="text-sm text-gray-600">Yes, Nano Banana is completely free to use through Google AI Studio and Gemini. No subscription or credit card required.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What is Nano Banana?</h4>
                    <p className="text-sm text-gray-600">Nano Banana is Google's advanced AI image editing model, also known as Gemini 2.5 Flash Image. It specializes in precise text replacement, scene transformations, and style-matched editing.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Can I use it commercially?</h4>
                    <p className="text-sm text-gray-600">Yes, Google's terms allow commercial use of Nano Banana-generated content with proper attribution.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How does it compare to Midjourney?</h4>
                    <p className="text-sm text-gray-600">Nano Banana excels at editing existing images, while Midjourney is better for generating new images from scratch.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h4>
                    <p className="text-sm text-gray-600">Supports JPG, PNG, WebP, and GIF formats. Output is typically in high-quality JPG or PNG.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How accurate is it?</h4>
                    <p className="text-sm text-gray-600">Nano Banana achieves 99.2% character consistency accuracy and is 40% more accurate than Flux Kontext for text replacement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="section bg-primary-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Nano-Banana?</h2>
            <p className="text-xl text-primary-50 mb-8">
              Start exploring our tutorials and examples to see how Nano-Banana can transform your creative workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutorials" className="btn bg-white text-primary-900 hover:bg-primary-50 px-8 py-3 rounded-md font-medium">
                Browse Tutorials
              </Link>
              <Link href="/showcase" className="btn border border-white text-white hover:bg-primary-600/30 px-8 py-3 rounded-md font-medium">
                View Showcase
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Schema.org article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': 'https://nano-banana.run/about'
            },
            'headline': 'About Nano-Banana AI Image Model',
            'description': 'Learn about the Nano-Banana AI image model, its capabilities, history and why it is revolutionizing AI image editing.',
            'author': {
              '@type': 'Organization',
              'name': 'Nano-Banana.Run'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Nano-Banana.Run',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://nano-banana.run/logo.png'
              }
            },
            'datePublished': '2025-08-14',
            'dateModified': '2025-08-14'
          })
        }}
      />
    </Layout>
  );
}
