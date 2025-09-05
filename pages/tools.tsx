import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiZap, FiCrop, FiImage, FiType, FiGrid, FiTrendingUp, FiStar, FiUsers, FiClock, FiCheck, FiArrowRight, FiExternalLink } from 'react-icons/fi';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'core' | 'professional' | 'creative' | 'utility';
  status: 'available' | 'beta' | 'coming-soon';
  features: string[];
  successRate: number;
  usageCount: number;
  rating: number;
  link: string;
  isExternal?: boolean;
  color: string;
}

const TOOLS: Tool[] = [
  {
    id: 'image-editor',
    name: 'AI Image Editor',
    description: 'Complete image editing suite with text replacement, scene transformation, and style matching',
    icon: <FiZap className="w-6 h-6" />,
    category: 'core',
    status: 'available',
    features: ['Text Replacement', 'Scene Transformation', 'Style Matching', 'Batch Processing', 'Aspect Ratio Control'],
    successRate: 85,
    usageCount: 2156,
    rating: 4.8,
    link: '/image-editor',
    color: 'primary'
  },
  {
    id: 'aspect-ratio-tool',
    name: 'Aspect Ratio Control',
    description: 'Professional tool to solve Nano Banana proportion issues with 90%+ success rate',
    icon: <FiCrop className="w-6 h-6" />,
    category: 'professional',
    status: 'available',
    features: ['6 Aspect Ratios', 'Template System', 'Production Ready', 'High Success Rate'],
    successRate: 90,
    usageCount: 892,
    rating: 4.9,
    link: '/aspect-ratio-tool',
    color: 'red'
  },
  {
    id: 'prompt-optimizer',
    name: 'Prompt Optimizer',
    description: 'AI-powered prompt optimization to maximize Nano Banana results',
    icon: <FiType className="w-6 h-6" />,
    category: 'utility',
    status: 'beta',
    features: ['Auto Optimization', 'Success Prediction', 'Style Analysis', 'A/B Testing'],
    successRate: 78,
    usageCount: 234,
    rating: 4.6,
    link: '/prompt-optimizer',
    color: 'blue'
  },
  {
    id: 'batch-processor',
    name: 'Batch Processor',
    description: 'Process multiple images simultaneously with consistent results',
    icon: <FiGrid className="w-6 h-6" />,
    category: 'professional',
    status: 'available',
    features: ['Bulk Processing', 'Consistent Results', 'Progress Tracking', 'Export Options'],
    successRate: 82,
    usageCount: 567,
    rating: 4.7,
    link: '/batch-processor',
    color: 'green'
  },
  {
    id: 'style-transfer',
    name: 'Style Transfer Pro',
    description: 'Advanced style transfer with artistic consistency and quality control',
    icon: <FiImage className="w-6 h-6" />,
    category: 'creative',
    status: 'coming-soon',
    features: ['Artistic Styles', 'Quality Control', 'Consistency Engine', 'Custom Presets'],
    successRate: 0,
    usageCount: 0,
    rating: 0,
    link: '#',
    color: 'purple'
  },
  {
    id: 'api-dashboard',
    name: 'API Dashboard',
    description: 'Manage your Nano Banana API usage, monitor performance, and optimize costs',
    icon: <FiTrendingUp className="w-6 h-6" />,
    category: 'utility',
    status: 'coming-soon',
    features: ['Usage Analytics', 'Cost Optimization', 'Performance Monitoring', 'Rate Limiting'],
    successRate: 0,
    usageCount: 0,
    rating: 0,
    link: '#',
    color: 'orange'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Tools', count: TOOLS.length },
  { id: 'core', name: 'Core Tools', count: TOOLS.filter(t => t.category === 'core').length },
  { id: 'professional', name: 'Professional', count: TOOLS.filter(t => t.category === 'professional').length },
  { id: 'creative', name: 'Creative', count: TOOLS.filter(t => t.category === 'creative').length },
  { id: 'utility', name: 'Utility', count: TOOLS.filter(t => t.category === 'utility').length }
];

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredTools = TOOLS
    .filter(tool => selectedCategory === 'all' || tool.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.usageCount - a.usageCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.usageCount - a.usageCount; // Simplified for demo
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary-100 text-primary-600 border-primary-200';
      case 'red': return 'bg-red-100 text-red-600 border-red-200';
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'orange': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nano Banana Tools - Professional AI Image Editing Suite",
    "description": "Discover the complete suite of Nano Banana tools for professional AI image editing. From basic editing to advanced batch processing.",
    "url": "https://nano-banana.run/tools"
  };

  return (
    <Layout
      title="Nano Banana Tools - Professional AI Image Editing Suite | Free Online Tools"
      description="Explore our complete suite of Nano Banana tools for professional AI image editing. Aspect ratio control, batch processing, prompt optimization, and more."
      keywords="nano banana tools, ai image editing tools, aspect ratio control, batch processing, prompt optimizer, nano banana suite"
      structuredData={websiteSchema}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nano Banana Tools Suite
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Professional AI image editing tools designed for creators, designers, and businesses
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiZap className="w-4 h-4 inline mr-2" />
              {TOOLS.filter(t => t.status === 'available').length} Available Tools
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiUsers className="w-4 h-4 inline mr-2" />
              {TOOLS.reduce((sum, tool) => sum + tool.usageCount, 0).toLocaleString()} Total Uses
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiStar className="w-4 h-4 inline mr-2" />
              4.7/5 Average Rating
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 w-full lg:w-auto"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${getColorClasses(tool.color)}`}>
                      {tool.icon}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tool.status)}`}>
                      {tool.status === 'available' ? 'Available' : 
                       tool.status === 'beta' ? 'Beta' : 'Coming Soon'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{tool.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  {tool.status === 'available' && (
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FiTrendingUp className="w-4 h-4 mr-1" />
                        {tool.usageCount.toLocaleString()} uses
                      </div>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 mr-1" />
                        {tool.rating}/5
                      </div>
                      <div className="flex items-center">
                        <FiCheck className="w-4 h-4 mr-1" />
                        {tool.successRate}%
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-4">
                    {tool.status === 'available' ? (
                      <Link
                        href={tool.link}
                        className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                      >
                        Use Tool
                        <FiArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    ) : tool.status === 'beta' ? (
                      <Link
                        href={tool.link}
                        className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center"
                      >
                        Try Beta
                        <FiExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                      >
                        Coming Soon
                        <FiClock className="w-4 h-4 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <FiZap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tool Development Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're constantly expanding our tool suite based on user feedback and market needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Available Now</h3>
              <p className="text-gray-600 text-sm">Core tools ready for production use</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">In Beta</h3>
              <p className="text-gray-600 text-sm">Advanced tools in testing phase</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-600 text-sm">New tools in development</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Using Our Tools Today
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of creators using our professional AI image editing tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/image-editor" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <FiZap className="w-5 h-5 mr-2" />
              Try Main Editor
            </Link>
            <Link href="/aspect-ratio-tool" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center">
              <FiCrop className="w-5 h-5 mr-2" />
              Aspect Ratio Tool
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
