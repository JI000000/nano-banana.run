import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight, FiExternalLink, FiCode } from 'react-icons/fi';

export default function ApiGuideTutorial() {
  const tutorialMeta = {
    title: 'Nano Banana API - Developer Guide',
    description: 'Learn how to integrate Nano Banana into your applications using the API. Includes pricing, rate limits, and code examples.',
    publishDate: 'September 5, 2025',
    author: 'Nano Banana Team',
    readTime: 8,
    category: 'Technical',
    difficulty: 'Intermediate',
  };

  return (
    <Layout
      title={`${tutorialMeta.title} | Nano Banana Tutorial`}
      description={tutorialMeta.description}
      keywords="nano banana api, nano banana developer, nano banana integration, nano banana pricing, nano banana code examples"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nano Banana API Integration</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Integrate Nano Banana into your applications using the official API. This guide covers everything developers need to know.
              </p>
            </div>
            
            {/* Getting Started */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
              
              <p className="text-lg text-gray-700 mb-4">
                To use the Nano Banana API:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li className="text-gray-700">Get your API key from Google AI Studio</li>
                <li className="text-gray-700">Set up authentication in your application</li>
                <li className="text-gray-700">Make your first API call</li>
                <li className="text-gray-700">Handle responses and errors</li>
              </ol>
            </div>

            {/* API Endpoints */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Endpoints</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FiCode className="w-4 h-4 mr-3 text-primary-600" />
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded">POST /v1/images/edit</span>
                    <span className="ml-3 text-gray-600">General image editing</span>
                  </li>
                  <li className="flex items-center">
                    <FiCode className="w-4 h-4 mr-3 text-primary-600" />
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded">POST /v1/images/text-replace</span>
                    <span className="ml-3 text-gray-600">Text replacement</span>
                  </li>
                  <li className="flex items-center">
                    <FiCode className="w-4 h-4 mr-3 text-primary-600" />
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded">POST /v1/images/style-transfer</span>
                    <span className="ml-3 text-gray-600">Style transfer</span>
                  </li>
                  <li className="flex items-center">
                    <FiCode className="w-4 h-4 mr-3 text-primary-600" />
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded">POST /v1/images/remove-object</span>
                    <span className="ml-3 text-gray-600">Object removal</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing & Limits */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing & Limits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Tier</h3>
                  <div className="text-2xl font-bold text-primary-600 mb-2">$0/month</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 100 requests per month</li>
                    <li>• Standard resolution</li>
                    <li>• Community support</li>
                  </ul>
                </div>
                
                <div className="bg-white border-2 border-primary-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Plan</h3>
                  <div className="text-2xl font-bold text-primary-600 mb-2">$10/month</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1,000 requests per month</li>
                    <li>• High resolution output</li>
                    <li>• Email support</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Plan</h3>
                  <div className="text-2xl font-bold text-primary-600 mb-2">$50/month</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 10,000 requests per month</li>
                    <li>• 4K resolution output</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Rate Limits:</strong> 10 requests per minute across all plans. File size limit: 10MB per image.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h2>
              
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Python Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`import requests

def edit_image(image_path, prompt):
    url = "https://api.nanobanana.ai/v1/images/edit"
    headers = {"Authorization": "Bearer YOUR_API_KEY"}
    
    with open(image_path, 'rb') as f:
        files = {'image': f}
        data = {'prompt': prompt}
        response = requests.post(url, headers=headers, files=files, data=data)
    
    return response.json()

# Usage
result = edit_image('input.jpg', 'Replace "Hello" with "Welcome"')
print(result)`}
                </pre>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">JavaScript Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`const editImage = async (imageFile, prompt) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('prompt', prompt);
  
  const response = await fetch('https://api.nanobanana.ai/v1/images/edit', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  });
  
  return await response.json();
};

// Usage
const result = await editImage(imageFile, 'Replace "Hello" with "Welcome"');
console.log(result);`}
                </pre>
              </div>
            </div>

            {/* Error Handling */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Common Error Codes</h3>
                <ul className="space-y-2 text-red-700">
                  <li><strong>400 Bad Request:</strong> Invalid prompt or image format</li>
                  <li><strong>401 Unauthorized:</strong> Invalid or missing API key</li>
                  <li><strong>429 Too Many Requests:</strong> Rate limit exceeded</li>
                  <li><strong>500 Internal Server Error:</strong> Server-side processing error</li>
                </ul>
              </div>
            </div>

            {/* Best Practices */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Development Tips</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Always validate input images before sending to API</li>
                  <li>• Implement proper error handling and retry logic</li>
                  <li>• Cache results when possible to reduce API calls</li>
                  <li>• Use webhooks for long-running operations</li>
                  <li>• Monitor your usage to avoid hitting rate limits</li>
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
                    Nano Banana API specialists providing technical integration guidance.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <Link href="/tutorials/examples" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <FiArrowLeft className="mr-2" />
                <span>Previous: Examples</span>
              </Link>
              <Link href="/tutorials/comparison" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <span>Next: Tool Comparison</span>
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
