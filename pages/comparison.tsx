import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheck, FiMinus, FiInfo } from 'react-icons/fi';
import OptimizedComparisonCard from '../components/OptimizedComparisonCard';
import LazyImage from '../components/LazyImage';

// Feature comparison interface
interface FeatureComparison {
  feature: string;
  nanoBanana: {
    supported: boolean | 'partial';
    notes?: string;
  };
  fluxKontext: {
    supported: boolean | 'partial';
    notes?: string;
  };
  dalleE: {
    supported: boolean | 'partial';
    notes?: string;
  };
  midjourney: {
    supported: boolean | 'partial';
    notes?: string;
  };
}

// Performance comparison interface
interface PerformanceComparison {
  category: string;
  description: string;
  nanoBananaScore: number;
  fluxKontextScore: number;
  dallEScore: number;
  midjourneyScore: number;
}

export default function Comparison() {
  // Feature comparison data
  const featureComparisons: FeatureComparison[] = [
    {
      feature: 'Precise Text Replacement',
      nanoBanana: { supported: true },
      fluxKontext: { supported: 'partial', notes: 'Often alters surrounding elements' },
      dalleE: { supported: 'partial', notes: 'Limited preservation of background details' },
      midjourney: { supported: false },
    },
    {
      feature: 'Scene Transformation',
      nanoBanana: { supported: true },
      fluxKontext: { supported: true },
      dalleE: { supported: true },
      midjourney: { supported: 'partial', notes: 'Requires specific workflow' },
    },
    {
      feature: 'Style Matching',
      nanoBanana: { supported: true },
      fluxKontext: { supported: 'partial', notes: 'Inconsistent results' },
      dalleE: { supported: 'partial', notes: 'Often changes original style' },
      midjourney: { supported: true },
    },
    {
      feature: 'QR Code Preservation',
      nanoBanana: { supported: true },
      fluxKontext: { supported: false },
      dalleE: { supported: false },
      midjourney: { supported: false },
    },
    {
      feature: 'Batch Processing',
      nanoBanana: { supported: true },
      fluxKontext: { supported: 'partial', notes: 'Limited throughput' },
      dalleE: { supported: true },
      midjourney: { supported: false },
    },
    {
      feature: 'API Access',
      nanoBanana: { supported: false, notes: 'Coming soon' },
      fluxKontext: { supported: true },
      dalleE: { supported: true },
      midjourney: { supported: 'partial', notes: 'Limited API' },
    },
  ];
  
  // Performance comparison data
  const performanceComparisons: PerformanceComparison[] = [
    {
      category: 'Text Replacement Accuracy',
      description: 'Ability to replace text while preserving surrounding elements',
      nanoBananaScore: 9.6,
      fluxKontextScore: 7.2,
      dallEScore: 6.8,
      midjourneyScore: 4.5,
    },
    {
      category: 'Scene Transformation Quality',
      description: 'Coherence and realism when changing environments',
      nanoBananaScore: 9.4,
      fluxKontextScore: 8.5,
      dallEScore: 8.8,
      midjourneyScore: 9.0,
    },
    {
      category: 'Style Consistency',
      description: 'Maintaining consistent artistic style across edits',
      nanoBananaScore: 9.6,
      fluxKontextScore: 8.0,
      dallEScore: 7.5,
      midjourneyScore: 9.3,
    },
    {
      category: 'Processing Speed',
      description: 'Time to generate results',
      nanoBananaScore: 9.5,
      fluxKontextScore: 8.5,
      dallEScore: 7.0,
      midjourneyScore: 6.5,
    },
    {
      category: 'Detail Preservation',
      description: 'Maintaining fine details from the original image',
      nanoBananaScore: 9.5,
      fluxKontextScore: 7.8,
      dallEScore: 8.2,
      midjourneyScore: 8.0,
    },
  ];

  // Helper function to render feature support
  const renderFeatureSupport = (supported: boolean | 'partial', notes?: string) => {
    if (supported === true) {
      return (
        <div className="flex items-center">
          <FiCheck className="text-green-500 h-5 w-5" />
          <span className="sr-only">Supported</span>
        </div>
      );
    } else if (supported === 'partial') {
      return (
        <div className="flex items-center group relative">
          <FiMinus className="text-yellow-500 h-5 w-5" />
          {notes && (
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 bg-white shadow-lg rounded-lg p-3 text-sm text-gray-700 z-10">
              {notes}
            </div>
          )}
          <span className="sr-only">Partially Supported</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <svg className="text-red-500 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Not Supported</span>
        </div>
      );
    }
  };

  return (
    <Layout
      title="Nano-Banana vs Other AI Image Models | Detailed Comparison"
      description="Compare Nano-Banana with FLUX Kontext, DALL-E, and Midjourney. See how it outperforms in text replacement, scene transformations, and style consistency."
      keywords="nano-banana comparison, AI model comparison, flux kontext vs nano-banana, dall-e vs nano-banana, midjourney vs nano-banana"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Model Comparison</h1>
            <p className="text-xl text-primary-50">
              See how Nano-Banana stacks up against other leading AI image models
            </p>
          </div>
        </div>
      </section>
      
      {/* Overview */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">At a Glance</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-12">
              <div className="px-6 py-8">
                <p className="text-lg text-gray-700 mb-6">
                  While all of these AI models offer impressive image editing capabilities, Nano-Banana excels in several key areas that set it apart from competitors:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Superior Text Replacement</h3>
                      <p className="mt-2 text-gray-600">
                        Unique ability to replace text while preserving surrounding elements down to the pixel level.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Exceptional Detail Preservation</h3>
                      <p className="mt-2 text-gray-600">
                        Maintains fine details that other models often lose or alter during the editing process.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Enhanced Style Matching</h3>
                      <p className="mt-2 text-gray-600">
                        Better at matching artistic styles when adding new elements or transforming scenes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Faster Processing</h3>
                      <p className="mt-2 text-gray-600">
                        Delivers high-quality results with lower latency compared to most competitors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Comparison */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nano-Banana
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FLUX Kontext
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DALL-E 3
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Midjourney
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {featureComparisons.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {renderFeatureSupport(item.nanoBanana.supported, item.nanoBanana.notes)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {renderFeatureSupport(item.fluxKontext.supported, item.fluxKontext.notes)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {renderFeatureSupport(item.dalleE.supported, item.dalleE.notes)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {renderFeatureSupport(item.midjourney.supported, item.midjourney.notes)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
            <FiInfo className="mr-2" />
            <span>Hover over partial support icons for additional notes</span>
          </div>
        </div>
      </section>
      
      {/* Performance Comparison */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Performance Comparison</h2>
          
          <div className="max-w-5xl mx-auto">
            {performanceComparisons.map((item, index) => (
              <div key={index} className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-primary-600 mr-1"></span>
                      <span className="text-xs text-gray-600">Nano-Banana</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-gray-500 mr-1"></span>
                      <span className="text-xs text-gray-600">FLUX Kontext</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                      <span className="text-xs text-gray-600">DALL-E</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-xs text-gray-600">Midjourney</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${item.nanoBananaScore * 10}%` }}></div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${item.fluxKontextScore * 10}%` }}></div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${item.dallEScore * 10}%` }}></div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${item.midjourneyScore * 10}%` }}></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <div>0</div>
                  <div>2</div>
                  <div>4</div>
                  <div>6</div>
                  <div>8</div>
                  <div>10</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Visual Comparison */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Visual Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Text Replacement Comparison */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Text Replacement</h3>
                <p className="text-gray-700 mb-4">
                  Changing magazine title from "VOGUE" to "BAZAAR" while preserving all other elements.
                </p>
              </div>
              
              <div className="relative h-80 w-full">
                <LazyImage
                  src="/images/comparison/text-replacement-comparison.jpg"
                  alt="Text replacement comparison between Nano-Banana and competitors"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Note how Nano-Banana preserves the QR code and subtle design elements that other models alter.
                </p>
              </div>
            </div>
            
            {/* Scene Transformation Comparison */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scene Transformation</h3>
                <p className="text-gray-700 mb-4">
                  Transforming a beach scene to a snowy mountain landscape while preserving the subject.
                </p>
              </div>
              
              <div className="relative h-80 w-full">
                <LazyImage
                  src="/images/comparison/scene-transformation-comparison.jpg"
                  alt="Scene transformation comparison between Nano-Banana and competitors"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Observe how Nano-Banana maintains the exact pose, expression and details of the subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Summary */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Verdict</h2>
            
            <p className="text-lg text-gray-700 mb-8">
              While each AI model has its strengths, Nano-Banana demonstrates clear advantages in text replacement accuracy, detail preservation, and style consistency. For professional workflows requiring precise edits and high-quality results, Nano-Banana provides the most reliable and consistent performance.
            </p>
            
            <Link href="/tutorials/getting-started" className="btn btn-primary">
              Try Nano-Banana Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': 'https://nano-banana.run/comparison'
            },
            'headline': 'Nano-Banana vs Other AI Image Models: Detailed Comparison',
            'description': 'Compare Nano-Banana with FLUX Kontext, DALL-E, and Midjourney. See how it outperforms in text replacement, scene transformations, and style consistency.',
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
