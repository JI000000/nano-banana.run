import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiExternalLink, FiZap, FiBook, FiCode, FiTrendingUp } from 'react-icons/fi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import UnifiedImageEditor from '../UnifiedImageEditor';

const QuickAccessSection: React.FC = () => {
  return (
    <section id="quick-access" className="section py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-sm font-medium text-primary-700 mb-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            Get Started in 3 Steps
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How to Use Nano Banana
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access nano banana free on Google AI Studio, Gemini, and LMarena. Start creating amazing AI-edited images in minutes.
          </p>
        </div>
        
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card
            padding="md"
            hover={true}
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Google AI Studio</h3>
                <p className="text-sm text-gray-600">Official Platform</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Access Nano Banana through Google's official AI platform with full features and high quality results.</p>
            <Button
              variant="ghost"
              size="sm"
              href="/about"
              className="text-blue-600 hover:text-blue-800 p-0 h-auto"
              icon={<FiArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Learn How to Access
            </Button>
          </Card>
          
          <Card
            padding="md"
            hover={true}
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">LMarena</h3>
                <p className="text-sm text-gray-600">Community Platform</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Try Nano Banana on LMarena with an easy-to-use interface and community features.</p>
            <Button
              variant="ghost"
              size="sm"
              href="https://lmarena.ai"
              external={true}
              className="text-green-600 hover:text-green-800 p-0 h-auto"
              icon={<FiExternalLink className="w-4 h-4" />}
              iconPosition="right"
            >
              Visit LMarena
            </Button>
          </Card>
          
          <Card
            padding="md"
            hover={true}
            className="hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Gemini</h3>
                <p className="text-sm text-gray-600">AI Assistant</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Use Nano Banana through Gemini's conversational interface for natural language image editing.</p>
            <Button
              variant="ghost"
              size="sm"
              href="https://gemini.google.com"
              external={true}
              className="text-purple-600 hover:text-purple-800 p-0 h-auto"
              icon={<FiExternalLink className="w-4 h-4" />}
              iconPosition="right"
            >
              Try Gemini
            </Button>
          </Card>
        </div>
        
        {/* Quick Start Steps */}
        <Card variant="elevated" className="mb-12">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Choose Platform</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Select Google AI Studio, LMarena, or Gemini based on your preference</p>
              </div>
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Upload Image</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Upload your image to the platform and prepare your editing prompt</p>
              </div>
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Generate Result</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Describe your desired changes and let AI create your edited image</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Try It Now Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Try Nano Banana Free Now
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Experience the power of nano banana with our integrated editor. Upload an image and see the magic happen.
          </p>
          <UnifiedImageEditor 
            compact={true}
            showModeTabs={false}
            showFeatures={true}
            showTips={true}
            showStats={true}
          />
        </div>

        {/* Popular Resources Section - 新增资源入口 */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Popular Nano Banana Resources
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive guides, comparisons, and API documentation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tutorials" className="group">
              <Card padding="md" hover={true} className="h-full group-hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <FiBook className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">How to Use Nano Banana</h4>
                  <p className="text-sm text-gray-600">Complete tutorial guide with step-by-step instructions</p>
                </div>
              </Card>
            </Link>

            <Link href="/nano-banana-vs-flux-kontext" className="group">
              <Card padding="md" hover={true} className="h-full group-hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <FiTrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Nano Banana vs Flux Kontext</h4>
                  <p className="text-sm text-gray-600">Detailed comparison showing why nano banana wins</p>
                </div>
              </Card>
            </Link>

            <Link href="/showcase" className="group">
              <Card padding="md" hover={true} className="h-full group-hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <FiZap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Nano Banana Examples</h4>
                  <p className="text-sm text-gray-600">Browse amazing nano banana examples and prompts</p>
                </div>
              </Card>
            </Link>

            <Link href="/nano-banana-api" className="group">
              <Card padding="md" hover={true} className="h-full group-hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <FiCode className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Nano Banana API</h4>
                  <p className="text-sm text-gray-600">Developer guide and API documentation</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
