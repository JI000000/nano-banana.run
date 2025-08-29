import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FiZap, FiClock, FiHeart, FiDownload, FiShare2, FiStar, FiFilter } from 'react-icons/fi';
import LazyImage from '../components/LazyImage';

interface ShowcaseItem {
  id: string;
  title: string;
  prompt: string;
  image: string;
  category: string;
  likes: number;
  processingTime: number;
  cost: number;
  tags: string[];
}

const SHOWCASE_DATA: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Cyberpunk Cityscape',
    prompt: 'A futuristic cyberpunk cityscape at night with neon lights, towering skyscrapers, flying cars, and a dark atmospheric mood, digital art style',
    image: '/images/examples/result-1.jpg',
    category: 'Digital Art',
    likes: 1247,
    processingTime: 28,
    cost: 0.002,
    tags: ['cyberpunk', 'cityscape', 'neon', 'futuristic']
  },
  {
    id: '2',
    title: 'Mountain Sunset',
    prompt: 'A beautiful sunset over snow-capped mountains with golden light, dramatic clouds, and a serene lake in the foreground, photorealistic style',
    image: '/images/examples/result-2.jpg',
    category: 'Photorealistic',
    likes: 892,
    processingTime: 31,
    cost: 0.002,
    tags: ['nature', 'sunset', 'mountains', 'landscape']
  },
  {
    id: '3',
    title: 'Fantasy Warrior',
    prompt: 'A powerful fantasy warrior in ornate armor with glowing magical weapons, epic lighting, and mystical background, cinematic style',
    image: '/images/examples/result-3.jpg',
    category: 'Fantasy',
    likes: 1563,
    processingTime: 25,
    cost: 0.002,
    tags: ['fantasy', 'warrior', 'armor', 'magical']
  },
  {
    id: '4',
    title: 'Space Exploration',
    prompt: 'A futuristic spaceship exploring deep space with colorful nebulas, distant planets, and cosmic phenomena, sci-fi art style',
    image: '/images/examples/result-4.jpg',
    category: 'Sci-Fi',
    likes: 734,
    processingTime: 33,
    cost: 0.002,
    tags: ['space', 'spaceship', 'nebula', 'sci-fi']
  },
  {
    id: '5',
    title: 'Magical Forest',
    prompt: 'An enchanted forest with glowing mushrooms, fairy lights, and mystical creatures, fantasy art style with ethereal lighting',
    image: '/images/examples/result-2.jpg',
    category: 'Fantasy',
    likes: 1102,
    processingTime: 29,
    cost: 0.002,
    tags: ['forest', 'magical', 'fantasy', 'ethereal']
  },
  {
    id: '6',
    title: 'Steampunk Robot',
    prompt: 'A detailed steampunk mechanical robot with brass gears, steam pipes, and Victorian aesthetic, industrial art style',
    image: '/images/examples/result-3.jpg',
    category: 'Steampunk',
    likes: 678,
    processingTime: 27,
    cost: 0.002,
    tags: ['steampunk', 'robot', 'mechanical', 'brass']
  },
  {
    id: '7',
    title: 'Underwater Scene',
    prompt: 'A vibrant underwater scene with coral reefs, tropical fish, and crystal clear water, marine photography style',
    image: '/images/examples/result-4.jpg',
    category: 'Nature',
    likes: 945,
    processingTime: 30,
    cost: 0.002,
    tags: ['underwater', 'coral', 'marine', 'tropical']
  },
  {
    id: '8',
    title: 'Apocalyptic Wasteland',
    prompt: 'A post-apocalyptic wasteland with ruins, dust storms, and survival elements, dystopian art style',
    image: '/images/examples/result-1.jpg',
    category: 'Dystopian',
    likes: 823,
    processingTime: 26,
    cost: 0.002,
    tags: ['apocalyptic', 'wasteland', 'ruins', 'dystopian']
  }
];

const CATEGORIES = ['All', 'Digital Art', 'Photorealistic', 'Fantasy', 'Sci-Fi', 'Steampunk', 'Nature', 'Dystopian'];

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'likes' | 'time' | 'cost'>('likes');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = SHOWCASE_DATA
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'time':
          return a.processingTime - b.processingTime;
        case 'cost':
          return a.cost - b.cost;
        default:
          return 0;
      }
    });

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Image Showcase - Nano Banana",
    "description": "Explore amazing AI-generated images created with Nano Banana. View prompts, processing times, and costs for each generation.",
    "url": "https://nano-banana.run/showcase"
  };

  return (
    <Layout
      title="AI Image Showcase - Explore Amazing Generations | Nano Banana"
      description="Discover incredible AI-generated images created with Nano Banana. Browse by category, view prompts, and get inspired for your own creations."
      keywords="AI image showcase, AI art gallery, prompt examples, image generation results, Nano Banana gallery"
      structuredData={websiteSchema}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Image Showcase
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Explore amazing AI-generated images and get inspired for your own creations
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiZap className="w-4 h-4 inline mr-2" />
              {SHOWCASE_DATA.length} Images
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiClock className="w-4 h-4 inline mr-2" />
              Avg. 29s Generation
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiStar className="w-4 h-4 inline mr-2" />
              $0.002 per Image
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search images, prompts, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FiFilter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'likes' | 'time' | 'cost')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="likes">Most Popular</option>
                <option value="time">Fastest</option>
                <option value="cost">Lowest Cost</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Image */}
                <div className="relative group">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                        <FiHeart className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                        <FiDownload className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                        <FiShare2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {item.prompt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiHeart className="w-4 h-4 mr-1" />
                      {item.likes.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {item.processingTime}s
                    </div>
                    <div className="flex items-center">
                      <FiZap className="w-4 h-4 mr-1" />
                      ${item.cost.toFixed(3)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <FiZap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Own?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of creators using Nano Banana to bring their ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              <FiZap className="w-5 h-5 inline mr-2" />
              Start Creating Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              View Tutorials
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
