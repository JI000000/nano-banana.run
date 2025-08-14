import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <Layout
      title="About Nano-Banana AI | What is Nano-Banana Image Model"
      description="Learn about the Nano-Banana AI image model, its capabilities, history and why it's revolutionizing AI image editing with precise text replacement and scene transformations."
      keywords="nano-banana about, what is nano-banana, nano-banana AI history, nano-banana capabilities"
    >
      {/* Hero */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Nano-Banana</h1>
            <p className="text-xl text-gray-600 mb-6">
              The revolutionary AI image editing model changing how we transform visual content
            </p>
          </div>
        </div>
      </section>
      
      {/* What is Nano-Banana */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Nano-Banana?</h2>
              <p className="text-lg text-gray-700 mb-4">
                Nano-Banana is a cutting-edge AI image editing model that specializes in precise text replacement, scene transformations, and style-matched editing. It represents a significant advancement over previous image models with its ability to maintain context and coherence when making edits.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                First appearing on the LMarena platform in August 2025, Nano-Banana quickly gained attention for its exceptional capabilities in preserving original elements while making targeted changes to images.
              </p>
              <p className="text-lg text-gray-700">
                What sets Nano-Banana apart is its uncanny ability to understand image context and maintain visual coherence across edits that would force other models to completely regenerate content.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gray-800 text-center flex items-center justify-center text-white">
                [Placeholder for Nano-Banana image]
              </div>
            </div>
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
              <div className="absolute inset-0 bg-gray-800 text-center flex items-center justify-center text-white">
                [Placeholder for users image]
              </div>
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
              <Link href="/examples" className="btn border border-white text-white hover:bg-primary-600/30 px-8 py-3 rounded-md font-medium">
                View Examples
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
