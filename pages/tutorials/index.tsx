import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import TutorialCard from '../../components/TutorialCard';
import { FiFilter, FiX } from 'react-icons/fi';

// Tutorial type definition
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  slug: string;
  imagePath: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  date: string;
}

// Tutorial data
const tutorials: Tutorial[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Nano-Banana',
    description: 'Learn the basics of Nano-Banana AI model, how to access it, and start creating your first edits with simple prompts.',
    slug: 'getting-started',
    imagePath: '/images/tutorial-getting-started.jpg',
    readTime: 10,
    difficulty: 'Beginner',
    category: 'Basics',
    date: 'August 15, 2025',
  },
  {
    id: 'text-replacement',
    title: 'Mastering Text Replacement',
    description: 'Discover advanced techniques for perfect text replacement, including matching fonts, maintaining backgrounds, and preserving design elements.',
    slug: 'text-replacement',
    imagePath: '/images/tutorial-text-replacement.jpg',
    readTime: 15,
    difficulty: 'Intermediate',
    category: 'Text Editing',
    date: 'August 14, 2025',
  },
  {
    id: 'scene-transformation',
    title: 'Advanced Scene Transformations',
    description: 'Take your scene editing to the next level with expert techniques for maintaining subject integrity while completely changing environments.',
    slug: 'scene-transformation',
    imagePath: '/images/tutorial-scene-transformation.jpg',
    readTime: 20,
    difficulty: 'Advanced',
    category: 'Scene Editing',
    date: 'August 12, 2025',
  },
  {
    id: 'style-matching',
    title: 'Perfect Style Matching in Image Edits',
    description: 'Learn how to ensure new elements blend seamlessly with existing images by matching style, lighting, and texture perfectly.',
    slug: 'style-matching',
    imagePath: '/images/tutorial-style-matching.jpg',
    readTime: 15,
    difficulty: 'Intermediate',
    category: 'Style',
    date: 'August 10, 2025',
  },
  {
    id: 'batch-processing',
    title: 'Batch Processing with Nano-Banana',
    description: 'Optimize your workflow by processing multiple images at once while maintaining consistency across your edits.',
    slug: 'batch-processing',
    imagePath: '/images/tutorial-batch-processing.jpg',
    readTime: 12,
    difficulty: 'Intermediate',
    category: 'Workflow',
    date: 'August 8, 2025',
  },
  {
    id: 'product-photography',
    title: 'Creating Perfect Product Photos',
    description: 'Use Nano-Banana to transform basic product shots into professional marketing materials with various backgrounds and settings.',
    slug: 'product-photography',
    imagePath: '/images/tutorial-product-photography.jpg',
    readTime: 18,
    difficulty: 'Intermediate',
    category: 'E-commerce',
    date: 'August 6, 2025',
  },
];

export default function Tutorials() {
  // Filter states
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(tutorials.map(t => t.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter tutorials
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = activeCategory === 'All' || tutorial.category === activeCategory;
    const matchesDifficulty = activeDifficulty === 'All' || tutorial.difficulty === activeDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <Layout
      title="Nano-Banana AI Tutorials | Learn Image Editing Techniques"
      description="Explore tutorials for the Nano-Banana AI image model. Learn text replacement, scene transformation, style matching and more with our step-by-step guides."
      keywords="nano-banana tutorials, AI image editing tutorials, nano-banana guides, text replacement tutorial, scene transformation guide"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Nano-Banana Tutorials</h1>
            <p className="text-xl text-primary-50">
              Master the art of AI image editing with our comprehensive guides
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section">
        <div className="container">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-6">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <span className="font-medium text-gray-700">Filters</span>
              {isFilterOpen ? <FiX /> : <FiFilter />}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - always visible on desktop, toggleable on mobile */}
            <div className={`md:w-1/4 lg:w-1/5 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`block w-full text-left px-2 py-1 rounded ${
                          activeCategory === category
                            ? 'bg-primary-100 text-primary-800 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Difficulty</h3>
                  <div className="space-y-1">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setActiveDifficulty(difficulty)}
                        className={`block w-full text-left px-2 py-1 rounded ${
                          activeDifficulty === difficulty
                            ? 'bg-primary-100 text-primary-800 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tutorial List */}
            <div className="md:w-3/4 lg:w-4/5">
              {filteredTutorials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials.map((tutorial) => (
                    <TutorialCard
                      key={tutorial.id}
                      title={tutorial.title}
                      description={tutorial.description}
                      imagePath={tutorial.imagePath}
                      slug={tutorial.slug}
                      readTime={tutorial.readTime}
                      difficulty={tutorial.difficulty}
                      date={tutorial.date}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tutorials match the selected filters.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setActiveDifficulty('All');
                    }}
                    className="mt-4 text-primary-600 hover:text-primary-800"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Have a specific question or need help with a particular editing technique?
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'itemListElement': tutorials.map((tutorial, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'item': {
                '@type': 'Article',
                'name': tutorial.title,
                'description': tutorial.description,
                'url': `https://nano-banana.run/tutorials/${tutorial.slug}`
              }
            }))
          })
        }}
      />
    </Layout>
  );
}
