import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight, FiCheck, FiX } from 'react-icons/fi';

export default function ComparisonTutorial() {
  const tutorialMeta = {
    title: 'Nano Banana vs Other AI Tools - Comparison',
    description: 'Compare Nano Banana with other AI image editing tools. Learn about features, pricing, and which tool is best for your needs.',
    publishDate: 'September 5, 2025',
    author: 'Nano Banana Team',
    readTime: 6,
    category: 'Comparison',
    difficulty: 'Beginner',
  };

  return (
    <Layout
      title={`${tutorialMeta.title} | Nano Banana Tutorial`}
      description={tutorialMeta.description}
      keywords="nano banana vs, nano banana comparison, nano banana alternatives, nano banana vs midjourney, nano banana vs dall-e, nano banana vs firefly"
    >
      {/* Tutorial Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/tutorials" className="inline-flex items-center text-primary-50 hover:text-white mb-4">
              <FiArrowLeft className="mr-2" />
              <span>Back to Tutorials</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{tutorialMeta.title}</h1>
            <p className="text-xl text-primary-50 mb-6">
              {tutorialMeta.description}
            </p>
            
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
      
      {/* Main Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nano Banana vs Other AI Tools</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                How does Nano Banana compare to other AI image editing tools? Here's an honest comparison to help you choose the right tool.
              </p>
            </div>
            
            {/* Comparison Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Comparison</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Nano Banana</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Midjourney</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">DALL-E 3</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Adobe Firefly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Text Replacement</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">
                        <FiX className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">Limited</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">Limited</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Image Editing</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">
                        <FiX className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">
                        <FiX className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Free Tier</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">
                        <FiX className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Image Generation</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">Limited</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">API Access</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">
                        <FiX className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600">
                        <FiCheck className="w-5 h-5 mx-auto" />
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">Limited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Comparisons */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Comparisons</h2>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Nano Banana vs Midjourney</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Nano Banana Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Free tier available</li>
                        <li>• Excellent text replacement</li>
                        <li>• Precise image editing</li>
                        <li>• API access</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Midjourney Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Superior image generation</li>
                        <li>• Better artistic styles</li>
                        <li>• Active community</li>
                        <li>• Consistent quality</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <strong>Winner:</strong> Nano Banana for editing existing images, Midjourney for creating new images from scratch
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Nano Banana vs DALL-E 3</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Nano Banana Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Better at editing existing images</li>
                        <li>• Superior text replacement</li>
                        <li>• More precise control</li>
                        <li>• Free to use</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">DALL-E 3 Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Better at generating new images</li>
                        <li>• More creative freedom</li>
                        <li>• Integration with ChatGPT</li>
                        <li>• OpenAI ecosystem</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <strong>Winner:</strong> Depends on your use case - Nano Banana for editing, DALL-E 3 for generation
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Nano Banana vs Adobe Firefly</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Nano Banana Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Completely free</li>
                        <li>• Simple interface</li>
                        <li>• Good for beginners</li>
                        <li>• No subscription required</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Adobe Firefly Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Professional features</li>
                        <li>• Creative Suite integration</li>
                        <li>• Advanced editing tools</li>
                        <li>• Enterprise support</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <strong>Winner:</strong> Nano Banana for casual users, Firefly for professionals
                  </div>
                </div>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Advantages of Nano Banana</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Strengths</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Completely free to use</li>
                    <li>• Excellent text replacement capabilities</li>
                    <li>• Easy to use interface</li>
                    <li>• No subscription required</li>
                    <li>• Good quality results</li>
                    <li>• API access for developers</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Best For</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Editing existing images</li>
                    <li>• Text replacement tasks</li>
                    <li>• Free solution seekers</li>
                    <li>• Beginners to AI editing</li>
                    <li>• Quick, simple edits</li>
                    <li>• API integration projects</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* When to Choose */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Choose Nano Banana</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Perfect For These Use Cases</h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• You need to edit existing images (not generate new ones)</li>
                  <li>• Text replacement is important for your workflow</li>
                  <li>• You want a completely free solution</li>
                  <li>• You're a beginner to AI image editing</li>
                  <li>• You need quick, simple edits without complex features</li>
                  <li>• You want to integrate AI editing into your applications</li>
                </ul>
              </div>
            </div>
            
            {/* Author Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{tutorialMeta.author}</h3>
                  <p className="text-gray-600">
                    Nano Banana specialists providing honest comparisons and tool recommendations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <Link href="/tutorials/api-guide" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <FiArrowLeft className="mr-2" />
                <span>Previous: API Guide</span>
              </Link>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
