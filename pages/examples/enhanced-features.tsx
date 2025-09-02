import React from 'react';
import Layout from '../../components/Layout';
import EnhancedDemoCard from '../../components/EnhancedDemoCard';
import Link from 'next/link';
import { FiZap, FiArrowRight, FiStar } from 'react-icons/fi';

const EnhancedFeaturesPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Enhanced Features Showcase</h1>
            <p className="text-lg text-primary-100">
              Experience the latest improvements to Nano-Banana's AI image editing capabilities.
              With increased accuracy, faster processing, and smarter workflows.
            </p>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block p-2 bg-primary-100 text-primary-800 rounded-full mb-4">
              <FiZap className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's New in Nano-Banana</h2>
            <p className="text-lg text-gray-600">
              Our latest update brings significant improvements to text replacement accuracy,
              scene transformation quality, and overall processing speed. See the before and after
              results that showcase these enhancements.
            </p>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-800 font-medium mb-1">Text Accuracy</div>
              <div className="text-sm text-gray-600">Up from 95%</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">40%</div>
              <div className="text-gray-800 font-medium mb-1">Faster Processing</div>
              <div className="text-sm text-gray-600">With WebGL acceleration</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-4xl font-bold text-primary-600 mb-2">25%</div>
              <div className="text-gray-800 font-medium mb-1">Fewer Steps</div>
              <div className="text-sm text-gray-600">With smart workflows</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Text Replacement Examples */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Text Replacement</h2>
            <p className="text-gray-600">
              Our improved text replacement algorithm achieves 98% accuracy with perfect font matching
              and background preservation, even for complex artistic fonts and challenging backgrounds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedDemoCard
              title="Artistic Font Recognition"
              description="Replace ornate and decorative text while perfectly preserving the style and background details."
              beforeImage="/images/examples/text-before-1.jpg"
              afterImage="/images/examples/text-after-1.jpg"
              featureHighlight="Font Matching"
              performanceMetric="+35% Accuracy"
              tutorialLink="/tutorials/advanced-text-replacement"
            />
            <EnhancedDemoCard
              title="Multi-Layer Text Handling"
              description="Replace text across multiple layers and effects with perfect preservation of shadows and glows."
              beforeImage="/images/examples/text-before-2.jpg"
              afterImage="/images/examples/text-after-2.jpg"
              featureHighlight="Layer Awareness"
              performanceMetric="+28% Accuracy"
            />
            <EnhancedDemoCard
              title="Complex Background Preservation"
              description="Replace text on detailed and textured backgrounds without any artifacts or blending issues."
              beforeImage="/images/examples/text-before-3.jpg"
              afterImage="/images/examples/text-after-3.jpg"
              featureHighlight="Background Preservation"
              performanceMetric="+22% Quality"
              tutorialLink="/tutorials/text-on-complex-backgrounds"
            />
          </div>
        </div>
      </section>
      
      {/* Enhanced Scene Transformation Examples */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Advanced Scene Transformation</h2>
            <p className="text-gray-600">
              Our improved scene transformation system maintains perfect geometric consistency
              and preserves lighting conditions for more realistic and coherent results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedDemoCard
              title="3D-Aware Scene Editing"
              description="Transform scenes with proper depth awareness and perspective preservation."
              beforeImage="/images/examples/scene-before-1.jpg"
              afterImage="/images/examples/scene-after-1.jpg"
              featureHighlight="3D Awareness"
              performanceMetric="+40% Realism"
              tutorialLink="/tutorials/3d-scene-transformation"
            />
            <EnhancedDemoCard
              title="Lighting Preservation"
              description="Change environments while keeping the original lighting direction and color temperature."
              beforeImage="/images/examples/scene-before-2.jpg"
              afterImage="/images/examples/scene-after-2.jpg"
              featureHighlight="Lighting Consistency"
              performanceMetric="+30% Accuracy"
            />
            <EnhancedDemoCard
              title="Weather & Time Transformation"
              description="Change weather conditions and time of day with accurate shadow casting and lighting effects."
              beforeImage="/images/examples/scene-before-3.jpg"
              afterImage="/images/examples/scene-after-3.jpg"
              featureHighlight="Weather Physics"
              performanceMetric="+25% Realism"
              tutorialLink="/tutorials/weather-time-transformation"
            />
          </div>
        </div>
      </section>
      
      {/* Performance Optimization Examples */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance & Workflow Optimizations</h2>
            <p className="text-gray-600">
              Our latest update includes significant performance improvements and streamlined workflows,
              reducing processing time by 40% and editing steps by 25%.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedDemoCard
              title="WebGL Acceleration"
              description="Process large images up to 40% faster with GPU acceleration and progressive rendering."
              beforeImage="/images/examples/performance-before-1.jpg"
              afterImage="/images/examples/performance-after-1.jpg"
              featureHighlight="GPU Acceleration"
              performanceMetric="40% Faster"
              tutorialLink="/tutorials/processing-large-images"
            />
            <EnhancedDemoCard
              title="One-Click Smart Workflows"
              description="Our system automatically detects optimal parameters based on your specific image."
              beforeImage="/images/examples/performance-before-2.jpg"
              afterImage="/images/examples/performance-after-2.jpg"
              featureHighlight="Smart Parameters"
              performanceMetric="25% Fewer Steps"
            />
            <EnhancedDemoCard
              title="Multi-Region Editing"
              description="Edit multiple areas of an image simultaneously while maintaining consistency between regions."
              beforeImage="/images/examples/performance-before-3.jpg"
              afterImage="/images/examples/performance-after-3.jpg"
              featureHighlight="Multi-Region"
              performanceMetric="60% Time Saved"
              tutorialLink="/tutorials/multi-region-editing"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary-800 rounded-full mb-6">
              <FiStar className="h-8 w-8 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to try these enhanced features?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Experience the full power of Nano-Banana's latest improvements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/image-editor" className="btn bg-white text-primary-900 hover:bg-primary-50 px-8 py-4 rounded-md font-medium inline-flex items-center justify-center">
                Try the Generator <FiArrowRight className="ml-2" />
              </Link>
              <Link href="/tutorials" className="btn border border-white text-white hover:bg-primary-800 px-8 py-4 rounded-md font-medium inline-flex items-center justify-center">
                View Tutorials
              </Link>
            </div>
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
            'headline': 'Enhanced Features of Nano-Banana AI Image Editor',
            'description': 'Discover the latest improvements to Nano-Banana AI image editing capabilities including enhanced text replacement, scene transformation, and performance optimizations.',
            'image': [
              'https://nano-banana.run/images/examples/text-after-1.jpg',
              'https://nano-banana.run/images/examples/scene-after-1.jpg'
            ],
            'author': {
              '@type': 'Organization',
              'name': 'Nano-Banana Team'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Nano-Banana',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://nano-banana.run/logo.png'
              }
            },
            'datePublished': '2025-08-15',
            'dateModified': '2025-08-15'
          })
        }}
      />
    </Layout>
  );
};

export default EnhancedFeaturesPage;
