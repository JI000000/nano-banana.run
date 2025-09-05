import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function PromptEngineeringTutorial() {
  const tutorialMeta = {
    title: 'Nano Banana Prompt Engineering Mastery',
    description: 'Master Nano Banana prompts with advanced techniques. Learn how to write effective prompts for perfect results every time.',
    publishDate: 'August 26, 2025',
    author: 'Nano Banana Team',
    readTime: 15,
    category: 'Prompt Engineering',
    difficulty: 'Advanced',
  };

  return (
    <Layout
      title={`${tutorialMeta.title} | Nano Banana Tutorial`}
      description={tutorialMeta.description}
      keywords="nano banana prompt engineering, nano banana prompts, nano banana tutorial, prompt techniques, nano banana examples, how to use nano banana"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering Nano Banana Prompts</h2>
              <p className="text-lg text-gray-700 mb-4">
                Prompt engineering is the key to unlocking Nano Banana's full potential. Unlike other AI models, Nano Banana requires precise, specific prompts to achieve the best results while maintaining image integrity.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This advanced tutorial covers sophisticated prompting techniques that will help you achieve consistent, high-quality results every time.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Prompting Principles</h2>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Specificity is Key</h3>
                  <p className="text-gray-700 mb-4">
                    Nano Banana performs best with highly specific instructions. The more precise your prompt, the better the results.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Good:</strong></p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Transform the sunny beach background to a snowy mountain scene while keeping the people in the foreground exactly as they are, maintaining the same lighting direction and intensity</code>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 mt-2">
                    <p className="text-sm text-red-600 mb-2"><strong>Avoid:</strong></p>
                    <code className="text-sm bg-red-100 px-2 py-1 rounded">Change the background</code>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Preservation Instructions</h3>
                  <p className="text-gray-700 mb-4">
                    Always specify what should remain unchanged to maintain image coherence and quality.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong></p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Replace "Old Company" with "New Company" while keeping the logo, background, font style, and all other elements exactly the same</code>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Context Awareness</h3>
                  <p className="text-gray-700 mb-4">
                    Consider the overall context and style of your image when crafting prompts.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong></p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Add a vintage car to the scene while maintaining the same artistic style, color palette, and lighting conditions as the original image</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prompt Templates for Common Tasks</h2>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Text Replacement Template</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Replace "[EXACT_ORIGINAL_TEXT]" with "[NEW_TEXT]" while keeping [SPECIFIC_ELEMENTS_TO_PRESERVE] exactly the same</code>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Scene Transformation Template</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Transform [SPECIFIC_AREA] from [CURRENT_STATE] to [DESIRED_STATE] while preserving [SUBJECTS/ELEMENTS] and maintaining [STYLE/LIGHTING/CONTEXT]</code>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Object Addition Template</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Add [OBJECT_DESCRIPTION] to [SPECIFIC_LOCATION] while maintaining the same [ARTISTIC_STYLE/COLOR_PALETTE/LIGHTING] as the original image</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Techniques</h2>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Step Instructions</h3>
                  <p className="text-gray-700 mb-4">
                    For complex edits, break down your prompt into clear, sequential steps.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong></p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">First, replace "March 2024" with "March 2025". Then, change the background from office to modern co-working space. Finally, ensure the person remains in the same position with consistent lighting.</code>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Style Consistency</h3>
                  <p className="text-gray-700 mb-4">
                    Maintain artistic consistency by referencing the original image's style elements.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong></p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">Replace the product name while maintaining the same vintage poster style, color scheme, and typography as the original design</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Vague Instructions</h3>
                  <p className="text-red-700 mb-2"><strong>Problem:</strong> "Make it look better" or "Change the background"</p>
                  <p className="text-red-700"><strong>Solution:</strong> Be specific about what to change and how</p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Ignoring Context</h3>
                  <p className="text-red-700 mb-2"><strong>Problem:</strong> Not considering the overall image style and context</p>
                  <p className="text-red-700"><strong>Solution:</strong> Always specify style preservation requirements</p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Over-complicating</h3>
                  <p className="text-red-700 mb-2"><strong>Problem:</strong> Trying to change too many things at once</p>
                  <p className="text-red-700"><strong>Solution:</strong> Break complex edits into smaller, focused steps</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <Link href="/tutorials/getting-started" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <FiArrowLeft className="mr-2" />
                <span>Previous: Getting Started</span>
              </Link>
              <Link href="/tutorials/text-replacement" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <span>Next: Text Replacement</span>
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
