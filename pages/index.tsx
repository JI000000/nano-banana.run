import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ComparisonCard from '../components/ComparisonCard';
import TutorialCard from '../components/TutorialCard';
import { FiEdit, FiRefreshCcw, FiThumbsUp } from 'react-icons/fi';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero 
        title="The Definitive Resource for Nano-Banana AI Image Editing"
        description="Discover how to harness the power of Nano-Banana, the revolutionary AI image model that outperforms competitors with precise text replacement and seamless scene transformations."
        primaryBtnText="Explore Tutorials"
        primaryBtnLink="/tutorials"
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
              title="Precise Text Replacement"
              description="Replace text in images with pixel-perfect accuracy while preserving the surrounding elements, including backgrounds, designs, and even QR codes."
            />
            <FeatureCard 
              icon={<FiRefreshCcw className="h-8 w-8" />}
              title="Seamless Scene Transformation"
              description="Transform entire scenes while maintaining subject integrity and artistic coherence. Change locations, weather, time of day with remarkable consistency."
            />
            <FeatureCard 
              icon={<FiThumbsUp className="h-8 w-8" />}
              title="Style-Matched Editing"
              description="Add new elements with precisely matched artistic style, brush strokes, and texture, ensuring a cohesive and professional finished result."
            />
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
            <ComparisonCard 
              title="Text Replacement Accuracy"
              nanoBananaScore={9.5}
              competitorName="FLUX Kontext"
              competitorScore={7.2}
              imagePath="/images/comparison-text.jpg"
            />
            <ComparisonCard 
              title="Scene Transformation Quality"
              nanoBananaScore={9.2}
              competitorName="DALL-E 3"
              competitorScore={7.8}
              imagePath="/images/comparison-scene.jpg"
            />
            <ComparisonCard 
              title="Style Consistency"
              nanoBananaScore={9.7}
              competitorName="Midjourney"
              competitorScore={8.4}
              imagePath="/images/comparison-style.jpg"
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
            <TutorialCard 
              title="Getting Started with Nano-Banana"
              description="Learn the basics of Nano-Banana AI model, how to access it, and start creating your first edits with simple prompts."
              imagePath="/images/tutorial-getting-started.jpg"
              slug="getting-started"
              readTime={10}
              difficulty="Beginner"
              date="August 15, 2025"
            />
            <TutorialCard 
              title="Mastering Text Replacement"
              description="Discover advanced techniques for perfect text replacement, including matching fonts, maintaining backgrounds, and preserving design elements."
              imagePath="/images/tutorial-text-replacement.jpg"
              slug="text-replacement"
              readTime={15}
              difficulty="Intermediate"
              date="August 14, 2025"
            />
            <TutorialCard 
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
      
      {/* Schema.org article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'url': 'https://nano-banana.run/',
            'name': 'Nano-Banana.Run - The Definitive Resource for Nano-Banana AI Image Editing',
            'description': 'Learn how to use the Nano-Banana AI image model with tutorials, examples and comparisons.',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': 'https://nano-banana.run/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
    </Layout>
  );
}
