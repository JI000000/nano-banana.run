import React from 'react';
import Layout from '../../components/Layout';
import { FiZap, FiClock, FiStar, FiBook, FiPlay, FiDownload, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import LazyImage from '../../components/LazyImage';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  tags: string[];
  featured: boolean;
  prompt: string;
  resultImage: string;
}

const TUTORIALS: Tutorial[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with AI Image Generation',
    description: 'Learn the basics of creating stunning AI-generated images with Nano Banana. Perfect for beginners.',
    category: 'Basics',
    difficulty: 'Beginner',
    duration: '10 min',
    image: '/images/tutorials/tutorial-getting-started.jpg',
    tags: ['basics', 'beginner', 'introduction'],
    featured: true,
    prompt: 'A beautiful sunset over mountains, digital art style, high quality, detailed',
    resultImage: '/images/examples/result-1.jpg'
  },
  {
    id: 'prompt-engineering',
    title: 'Mastering Prompt Engineering',
    description: 'Discover advanced techniques for writing effective prompts that produce amazing results.',
    category: 'Advanced',
    difficulty: 'Advanced',
    duration: '15 min',
    image: '/images/tutorials/tutorial-text-replacement.jpg',
    tags: ['prompts', 'advanced', 'techniques'],
    featured: true,
    prompt: 'A cyberpunk cityscape at night with neon lights, towering skyscrapers, flying cars, atmospheric mood, digital art style, 4K quality',
    resultImage: '/images/examples/result-2.jpg'
  },
  {
    id: 'style-matching',
    title: 'Style Matching and Consistency',
    description: 'Learn how to maintain consistent styles across multiple image generations.',
    category: 'Techniques',
    difficulty: 'Intermediate',
    duration: '12 min',
    image: '/images/tutorials/tutorial-style-matching.jpg',
    tags: ['style', 'consistency', 'techniques'],
    featured: false,
    prompt: 'A fantasy warrior in ornate armor, cinematic lighting, epic atmosphere, detailed textures',
    resultImage: '/images/examples/result-3.jpg'
  },
  {
    id: 'scene-transformation',
    title: 'Scene Transformation Techniques',
    description: 'Transform existing images into completely new scenes while preserving key elements.',
    category: 'Advanced',
    difficulty: 'Advanced',
    duration: '18 min',
    image: '/images/tutorials/tutorial-scene-transformation.jpg',
    tags: ['transformation', 'advanced', 'editing'],
    featured: false,
    prompt: 'A futuristic spaceship exploring deep space, colorful nebulas, distant planets, sci-fi art style',
    resultImage: '/images/examples/result-4.jpg'
  },
  {
    id: 'product-photography',
    title: 'AI Product Photography',
    description: 'Create professional product images for e-commerce and marketing materials.',
    category: 'Business',
    difficulty: 'Intermediate',
    duration: '14 min',
    image: '/images/tutorials/tutorial-product-photography.jpg',
    tags: ['business', 'product', 'photography'],
    featured: false,
    prompt: 'Professional product photography of a modern smartphone, clean background, studio lighting, high resolution',
    resultImage: '/images/examples/result-1.jpg'
  },
  {
    id: 'batch-processing',
    title: 'Batch Processing for Efficiency',
    description: 'Learn how to process multiple images efficiently for large-scale projects.',
    category: 'Workflow',
    difficulty: 'Intermediate',
    duration: '20 min',
    image: '/images/tutorials/tutorial-batch-processing.jpg',
    tags: ['workflow', 'efficiency', 'batch'],
    featured: false,
    prompt: 'A magical forest with glowing mushrooms, fairy lights, mystical creatures, fantasy art style',
    resultImage: '/images/examples/result-2.jpg'
  }
];

const CATEGORIES = ['All', 'Basics', 'Advanced', 'Techniques', 'Business', 'Workflow'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

export default function TutorialsIndex() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Image Generation Tutorials - Nano Banana",
    "description": "Learn AI image generation with comprehensive tutorials, prompt engineering tips, and advanced techniques.",
    "url": "https://nano-banana.run/tutorials"
  };

  return (
    <Layout
      title="AI Image Generation Tutorials - Learn Advanced Techniques | Nano Banana"
      description="Master AI image generation with our comprehensive tutorials. Learn prompt engineering, style matching, scene transformation, and more advanced techniques."
      keywords="AI tutorials, prompt engineering, image generation tips, AI art techniques, Nano Banana tutorials"
      structuredData={websiteSchema}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Image Generation Tutorials
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Master the art of AI image generation with expert tutorials and techniques
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiBook className="w-4 h-4 inline mr-2" />
              {TUTORIALS.length} Tutorials
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiClock className="w-4 h-4 inline mr-2" />
              Avg. 15 min each
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiUsers className="w-4 h-4 inline mr-2" />
              10K+ Students
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Tutorials
            </h2>
            <p className="text-xl text-gray-600">
              Start with these essential tutorials to master AI image generation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TUTORIALS.filter(t => t.featured).map((tutorial) => (
              <div key={tutorial.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tutorial.description}
                  </p>

                  {/* Example Result */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Example Result:</h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src={tutorial.resultImage}
                        alt="Example result"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 line-clamp-2">
                          "{tutorial.prompt}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tutorial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/tutorials/${tutorial.id}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <FiPlay className="w-4 h-4 mr-2" />
                    Start Tutorial
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Tutorials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Tutorials
            </h2>
            <p className="text-xl text-gray-600">
              Explore our complete collection of tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TUTORIALS.map((tutorial) => (
              <div key={tutorial.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <LazyImage
                    src={tutorial.image}
                    alt={tutorial.title}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {tutorial.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">{tutorial.category}</span>
                    <span className="text-xs text-gray-500">{tutorial.duration}</span>
                  </div>

                  <Link
                    href={`/tutorials/${tutorial.id}`}
                    className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <FiBook className="w-4 h-4 mr-2" />
                    Read Tutorial
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Tips for Better Results
            </h2>
            <p className="text-xl text-gray-600">
              Essential tips to improve your AI image generation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Be Specific</h3>
              <p className="text-gray-600">
                Include details about style, mood, lighting, and composition in your prompts
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Use Quality Keywords</h3>
              <p className="text-gray-600">
                Add terms like "high quality", "detailed", "4K", "professional" for better results
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiment</h3>
              <p className="text-gray-600">
                Try different variations and combinations to discover what works best
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Put your new skills to the test with our AI image generator
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/try-generator"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <FiZap className="w-5 h-5 mr-2" />
              Start Creating Now
            </Link>
            <Link
              href="/showcase"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              View Showcase
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
