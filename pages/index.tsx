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
import ImageProcessor from '../components/ImageProcessor';
import { FiEdit, FiRefreshCcw, FiThumbsUp, FiZap, FiBriefcase, FiLayers, FiStar, FiUsers, FiClock, FiCheckCircle } from 'react-icons/fi';
import { generateWebSiteSchema, generateProductSchema } from '../lib/seo/StructuredDataGenerator';

export default function Home() {
  // 生成网站结构化数据
  const websiteSchema = generateWebSiteSchema({
    url: 'https://nano-banana.run/',
    name: 'Nano Banana - AI Image Editor & Generator',
    description: 'Transform any image with simple text prompts. Nano-banana\'s advanced model delivers consistent character editing and scene preservation that surpasses Flux Kontext.',
    searchUrl: 'https://nano-banana.run/search?q={search_term_string}'
  });
  
  // 生成产品结构化数据
  const productSchema = generateProductSchema({
    url: 'https://nano-banana.run/',
    name: 'Nano Banana AI Image Editor',
    description: 'Revolutionary AI image model that outperforms competitors with precise text replacement and seamless scene transformations.',
    imageUrl: 'https://nano-banana.run/images/nano-banana-model-preview.jpg',
    brand: 'Nano Banana',
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
      ratingValue: 4.9,
      reviewCount: 124
    }
  });

  // 组合结构化数据
  const combinedStructuredData = [websiteSchema, productSchema];

  return (
    <Layout
      title="Nano Banana - AI Image Editor & Generator"
      description="Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character editing and scene preservation that surpasses Flux Kontext."
      keywords="nano banana, ai image editor, ai image generator, text to image, image to image, character consistency, scene transformation, flux kontext alternative, ai photo editing"
      structuredData={combinedStructuredData}
      showWebVitals={false}
    >
      {/* Hero Section */}
      <Hero 
        title="Transform any image with simple text prompts"
        description="Nano-banana's advanced model delivers consistent character editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing."
        primaryBtnText="Try The AI Editor"
        primaryBtnLink="/try-generator"
        secondaryBtnText="View Examples"
        secondaryBtnLink="/examples"
      />
      
      {/* Try It Now Section */}
      <section className="section py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience AI Image Generation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Try our advanced AI model with real-time generation. Upload an image or start from scratch with text prompts.
            </p>
          </div>
          <ImageProcessor />
        </div>
      </section>
      
      {/* Core Features Section */}
      <section className="section py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Choose Nano Banana?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiEdit className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Natural Language Editing</h3>
              <p className="text-gray-600">
                Edit images using simple text prompts. Nano-banana AI understands complex instructions like GPT for images.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiThumbsUp className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Character Consistency</h3>
              <p className="text-gray-600">
                Maintain perfect character details across edits. This model excels at preserving faces and identities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiRefreshCcw className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scene Preservation</h3>
              <p className="text-gray-600">
                Seamlessly blend edits with original backgrounds. Superior scene fusion compared to Flux Kontext.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiZap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">One-Shot Editing</h3>
              <p className="text-gray-600">
                Perfect results in a single attempt. Nano-banana solves one-shot image editing challenges effortlessly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiLayers className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Image Context</h3>
              <p className="text-gray-600">
                Process multiple images simultaneously. Support for advanced multi-image editing workflows.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiBriefcase className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI UGC Creation</h3>
              <p className="text-gray-600">
                Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Showcase Section */}
      <section className="section py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Showcase</h2>
            <p className="text-xl text-gray-600">
              Lightning-Fast AI Creations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "AI Generated Mountain", speed: "0.8s", image: "/images/examples/result-1.jpg" },
              { title: "Instant Garden Creation", speed: "0.6s", image: "/images/examples/result-2.jpg" },
              { title: "Real-time Beach Synthesis", speed: "0.7s", image: "/images/examples/result-3.jpg" },
              { title: "Rapid Aurora Generation", speed: "0.9s", image: "/images/examples/result-4.jpg" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <LazyImage 
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="w-4 h-4 mr-1" />
                    {item.speed}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/examples" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
              View More Examples
            </Link>
          </div>
        </div>
      </section>
      
      {/* User Reviews Section */}
      <section className="section py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">User Reviews</h2>
            <p className="text-xl text-gray-600">
              What creators are saying
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "AIArtistPro",
                role: "Digital Creator",
                content: "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
                rating: 5
              },
              {
                name: "ContentCreator",
                role: "UGC Specialist",
                content: "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
                rating: 5
              },
              {
                name: "PhotoEditor",
                role: "Professional Editor",
                content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
                rating: 5
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-primary-900 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Experience the power of Nano Banana yourself</h2>
            <p className="text-xl text-primary-100 mb-8">
              Join creators worldwide using the most advanced AI image generator available today
            </p>
            <Link href="/try-generator" className="inline-flex items-center px-8 py-4 bg-white text-primary-900 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
              Try Nano Banana Generator
            </Link>
            <p className="text-sm text-primary-200 mt-4">No credit card required</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
