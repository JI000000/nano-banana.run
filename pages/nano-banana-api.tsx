import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiCode, FiCopy, FiCheck, FiExternalLink, FiZap, FiDollarSign, FiClock, FiShield } from 'react-icons/fi';

export default function NanoBananaAPI() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    python: `import requests
import base64

# Nano Banana API Example
def edit_image_with_nano_banana(image_path, prompt):
    # Read and encode image
    with open(image_path, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode()
    
    # API request
    response = requests.post(
        'https://api.nano-banana.run/v1/edit',
        headers={
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        json={
            'image': image_data,
            'prompt': prompt,
            'model': 'nano-banana-v1'
        }
    )
    
    return response.json()

# Usage
result = edit_image_with_nano_banana(
    'input.jpg', 
    'Replace "Old Text" with "New Text"'
)
print(result['edited_image_url'])`,
    
    javascript: `// Nano Banana API Example
const editImageWithNanoBanana = async (imageFile, prompt) => {
  // Convert image to base64
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(imageFile);
  });

  // API request
  const response = await fetch('https://api.nano-banana.run/v1/edit', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: base64,
      prompt: prompt,
      model: 'nano-banana-v1'
    })
  });

  return await response.json();
};

// Usage
const result = await editImageWithNanoBanana(
  imageFile, 
  'Replace "Old Text" with "New Text"'
);
console.log(result.edited_image_url);`,
    
    curl: `# Nano Banana API Example
curl -X POST https://api.nano-banana.run/v1/edit \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "base64_encoded_image_data",
    "prompt": "Replace \"Old Text\" with \"New Text\"",
    "model": "nano-banana-v1"
  }'`
  };

  const pricingTiers = [
    {
      name: 'Free Tier',
      price: '$0',
      requests: '100/month',
      features: [
        '100 API requests per month',
        'Basic image editing',
        'Community support',
        'Standard processing time'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      requests: '10,000/month',
      features: [
        '10,000 API requests per month',
        'Advanced image editing',
        'Priority support',
        'Faster processing',
        'Batch processing'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      requests: 'Unlimited',
      features: [
        'Unlimited API requests',
        'Custom model training',
        'Dedicated support',
        'SLA guarantee',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/v1/edit',
      description: 'Edit an image with text replacement or scene transformation',
      parameters: [
        { name: 'image', type: 'string', required: true, description: 'Base64 encoded image data' },
        { name: 'prompt', type: 'string', required: true, description: 'Natural language editing instruction' },
        { name: 'model', type: 'string', required: false, description: 'Model version (default: nano-banana-v1)' }
      ]
    },
    {
      method: 'POST',
      endpoint: '/v1/batch',
      description: 'Process multiple images with the same prompt',
      parameters: [
        { name: 'images', type: 'array', required: true, description: 'Array of base64 encoded images' },
        { name: 'prompt', type: 'string', required: true, description: 'Natural language editing instruction' },
        { name: 'model', type: 'string', required: false, description: 'Model version (default: nano-banana-v1)' }
      ]
    },
    {
      method: 'GET',
      endpoint: '/v1/models',
      description: 'List available models and their capabilities',
      parameters: []
    }
  ];

  return (
    <Layout
      title="Nano Banana API - Developer Guide & Documentation | Nano Banana API Pricing"
      description="Nano banana API documentation and developer guide. Learn how to integrate nano banana API into your applications. Get nano banana API pricing, examples, and access nano banana API for text replacement and image editing."
      keywords="nano banana api, nano banana api pricing, nano banana api documentation, nano banana api guide, nano banana api examples, nano banana api access, nano banana api key, nano banana api integration, nano banana api tutorial, nano banana api python, nano banana api javascript, nano banana api curl, nano banana api free, nano banana api cost, nano banana api rate limit, nano banana api endpoint, nano banana api response, nano banana api error, nano banana api support, nano banana api status, nano banana api version, nano banana api model, nano banana api batch, nano banana api text replacement, nano banana api scene transformation, nano banana api image editing, nano banana api developer, nano banana api sdk, nano banana api wrapper, nano banana api library, nano banana api framework"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "APIReference",
        "name": "Nano Banana API",
        "description": "API for accessing Nano Banana AI image editing capabilities",
        "url": "https://nano-banana.run/nano-banana-api",
        "provider": {
          "@type": "Organization",
          "name": "Nano-Banana.Run"
        }
      }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nano Banana API - Developer Guide
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Integrate Nano Banana's powerful AI image editing capabilities into your applications. Access nano banana API for text replacement, scene transformation, and advanced image editing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#get-started" className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                <FiCode className="w-5 h-5 mr-2" />
                Get Started
              </Link>
              <Link href="#pricing" className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg hover:bg-primary-600/30 transition-colors font-semibold">
                <FiDollarSign className="w-5 h-5 mr-2" />
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="get-started" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
              <p className="text-lg text-gray-600">
                Get up and running with Nano Banana API in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">1. Get Your API Key</h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    Sign up for a free account and get your API key from the dashboard.
                  </p>
                  <Link href="/signup" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Get API Key
                  </Link>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-6">2. Make Your First Request</h3>
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Python Example</span>
                    <button
                      onClick={() => copyToClipboard(codeExamples.python, 'python')}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === 'python' ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap">{codeExamples.python}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">3. Response Format</h3>
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`{
  "success": true,
  "edited_image_url": "https://cdn.nano-banana.run/result.jpg",
  "processing_time": 2.3,
  "model_used": "nano-banana-v1",
  "request_id": "req_123456789"
}`}</pre>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Pro Tip</h4>
                  <p className="text-blue-800 text-sm">
                    Use specific prompts for better results. Instead of "change the text", use "Replace 'Old Text' with 'New Text' while keeping the background identical".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Code Examples</h2>
            
            <div className="space-y-8">
              {Object.entries(codeExamples).map(([language, code]) => (
                <div key={language} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-800 px-6 py-3 flex justify-between items-center">
                    <h3 className="text-white font-semibold capitalize">{language}</h3>
                    <button
                      onClick={() => copyToClipboard(code, language)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === language ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-6">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">{code}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">API Endpoints</h2>
            
            <div className="space-y-8">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium mr-4 ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                      {endpoint.endpoint}
                    </code>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{endpoint.description}</p>
                  
                  {endpoint.parameters.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Parameters</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 font-semibold text-gray-900">Name</th>
                              <th className="text-left py-2 font-semibold text-gray-900">Type</th>
                              <th className="text-left py-2 font-semibold text-gray-900">Required</th>
                              <th className="text-left py-2 font-semibold text-gray-900">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.parameters.map((param, paramIndex) => (
                              <tr key={paramIndex} className="border-b border-gray-100">
                                <td className="py-2 font-mono text-gray-800">{param.name}</td>
                                <td className="py-2 text-gray-600">{param.type}</td>
                                <td className="py-2">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    param.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {param.required ? 'Required' : 'Optional'}
                                  </span>
                                </td>
                                <td className="py-2 text-gray-600">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nano Banana API Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <div key={index} className={`bg-white rounded-lg shadow-lg p-8 relative ${
                  tier.popular ? 'border-2 border-primary-500' : ''
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">{tier.price}</div>
                    <p className="text-gray-600">{tier.requests}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <FiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">API Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiZap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-gray-600">Average response time under 3 seconds</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">Enterprise-grade security and 99.9% uptime</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock technical support</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCode className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Integration</h3>
                <p className="text-gray-600">Simple REST API with comprehensive documentation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Start building with Nano Banana API today. Get your free API key and begin creating amazing image editing applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                <FiCode className="w-5 h-5 mr-2" />
                Get API Key
              </Link>
              <Link href="/docs" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold">
                <FiExternalLink className="w-5 h-5 mr-2" />
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
