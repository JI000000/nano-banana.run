import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function TextReplacementTutorial() {
  const tutorialMeta = {
    title: 'Advanced Text Replacement Techniques with Nano Banana',
    description: 'Master text replacement in any image with Nano Banana. Learn to replace text while preserving fonts, styles, and backgrounds perfectly.',
    publishDate: 'August 26, 2025',
    author: 'Nano Banana Team',
    readTime: 12,
    category: 'Text Editing',
    difficulty: 'Intermediate',
  };

  return (
    <Layout
      title={`${tutorialMeta.title} | Nano Banana Tutorial`}
      description={tutorialMeta.description}
      keywords="nano banana text replacement, nano banana tutorial, text editing, font replacement, nano banana examples, nano banana prompt"
    >
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/tutorials" className="inline-flex items-center text-primary-50 hover:text-white mb-4">
              <FiArrowLeft className="mr-2" />
              <span>Back to Tutorials</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{tutorialMeta.title}</h1>
            <p className="text-xl text-primary-50 mb-6">{tutorialMeta.description}</p>
            
            <div className="flex flex-wrap items-center text-sm text-primary-50 gap-4 md:gap-6">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>{tutorialMeta.publishDate}</span>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>{tutorialMeta.author}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                <span>{tutorialMeta.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <FiTag className="mr-2" />
                <span>{tutorialMeta.category}</span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 text-xs font-medium">
                {tutorialMeta.difficulty}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction to Text Replacement</h2>
              <p className="text-lg text-gray-700 mb-4">
                Text replacement is one of Nano Banana's most powerful capabilities. Unlike other AI models, Nano Banana excels at making targeted text changes while preserving the original context, fonts, lighting, and background elements.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This tutorial teaches advanced techniques for perfect text replacement across various scenarios.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Techniques:</h3>
                <ul className="space-y-2">
                  <li className="text-gray-700">• Use exact text matches in quotes: "Replace 'Old Text' with 'New Text'"</li>
                  <li className="text-gray-700">• Specify preservation instructions: "while keeping the background exactly the same"</li>
                  <li className="text-gray-700">• Use high-resolution source images for best results</li>
                  <li className="text-gray-700">• Be specific about what to preserve</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Prompts</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Business Sign:</strong></p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">Replace "123 Main Street" with "456 Oak Avenue" while keeping the business name and sign design identical</code>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Product Label:</strong></p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">Replace "Original Flavor" with "New Flavor" on the product label while preserving all other text and design elements</code>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <Link href="/tutorials/getting-started" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <FiArrowLeft className="mr-2" />
                <span>Previous: Getting Started</span>
              </Link>
              <Link href="/tutorials/scene-transformation" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <span>Next: Scene Transformation</span>
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}