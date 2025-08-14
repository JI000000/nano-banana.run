import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FiFilter, FiX, FiZoomIn } from 'react-icons/fi';

// Example type definition
interface Example {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  prompt: string;
  category: string;
}

// Example data
const examples: Example[] = [
  {
    id: 'text-replacement-1',
    title: 'Magazine Cover Text Change',
    description: 'Changing the magazine title while preserving the exact layout, design elements, and even QR codes.',
    beforeImage: '/images/examples/text-replacement-before.jpg',
    afterImage: '/images/examples/text-replacement-after.jpg',
    prompt: 'Replace the text "VOGUE" with "BAZAAR" while preserving all other elements exactly as they are',
    category: 'Text Replacement',
  },
  {
    id: 'scene-transformation-1',
    title: 'Summer Beach to Winter Mountain',
    description: 'Transforming a summer beach scene to a winter mountain landscape while keeping the subject unchanged.',
    beforeImage: '/images/examples/scene-transformation-before.jpg',
    afterImage: '/images/examples/scene-transformation-after.jpg',
    prompt: 'Transform the scene into a snowy mountain landscape with the character in the same position and pose',
    category: 'Scene Transformation',
  },
  {
    id: 'style-matching-1',
    title: 'Cyberpunk Street Scene',
    description: 'Adding a cyberpunk street background while maintaining consistent artistic style with the character.',
    beforeImage: '/images/examples/style-matching-before.jpg',
    afterImage: '/images/examples/style-matching-after.jpg',
    prompt: 'Character in a cyberpunk style rainy night street scene with neon lights',
    category: 'Style Matching',
  },
  {
    id: 'product-placement-1',
    title: 'Product in New Environment',
    description: 'Placing a product in a completely different setting while maintaining lighting consistency.',
    beforeImage: '/images/examples/product-placement-before.jpg',
    afterImage: '/images/examples/product-placement-after.jpg',
    prompt: 'Place this product on a wooden table in a rustic cabin with warm lighting',
    category: 'Product Photography',
  },
  {
    id: 'weather-change-1',
    title: 'Weather Transformation',
    description: 'Changing the weather in a landscape from clear to stormy while maintaining scene integrity.',
    beforeImage: '/images/examples/weather-change-before.jpg',
    afterImage: '/images/examples/weather-change-after.jpg',
    prompt: 'Transform the weather to a dramatic stormy scene with dark clouds and lightning',
    category: 'Scene Transformation',
  },
  {
    id: 'style-matching-2',
    title: 'Digital Art to Watercolor',
    description: 'Converting digital art style to watercolor while preserving subject composition.',
    beforeImage: '/images/examples/style-matching-2-before.jpg',
    afterImage: '/images/examples/style-matching-2-after.jpg',
    prompt: 'Convert this image to watercolor painting style while maintaining the composition',
    category: 'Style Matching',
  },
];

export default function Examples() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  
  // Filter state
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(examples.map(ex => ex.category)))];
  
  // Filter examples
  const filteredExamples = examples.filter(example => {
    return activeCategory === 'All' || example.category === activeCategory;
  });
  
  // Open modal
  const openModal = (example: Example) => {
    setSelectedExample(example);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Layout
      title="Nano-Banana AI Examples | See What's Possible"
      description="Explore real-world examples of Nano-Banana AI image editing, including text replacement, scene transformations, and style matching."
      keywords="nano-banana examples, AI image editing examples, before after AI, text replacement examples, scene transformation examples"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Nano-Banana Examples</h1>
            <p className="text-xl text-primary-50">
              See what's possible with the Nano-Banana AI image editing model
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section">
        <div className="container">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-6">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <span className="font-medium text-gray-700">Categories</span>
              {isFilterOpen ? <FiX /> : <FiFilter />}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - always visible on desktop, toggleable on mobile */}
            <div className={`md:w-1/4 lg:w-1/5 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block w-full text-left px-2 py-1 rounded ${
                        activeCategory === category
                          ? 'bg-primary-100 text-primary-800 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Examples Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExamples.map((example) => (
                  <div key={example.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    {/* Before/After Images */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gray-800 text-center flex items-center justify-center text-white">
                        [Placeholder for Before/After image]
                      </div>
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          onClick={() => openModal(example)}
                          className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white"
                        >
                          <FiZoomIn className="h-5 w-5 text-gray-800" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent text-white p-4">
                        <h3 className="font-semibold">{example.title}</h3>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {example.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{example.description}</p>
                      
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-gray-900">Prompt:</span> {example.prompt}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => openModal(example)}
                        className="mt-4 text-primary-600 font-medium hover:text-primary-800 text-sm inline-flex items-center"
                      >
                        View Details
                        <FiZoomIn className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredExamples.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No examples match the selected category.</p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="mt-4 text-primary-600 hover:text-primary-800"
                  >
                    View all examples
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Try It Yourself?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Start creating your own amazing image edits with Nano-Banana
            </p>
            <Link href="/tutorials/getting-started" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Modal */}
      {isModalOpen && selectedExample && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={closeModal}
            ></div>
            
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2" id="modal-title">
                      {selectedExample.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6">
                      {selectedExample.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Before</h4>
                        <div className="relative h-64 md:h-80 w-full rounded overflow-hidden">
                          <div className="absolute inset-0 bg-gray-800 text-center flex items-center justify-center text-white">
                            [Placeholder for Before image]
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">After</h4>
                        <div className="relative h-64 md:h-80 w-full rounded overflow-hidden">
                          <div className="absolute inset-0 bg-gray-800 text-center flex items-center justify-center text-white">
                            [Placeholder for After image]
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Prompt Used</h4>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-gray-800 font-mono">{selectedExample.prompt}</p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Try It Yourself</h4>
                    <p className="text-gray-700 mb-4">
                      Follow our tutorials to learn how to create similar effects with your own images.
                    </p>
                    
                    <div className="flex space-x-4">
                      <Link 
                        href="/tutorials" 
                        className="btn btn-primary"
                        onClick={closeModal}
                      >
                        Browse Tutorials
                      </Link>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'itemListElement': examples.map((example, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'item': {
                '@type': 'ImageObject',
                'name': example.title,
                'description': example.description,
                'url': `https://nano-banana.run/examples#${example.id}`
              }
            }))
          })
        }}
      />
    </Layout>
  );
}
