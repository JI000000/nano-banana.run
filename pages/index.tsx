import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ComparisonCard from '../components/ComparisonCard';
import TutorialCard from '../components/TutorialCard';
import OptimizedComparisonCard from '../components/OptimizedComparisonCard';
import OptimizedTutorialCard from '../components/OptimizedTutorialCard';
import LazyImage from '../components/LazyImage';
import { FiEdit, FiRefreshCcw, FiThumbsUp, FiZap, FiBriefcase, FiLayers } from 'react-icons/fi';
import { generateWebSiteSchema, generateProductSchema } from '../lib/seo/StructuredDataGenerator';

export default function Home() {
  // 生成网站结构化数据
  const websiteSchema = generateWebSiteSchema({
    url: 'https://nano-banana.run/',
    name: 'Nano-Banana.Run - The Definitive Resource for Nano-Banana AI Image Editing',
    description: 'Learn how to use the Nano-Banana AI image model with tutorials, examples and comparisons.',
    searchUrl: 'https://nano-banana.run/search?q={search_term_string}'
  });
  
  // 生成产品结构化数据
  const productSchema = generateProductSchema({
    url: 'https://nano-banana.run/',
    name: 'Nano-Banana AI Image Editing Model',
    description: 'Revolutionary AI image model that outperforms competitors with precise text replacement and seamless scene transformations.',
    imageUrl: 'https://nano-banana.run/images/nano-banana-model-preview.jpg',
    brand: 'Nano-Banana',
    review: [
      {
        reviewRating: 5,
        author: 'AIArtistPro',
        reviewBody: 'This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!'
      },
      {
        reviewRating: 5,
        author: 'ContentCreator',
        reviewBody: 'Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!'
      }
    ],
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 124
    }
  });

  // 组合结构化数据
  const combinedStructuredData = [websiteSchema, productSchema];

  return (
          <Layout
        title="Nano-Banana.Run - The AI Image Editing Resource Center"
        description="Discover how to harness the power of Nano-Banana, the revolutionary AI image model that outperforms competitors with precise text replacement and seamless scene transformations."
        keywords="nano-banana, AI image editing, text replacement AI, scene transformation, style matching, multi-region editing, batch processing"
        structuredData={combinedStructuredData}
        showWebVitals={false}
    >
      {/* Hero Section */}
      <Hero 
        title="The Definitive Resource for Nano-Banana AI Image Editing"
        description="Discover how to harness the power of Nano-Banana, the revolutionary AI image model that outperforms competitors with precise text replacement and seamless scene transformations. Now with enhanced accuracy and performance!"
        primaryBtnText="Try It Now"
        primaryBtnLink="/try-generator"
        secondaryBtnText="View Examples"
        secondaryBtnLink="/examples"
      />
      
      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Nano-Banana delivers industry-leading capabilities that redefine AI image editing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiEdit className="h-8 w-8" />}
              title="Enhanced Text Replacement"
              description="Replace text in images with 98% accuracy while preserving surrounding elements. New artistic font recognition improves complex text handling by 35%."
            />
            <FeatureCard 
              icon={<FiRefreshCcw className="h-8 w-8" />}
              title="Advanced Scene Transformation"
              description="Transform scenes with improved 3D awareness and lighting preservation. Our enhanced geometric consistency keeps subjects perfectly integrated with new backgrounds."
            />
            <FeatureCard 
              icon={<FiThumbsUp className="h-8 w-8" />}
              title="Style-Matched Editing"
              description="Add new elements with precisely matched artistic style, brush strokes, and texture, ensuring a cohesive and professional finished result."
            />
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiZap className="h-8 w-8" />}
              title="WebGL Accelerated"
              description="Experience 40% faster processing with our new WebGL acceleration. Large images are processed in chunks with real-time progress tracking."
            />
            <FeatureCard 
              icon={<FiBriefcase className="h-8 w-8" />}
              title="One-Click Workflows"
              description="Our new smart workflows reduce editing steps by 25%. The system automatically detects optimal parameters for your specific image."
            />
            <FeatureCard 
              icon={<FiLayers className="h-8 w-8" />}
              title="Multi-Region Editing"
              description="Edit multiple areas of an image simultaneously with consistent results. Perfect for complex editing tasks requiring different operations."
            />
          </div>
          
          {/* New Batch Processing Feature */}
          <div className="mt-16 bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block bg-primary-700 rounded-full px-3 py-1 text-sm font-semibold text-primary-50 mb-4">
                  NEW FEATURE
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Batch Processing</h3>
                <p className="text-primary-100 mb-6">
                  Process multiple images simultaneously with the same settings. Save time on repetitive tasks and ensure consistent results across your entire project.
                </p>
                <ul className="text-primary-50 space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                    Process up to 20 images in a single batch
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                    Apply text replacement, scene transformation, or style transfer
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                    Track processing progress in real-time
                  </li>
                </ul>
                <Link href="/batch-processing" className="inline-block bg-white text-primary-900 hover:bg-primary-50 font-medium px-6 py-2.5 rounded-lg">
                  Try Batch Processing
                </Link>
              </div>
              <div className="relative h-64 md:h-auto bg-primary-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold mb-2">20+</div>
                    <div className="text-xl">Images at once</div>
                    <div className="mt-4 opacity-20">
                      <LazyImage 
                        src="/images/batch-processing-preview.jpg"
                        alt="Batch Processing Preview"
                        width={300}
                        height={200}
                        className="rounded-lg opacity-30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Industry-Leading Performance</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See how Nano-Banana outperforms other leading AI image models across key metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <OptimizedComparisonCard 
              title="Text Replacement Accuracy"
              nanoBananaScore={9.8}
              competitorName="FLUX Kontext"
              competitorScore={7.2}
              imagePath="/images/comparison-text.jpg"
            />
            <OptimizedComparisonCard 
              title="Scene Transformation Quality"
              nanoBananaScore={9.6}
              competitorName="DALL-E 3"
              competitorScore={7.8}
              imagePath="/images/comparison-scene.jpg"
            />
            <OptimizedComparisonCard 
              title="Processing Speed"
              nanoBananaScore={9.5}
              competitorName="Midjourney"
              competitorScore={7.6}
              imagePath="/images/comparison-speed.jpg"
            />
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/comparison" className="btn btn-primary inline-block">
              See Full Comparison
            </Link>
          </div>
        </div>
      </section>
      
      {/* Latest Tutorials Section */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Tutorials</h2>
              <p className="mt-4 text-xl text-gray-600">
                Learn how to make the most of Nano-Banana with our expert guides
              </p>
            </div>
            <Link href="/tutorials" className="text-primary-600 font-medium hover:text-primary-800">
              View All Tutorials →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <OptimizedTutorialCard 
              title="Getting Started with Nano-Banana"
              description="Learn the basics of Nano-Banana AI model, how to access it, and start creating your first edits with simple prompts."
              imagePath="/images/tutorial-getting-started.jpg"
              slug="getting-started"
              readTime={10}
              difficulty="Beginner"
              date="August 15, 2025"
            />
            <OptimizedTutorialCard 
              title="Mastering Text Replacement"
              description="Discover advanced techniques for perfect text replacement, including matching fonts, maintaining backgrounds, and preserving design elements."
              imagePath="/images/tutorial-text-replacement.jpg"
              slug="text-replacement"
              readTime={15}
              difficulty="Intermediate"
              date="August 14, 2025"
            />
            <OptimizedTutorialCard 
              title="Advanced Scene Transformations"
              description="Take your scene editing to the next level with expert techniques for maintaining subject integrity while completely changing environments."
              imagePath="/images/tutorial-scene-transformation.jpg"
              slug="scene-transformation"
              readTime={20}
              difficulty="Advanced"
              date="August 12, 2025"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-primary-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Images?</h2>
            <p className="text-xl text-primary-50 mb-8">
              Start using Nano-Banana today and experience the next generation of AI image editing
            </p>
            <Link href="/tutorials/getting-started" className="btn bg-white text-primary-900 hover:bg-primary-50 px-8 py-3 rounded-md font-medium inline-block">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
      

    </Layout>
  );
}
