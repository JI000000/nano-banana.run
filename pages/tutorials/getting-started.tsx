import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import VideoEmbed from '../../components/tutorials/VideoEmbed';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight, FiExternalLink } from 'react-icons/fi';

export default function GettingStartedTutorial() {
  const tutorialMeta = {
    title: 'How to Access Nano Banana - Complete Guide',
    description: 'Step-by-step guide to accessing Nano Banana on Google AI Studio, LMarena, and Gemini. Learn which platform works best for your needs.',
    publishDate: 'September 5, 2025',
    author: 'Nano Banana Team',
    readTime: 4,
    category: 'Getting Started',
    difficulty: 'Beginner',
  };

  return (
    <Layout
      title={`${tutorialMeta.title} | Nano-Banana AI Tutorial`}
      description={tutorialMeta.description}
      keywords="nano-banana tutorial, getting started, beginners guide, nano-banana AI basics, first steps"
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
            {/* Video Tutorial */}
            <div className="mb-8">
              <VideoEmbed 
                videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                title="How to Access Nano Banana - Video Tutorial"
                className="mb-6"
              />
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#google-ai-studio" className="text-primary-600 hover:text-primary-800 p-3 bg-white rounded border">
                  <strong>Google AI Studio</strong><br/>
                  <span className="text-sm text-gray-600">Official Platform</span>
                </a>
                <a href="#lmarena" className="text-primary-600 hover:text-primary-800 p-3 bg-white rounded border">
                  <strong>LMarena</strong><br/>
                  <span className="text-sm text-gray-600">Community Platform</span>
                </a>
                <a href="#gemini" className="text-primary-600 hover:text-primary-800 p-3 bg-white rounded border">
                  <strong>Gemini</strong><br/>
                  <span className="text-sm text-gray-600">AI Assistant</span>
                </a>
              </div>
            </div>
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Access Nano Banana</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Nano Banana is Google's latest AI image editing model, available through multiple platforms. Here's how to access it based on your needs.
              </p>
            </div>
            
            {/* Google AI Studio */}
            <div id="google-ai-studio" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Method 1: Google AI Studio (Recommended)</h2>
              
              <p className="text-lg text-gray-700 mb-4">
                Google AI Studio offers the most complete Nano Banana experience:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li className="text-gray-700">Visit <a href="https://aistudio.google.com" target="_blank" className="text-primary-600 hover:text-primary-800">aistudio.google.com</a></li>
                <li className="text-gray-700">Sign in with your Google account</li>
                <li className="text-gray-700">Look for "Nano Banana" in the model selection</li>
                <li className="text-gray-700">Upload your image and start editing</li>
              </ol>
            </div>

            {/* LMarena */}
            <div id="lmarena" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Method 2: LMarena (Community Platform)</h2>
              
              <p className="text-lg text-gray-700 mb-4">
                LMarena provides an easy-to-use interface for testing Nano Banana:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li className="text-gray-700">Go to <a href="https://lmarena.ai" target="_blank" className="text-primary-600 hover:text-primary-800">lmarena.ai</a></li>
                <li className="text-gray-700">Search for "Nano Banana" in the models list</li>
                <li className="text-gray-700">Upload your image and experiment with prompts</li>
              </ol>
            </div>

            {/* Gemini */}
            <div id="gemini" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Method 3: Gemini Integration</h2>
              
              <p className="text-lg text-gray-700 mb-4">
                Use Nano Banana through Gemini's conversational interface:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li className="text-gray-700">Visit <a href="https://gemini.google.com" target="_blank" className="text-primary-600 hover:text-primary-800">gemini.google.com</a></li>
                <li className="text-gray-700">Upload an image and ask Gemini to edit it</li>
                <li className="text-gray-700">Gemini will use Nano Banana for image transformations</li>
              </ol>
            </div>

            {/* Platform Comparison */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Which Platform Should You Choose?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Google AI Studio</h3>
                  <p className="text-gray-600 mb-4">Best for professional use and full features</p>
                  <a href="https://aistudio.google.com" target="_blank" className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium">
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Try Google AI Studio
                  </a>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">LMarena</h3>
                  <p className="text-gray-600 mb-4">Great for testing and experimentation</p>
                  <a href="https://lmarena.ai" target="_blank" className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium">
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Try LMarena
                  </a>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Gemini</h3>
                  <p className="text-gray-600 mb-4">Perfect for casual users and natural language editing</p>
                  <a href="https://gemini.google.com" target="_blank" className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium">
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Try Gemini
                  </a>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Now that you know how to access Nano Banana, explore these tutorials to master its features:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/tutorials/prompt-engineering" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Prompt Engineering</h3>
                  <p className="text-gray-700">
                    Learn how to write effective prompts for better results.
                  </p>
                </Link>
                <Link href="/tutorials/text-replacement" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Text Replacement</h3>
                  <p className="text-gray-700">
                    Master text replacement while maintaining natural fonts and layouts.
                  </p>
                </Link>
                <Link href="/tutorials/examples" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Examples & Use Cases</h3>
                  <p className="text-gray-700">
                    See real examples of Nano Banana in action.
                  </p>
                </Link>
                <Link href="/tutorials/comparison" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Tool Comparison</h3>
                  <p className="text-gray-700">
                    Compare Nano Banana with other AI image editing tools.
                  </p>
                </Link>
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
                    Nano-Banana specialists providing the latest guides, tutorials, and tips for AI image editing.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <div></div>
              <Link href="/tutorials/prompt-engineering" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <span>Next Tutorial: Prompt Engineering</span>
                <FiArrowRight className="ml-2" />
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
            '@type': 'TechArticle',
            'headline': tutorialMeta.title,
            'description': tutorialMeta.description,
            'author': {
              '@type': 'Organization',
              'name': tutorialMeta.author
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Nano-Banana.Run',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://nano-banana.run/logo.png'
              }
            },
            'datePublished': '2025-08-15',
            'dateModified': '2025-08-26',
            'image': 'https://nano-banana.run/images/tutorial-getting-started.jpg',
            'articleBody': 'Learn the basics of Nano-Banana AI model, how to access it, and start creating your first edits with simple prompts.',
            'articleSection': 'Tutorial',
            'skill_level': 'Beginner'
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            'name': 'Getting Started with Nano-Banana (Gemini 2.5 Flash Image)',
            'description': 'Upload an image, write a precise prompt, enable Smart Workflow, and generate a consistent edit.',
            'totalTime': 'PT10M',
            'tool': ['Nano‑Banana Editor'],
            'supply': ['One source image'],
            'step': [
              { '@type': 'HowToStep', 'position': 1, 'name': 'Open the editor', 'text': 'Go to the Try Generator page and prepare your image.' },
              { '@type': 'HowToStep', 'position': 2, 'name': 'Upload your image', 'text': 'Use drag‑and‑drop or file picker to upload a clear, high‑resolution image.' },
              { '@type': 'HowToStep', 'position': 3, 'name': 'Write a prompt', 'text': 'Describe exactly what to change and what to preserve. Quote exact strings for text replacement.' },
              { '@type': 'HowToStep', 'position': 4, 'name': 'Enable Smart Workflow', 'text': 'Keep Smart Workflow on to auto‑tune parameters.' },
              { '@type': 'HowToStep', 'position': 5, 'name': 'Generate and verify', 'text': 'Click Generate and verify consistency, layout and details. Re‑prompt if needed.' }
            ]
          })
        }}
      />
    </Layout>
  );
}
