import React from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function GettingStartedTutorial() {
  const tutorialMeta = {
    title: 'Getting Started with Nano-Banana AI',
    description: 'Learn the basics of Nano-Banana AI model, how to access it, and start creating your first edits with simple prompts.',
    publishDate: 'August 15, 2025',
    author: 'Nano-Banana Team',
    readTime: 10,
    category: 'Basics',
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
            {/* Table of Contents */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li><a href="#introduction" className="text-primary-600 hover:text-primary-800">Introduction to Nano-Banana</a></li>
                <li><a href="#accessing" className="text-primary-600 hover:text-primary-800">Accessing Nano-Banana on LMarena</a></li>
                <li><a href="#interface" className="text-primary-600 hover:text-primary-800">Understanding the Interface</a></li>
                <li><a href="#first-edit" className="text-primary-600 hover:text-primary-800">Creating Your First Edit</a></li>
                <li><a href="#prompt-tips" className="text-primary-600 hover:text-primary-800">Prompt Engineering Tips</a></li>
                <li><a href="#next-steps" className="text-primary-600 hover:text-primary-800">Next Steps</a></li>
              </ol>
            </div>
            
            {/* Introduction */}
            <div id="introduction" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction to Nano-Banana</h2>
              
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                  [Placeholder for Nano-Banana introduction image]
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-4">
                Nano-Banana is a cutting-edge AI image editing model that has quickly gained attention for its exceptional capabilities in precise text replacement, scene transformations, and style-matched editing. Unlike many other AI image models that often regenerate entire images when making edits, Nano-Banana excels at making targeted changes while preserving the original context and elements.
              </p>
              
              <p className="text-lg text-gray-700 mb-4">
                In this tutorial, we'll walk you through the basics of accessing and using Nano-Banana, helping you create your first edits and understand the model's strengths and capabilities.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> As AI models evolve rapidly, the interface and capabilities described here may change over time. We'll strive to keep this tutorial updated, but always refer to the official documentation when in doubt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accessing Nano-Banana */}
            <div id="accessing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessing Nano-Banana on LMarena</h2>
              
              <p className="text-lg text-gray-700 mb-4">
                Currently, Nano-Banana is available through the LMarena platform. Here's how to access it:
              </p>
              
              <ol className="list-decimal pl-6 space-y-4 mb-6">
                <li className="text-lg text-gray-700">
                  <strong>Create an account:</strong> Visit <a href="https://lmarena.ai" className="text-primary-600 hover:text-primary-800">LMarena.ai</a> and sign up for an account if you don't already have one.
                </li>
                <li className="text-lg text-gray-700">
                  <strong>Navigate to the Image Models:</strong> Once logged in, look for the "Image Models" or "Image Editing" section in the main navigation.
                </li>
                <li className="text-lg text-gray-700">
                  <strong>Select Nano-Banana:</strong> From the list of available models, find and select "nano-banana" (sometimes listed as "nano banana" without the hyphen).
                </li>
                <li className="text-lg text-gray-700">
                  <strong>Check usage limits:</strong> Depending on your account type, there may be daily usage limits or credits required to use the model. Be sure to check these before starting your project.
                </li>
              </ol>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Free vs. Paid Access</h3>
                <p className="text-gray-700 mb-4">
                  LMarena typically offers different tiers of access:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700">
                    <strong>Free tier:</strong> Limited number of operations per day (usually 5-10 image edits)
                  </li>
                  <li className="text-gray-700">
                    <strong>Basic subscription:</strong> Increased daily limit and access to higher resolution outputs
                  </li>
                  <li className="text-gray-700">
                    <strong>Professional tier:</strong> Higher usage limits, priority processing, and access to additional features
                  </li>
                </ul>
              </div>
              
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                  [Placeholder for LMarena interface screenshot showing how to access Nano-Banana]
                </div>
              </div>
            </div>
            
            {/* Understanding the Interface */}
            <div id="interface" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Interface</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Once you've accessed Nano-Banana, you'll see the main interface which typically consists of these key components:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Image Upload Area</h3>
                  <p className="text-gray-700">
                    This is where you'll upload your source image for editing. You can usually drag and drop files or use the file browser. Supported formats typically include JPG, PNG, and WebP.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Prompt Field</h3>
                  <p className="text-gray-700">
                    Here you'll enter text instructions for your desired edits. The way you phrase these prompts significantly impacts the results you'll get.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Settings Panel</h3>
                  <p className="text-gray-700">
                    This area contains various settings that control how the model processes your image, including options for output resolution, generation strength, and other parameters.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Results Display</h3>
                  <p className="text-gray-700">
                    After processing, this section will show your edited image result, often with options to download, regenerate, or make further adjustments.
                  </p>
                </div>
              </div>
              
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                  [Placeholder for Nano-Banana interface overview diagram]
                </div>
              </div>
            </div>
            
            {/* Creating Your First Edit */}
            <div id="first-edit" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your First Edit</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Let's walk through a simple text replacement exercise, one of Nano‑Banana's strongest capabilities. You can also <Link href="/image-editor?mode=text" className="text-primary-600 hover:text-primary-800">open the editor preset</Link> and follow the same steps.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step: Text Replacement</h3>
                
                <ol className="list-decimal pl-6 space-y-4">
                  <li className="text-gray-700">
                    <strong>Upload an image</strong> that contains visible text, such as a sign, poster, or product packaging.
                  </li>
                  <li className="text-gray-700">
                    <strong>In the prompt field,</strong> enter something like: <code className="bg-gray-100 px-2 py-1 rounded">Replace the text "ORIGINAL TEXT" with "NEW TEXT"</code>
                    <p className="mt-2 text-sm text-gray-600">Replace "ORIGINAL TEXT" with the exact text in your image, and "NEW TEXT" with what you'd like it to say.</p>
                  </li>
                  <li className="text-gray-700">
                    <strong>Adjust settings if needed</strong> - for text replacement, the default settings usually work well, but you might want to decrease the strength if you notice any unwanted changes to other parts of the image.
                  </li>
                  <li className="text-gray-700">
                    <strong>Click the "Generate" button</strong> and wait for the result. This typically takes just a few seconds.
                  </li>
                  <li className="text-gray-700">
                    <strong>Review the result</strong> to ensure the text has been replaced correctly while preserving the surrounding elements.
                  </li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                    [Before: Original image with text]
                  </div>
                </div>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                    [After: Image with replaced text]
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      <strong>Success Tip:</strong> For the best results with text replacement, make sure your input image is high resolution and the text is clearly visible. Nano-Banana performs best when it can clearly identify all characters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Prompt Engineering Tips */}
            <div id="prompt-tips" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prompt Engineering Tips</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                The way you phrase your prompts has a significant impact on the results you get from Nano-Banana. Here are some tips for effective prompts:
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Effective Prompting Techniques</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">1</span>
                    <div>
                      <strong className="text-gray-900">Be specific and clear</strong>
                      <p className="text-gray-700 mt-1">Instead of "change the background," use "change the background to a snowy mountain landscape with pine trees."</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">2</span>
                    <div>
                      <strong className="text-gray-900">Use precise verbs</strong>
                      <p className="text-gray-700 mt-1">Specify exactly what you want: "replace," "transform," "convert," or "change" have slightly different effects.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">3</span>
                    <div>
                      <strong className="text-gray-900">Include preservation instructions</strong>
                      <p className="text-gray-700 mt-1">Explicitly state what should remain unchanged: "Replace the text while preserving the logo and background exactly."</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">4</span>
                    <div>
                      <strong className="text-gray-900">Use quotation marks for exact text</strong>
                      <p className="text-gray-700 mt-1">When replacing text, put the original and new text in quotes: 'Replace "Hello" with "Welcome"'</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3 mt-1">5</span>
                    <div>
                      <strong className="text-gray-900">Mention style consistency</strong>
                      <p className="text-gray-700 mt-1">Include "maintain the same artistic style" or "keep consistent with the original image" for better results.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Example:</strong> "Transform the sunny beach background to a snowy mountain scene while keeping the people in the foreground exactly as they are. Maintain the same lighting direction and intensity."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div id="next-steps" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Now that you've learned the basics, here are some suggestions for what to explore next:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Link href="/tutorials/text-replacement" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Mastering Text Replacement</h3>
                  <p className="text-gray-700">
                    Learn advanced techniques for perfect text replacement across various fonts, styles, and backgrounds.
                  </p>
                </Link>
                <Link href="/tutorials/scene-transformation" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Advanced Scene Transformations</h3>
                  <p className="text-gray-700">
                    Discover how to completely change environments while preserving subjects and maintaining visual coherence.
                  </p>
                </Link>
                <Link href="/tutorials/style-matching" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Perfect Style Matching</h3>
                  <p className="text-gray-700">
                    Learn techniques for ensuring new elements blend seamlessly with existing images.
                  </p>
                </Link>
                <Link href="/examples" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">Browse Examples</h3>
                  <p className="text-gray-700">
                    See a gallery of Nano-Banana examples across different use cases and industries.
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
              <Link href="/tutorials/text-replacement" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <span>Next Tutorial: Mastering Text Replacement</span>
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
