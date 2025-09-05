import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft, FiArrowRight, FiExternalLink } from 'react-icons/fi';

export default function ExamplesTutorial() {
  const tutorialMeta = {
    title: 'Nano Banana Examples - Real Use Cases',
    description: 'See real examples of Nano Banana in action. Learn from successful projects and get inspiration for your own edits.',
    publishDate: 'September 5, 2025',
    author: 'Nano Banana Team',
    readTime: 7,
    category: 'Examples',
    difficulty: 'Beginner',
  };

  return (
    <Layout
      title={`${tutorialMeta.title} | Nano Banana Tutorial`}
      description={tutorialMeta.description}
      keywords="nano banana examples, nano banana use cases, nano banana projects, nano banana inspiration, nano banana applications"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nano Banana Examples & Use Cases</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Explore real-world examples of Nano Banana in action. These examples show the practical applications and creative possibilities.
              </p>
            </div>
            
            {/* Business & Marketing */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business & Marketing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Sign Updates</h3>
                  <p className="text-gray-600 mb-4">Change business names, hours, or contact information on existing storefront photos.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Replace 'Old Store Name' with 'New Store Name' in the same font style and color"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Photography</h3>
                  <p className="text-gray-600 mb-4">Update product labels, prices, or descriptions in marketing materials.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Change the price from '$19.99' to '$24.99' maintaining the same styling"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media</h3>
                  <p className="text-gray-600 mb-4">Create engaging posts with custom text overlays and captions.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Add the text 'SALE 50% OFF' in bold red letters at the top of the image"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Estate</h3>
                  <p className="text-gray-600 mb-4">Remove or add objects in property photos to enhance listings.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Remove the car from the driveway and add a beautiful garden instead"
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Projects */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Creative Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Art Creation</h3>
                  <p className="text-gray-600 mb-4">Transform photos into different artistic styles while maintaining composition.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Convert this photo to watercolor painting style while keeping the same composition"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Scene Composition</h3>
                  <p className="text-gray-600 mb-4">Add or remove elements to create new scenes and narratives.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Add a rainbow in the sky behind the mountains, keeping everything else the same"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Character Design</h3>
                  <p className="text-gray-600 mb-4">Modify clothing, accessories, or backgrounds in character photos.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Change the person's shirt from blue to red while keeping the same style and fit"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Historical Recreation</h3>
                  <p className="text-gray-600 mb-4">Update modern photos to look historical or vintage.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Make this modern street scene look like it's from the 1920s, keeping the same layout"
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Use */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Use</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo Editing</h3>
                  <p className="text-gray-600 mb-4">Remove unwanted objects or people from personal photos.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Remove the tourist in the background while keeping the landscape exactly the same"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Text Addition</h3>
                  <p className="text-gray-600 mb-4">Add captions or watermarks to personal photos.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Add 'Happy Birthday Mom!' in elegant script at the bottom of the photo"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Background Changes</h3>
                  <p className="text-gray-600 mb-4">Replace backgrounds in portraits for different moods.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Replace the indoor background with a beach sunset, keeping the person exactly the same"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Style Transfer</h3>
                  <p className="text-gray-600 mb-4">Apply artistic filters to personal photos.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Convert this family photo to oil painting style while preserving all faces clearly"
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Applications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Applications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce</h3>
                  <p className="text-gray-600 mb-4">Create product variations and lifestyle shots for online stores.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Change the product color from blue to green while keeping the same lighting and shadows"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Architecture</h3>
                  <p className="text-gray-600 mb-4">Visualize design changes in existing spaces.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Replace the wooden floor with marble tiles while keeping the same room layout"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Fashion</h3>
                  <p className="text-gray-600 mb-4">Create outfit variations and style concepts.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Change the model's dress from black to red while maintaining the same style and fit"
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-600 mb-4">Create visual learning materials and presentations.</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Example Prompt:</strong> "Add educational labels to this diagram while keeping the original design clean"
                  </div>
                </div>
              </div>
            </div>

            {/* Tips for Success */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Success</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Best Practices</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Be specific about what you want to change</li>
                  <li>• Use clear, descriptive language in your prompts</li>
                  <li>• Test different prompt variations for better results</li>
                  <li>• Start with simple edits before attempting complex changes</li>
                  <li>• Always specify what should remain unchanged</li>
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
                    Nano Banana specialists providing real-world examples and practical applications.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <Link href="/tutorials/text-replacement" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <FiArrowLeft className="mr-2" />
                <span>Previous: Text Replacement</span>
              </Link>
              <Link href="/tutorials/api-guide" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800">
                <span>Next: API Guide</span>
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
