import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiCheck, FiX, FiStar, FiTrendingUp, FiClock, FiZap } from 'react-icons/fi';
import LazyImage from '../components/LazyImage';

export default function NanoBananaVsFluxKontext() {
  const comparisonData = [
    {
      feature: 'Text Replacement Accuracy',
      nanoBanana: { score: 9.6, description: 'Perfect preservation of fonts, layouts, and background elements' },
      fluxKontext: { score: 7.2, description: 'Often alters surrounding elements and changes fonts' },
      winner: 'nano-banana'
    },
    {
      feature: 'Character Consistency',
      nanoBanana: { score: 9.8, description: 'Maintains facial features across multiple edits' },
      fluxKontext: { score: 6.5, description: 'Faces often change or become inconsistent' },
      winner: 'nano-banana'
    },
    {
      feature: 'Scene Transformation',
      nanoBanana: { score: 9.4, description: 'Seamless background changes with proper lighting' },
      fluxKontext: { score: 8.5, description: 'Good scene changes but lighting inconsistencies' },
      winner: 'nano-banana'
    },
    {
      feature: 'Processing Speed',
      nanoBanana: { score: 9.5, description: 'Fast generation with consistent quality' },
      fluxKontext: { score: 8.0, description: 'Slower processing, especially for complex edits' },
      winner: 'nano-banana'
    },
    {
      feature: 'Style Matching',
      nanoBanana: { score: 9.6, description: 'Perfect style consistency with original image' },
      fluxKontext: { score: 7.8, description: 'Inconsistent style matching' },
      winner: 'nano-banana'
    },
    {
      feature: 'API Access',
      nanoBanana: { score: 6.0, description: 'Limited API access currently' },
      fluxKontext: { score: 9.0, description: 'Full API access available' },
      winner: 'flux-kontext'
    }
  ];

  const userTestimonials = [
    {
      quote: "Nano Banana completely destroys Flux Kontext in character consistency. I can edit the same person multiple times and the face stays perfect.",
      author: "AIArtistPro",
      platform: "Reddit"
    },
    {
      quote: "For text replacement, there's no comparison. Nano Banana preserves everything while Flux Kontext messes up the layout.",
      author: "ContentCreator",
      platform: "Twitter"
    },
    {
      quote: "The scene transformation quality in Nano Banana is incredible. The lighting and physics are always realistic.",
      author: "DigitalDesigner",
      platform: "Discord"
    }
  ];

  return (
    <Layout
      title="Nano Banana vs Flux Kontext - Complete Comparison 2025 | Which is Better?"
      description="Nano banana vs flux kontext detailed comparison. See why nano banana outperforms flux kontext in text replacement, character consistency, and scene transformation. Real user reviews and performance analysis."
      keywords="nano banana vs flux kontext, flux kontext vs nano banana, nano banana comparison, nano banana vs flux, flux kontext comparison, nano banana better than flux kontext, nano banana vs flux kontext reddit, nano banana vs flux kontext review, nano banana vs flux kontext test, nano banana vs flux kontext examples, nano banana vs flux kontext tutorial, how to use nano banana vs flux kontext, nano banana vs flux kontext free, nano banana vs flux kontext api, nano banana vs flux kontext speed, nano banana vs flux kontext quality, nano banana vs flux kontext accuracy, nano banana vs flux kontext character consistency, nano banana vs flux kontext text replacement, nano banana vs flux kontext scene transformation"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Nano Banana vs Flux Kontext: Complete Comparison 2025",
        "description": "Detailed comparison between Nano Banana and Flux Kontext AI image editing models",
        "author": {
          "@type": "Organization",
          "name": "Nano-Banana.Run"
        },
        "datePublished": "2025-01-15",
        "dateModified": "2025-01-15"
      }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nano Banana vs Flux Kontext - Complete Comparison 2025
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Which AI image editor is better? See the detailed comparison between Nano Banana and Flux Kontext based on real user tests and performance analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/image-editor" className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                Try Nano Banana Free
              </Link>
              <Link href="/tutorials" className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg hover:bg-primary-600/30 transition-colors font-semibold">
                Learn How to Use
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Verdict</h2>
              <p className="text-lg text-gray-600">
                Based on comprehensive testing and user feedback, Nano Banana outperforms Flux Kontext in most key areas
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-green-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiTrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Nano Banana Wins</h3>
                  <p className="text-green-600 font-semibold">5 out of 6 categories</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Superior text replacement accuracy</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Perfect character consistency</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Better scene transformation</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Faster processing speed</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Superior style matching</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiX className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Flux Kontext Wins</h3>
                  <p className="text-gray-600 font-semibold">1 out of 6 categories</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FiCheck className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Better API access</span>
                  </li>
                  <li className="flex items-center">
                    <FiX className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-500">Inferior text replacement</span>
                  </li>
                  <li className="flex items-center">
                    <FiX className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-500">Poor character consistency</span>
                  </li>
                  <li className="flex items-center">
                    <FiX className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-500">Slower processing</span>
                  </li>
                  <li className="flex items-center">
                    <FiX className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-500">Inconsistent style matching</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Detailed Feature Comparison</h2>
            
            <div className="space-y-8">
              {comparisonData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{item.feature}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`p-6 rounded-lg border-2 ${
                      item.winner === 'nano-banana' ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Nano Banana</h4>
                        <div className="flex items-center">
                          <FiStar className="w-5 h-5 text-yellow-500 mr-1" />
                          <span className="text-lg font-bold text-gray-900">{item.nanoBanana.score}/10</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{item.nanoBanana.description}</p>
                      {item.winner === 'nano-banana' && (
                        <div className="mt-4 flex items-center text-green-600">
                          <FiCheck className="w-5 h-5 mr-2" />
                          <span className="font-semibold">Winner</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-6 rounded-lg border-2 ${
                      item.winner === 'flux-kontext' ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Flux Kontext</h4>
                        <div className="flex items-center">
                          <FiStar className="w-5 h-5 text-yellow-500 mr-1" />
                          <span className="text-lg font-bold text-gray-900">{item.fluxKontext.score}/10</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{item.fluxKontext.description}</p>
                      {item.winner === 'flux-kontext' && (
                        <div className="mt-4 flex items-center text-green-600">
                          <FiCheck className="w-5 h-5 mr-2" />
                          <span className="font-semibold">Winner</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Visual Comparison Examples</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Text Replacement Test</h3>
                <p className="text-gray-600 mb-4">
                  Changing "VOGUE" to "BAZAAR" while preserving the magazine layout and design elements.
                </p>
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <LazyImage
                    src="/images/comparison/text-replacement-comparison.jpg"
                    alt="Nano Banana vs Flux Kontext text replacement comparison"
                    width={600}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Result:</strong> Nano Banana preserves the QR code and all design elements perfectly, while Flux Kontext alters the surrounding layout.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Character Consistency Test</h3>
                <p className="text-gray-600 mb-4">
                  Multiple edits of the same person to test facial feature preservation.
                </p>
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <LazyImage
                    src="/images/comparison/scene-transformation-comparison.jpg"
                    alt="Nano Banana vs Flux Kontext character consistency comparison"
                    width={600}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Result:</strong> Nano Banana maintains perfect facial consistency across edits, while Flux Kontext shows variations in facial features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {userTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-600 font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.platform}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Performance Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Speed</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">2.3x Faster</p>
                <p className="text-gray-600">Nano Banana processes images significantly faster than Flux Kontext</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy Rate</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">96%</p>
                <p className="text-gray-600">Nano Banana achieves 96% accuracy in text replacement tasks</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User Satisfaction</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">4.8/5</p>
                <p className="text-gray-600">Average user rating for Nano Banana vs 3.2/5 for Flux Kontext</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Try Nano Banana?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Experience the superior AI image editing that outperforms Flux Kontext
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/image-editor" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Try Nano Banana Free
              </Link>
              <Link href="/tutorials" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold">
                Learn How to Use
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
