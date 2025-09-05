import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiSearch, FiFilter, FiCopy, FiHeart, FiEye, FiDownload, FiStar, FiTrendingUp, FiBook, FiZap, FiCheck } from 'react-icons/fi';

interface PromptItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  usageCount: number;
  rating: number;
  successRate: number;
  examples?: string[];
  tips?: string[];
}

const PROMPTS_DATA: PromptItem[] = [
  {
    id: 'aspect-ratio-control',
    title: '比例控制终极解决方案',
    description: '解决Nano Banana比例不可控问题，让生成的图片真正可用于生产',
    prompt: 'Redraw the content of Figure 1 onto Figure 2, add content to Figure 1 to fit the aspect ratio of Figure 2, completely clear the content of Figure 2, and only retain the aspect ratio of Figure 2.',
    category: 'Professional Tools',
    difficulty: 'intermediate',
    tags: ['aspect-ratio', 'control', 'production', '比例控制'],
    usageCount: 2156,
    rating: 4.9,
    successRate: 90,
    tips: [
      '图片顺序很重要，不要搞错',
      '如果出现蓝色背景，多试几次',
      '建议使用Gemini 2.5 Pro模型'
    ]
  },
  {
    id: 'anime-cosplay-figurine',
    title: '动漫转真人Coser展示手办',
    description: '将动漫角色转换为真人Coser，展示手办收藏',
    prompt: 'Generate a real-life photo of a cosplayer portraying this character, with highly realistic skin texture. The cosplayer\'s hairstyle, accessories, and clothing must match the character\'s. She is sitting at a desk, holding a figurine transformed from this anime character\'s image. The figurine should be very close to the camera, with extremely detailed features. On the table behind the cosplayer, place a printed box of the character\'s figurine. Add a high-end 3D printer next to it, with a figurine being printed inside the printer. Set the entire scene in an indoor environment.',
    category: 'Creative Workshops',
    difficulty: 'advanced',
    tags: ['cosplay', 'figurine', 'anime', '3d-printer', '动漫', '手办'],
    usageCount: 1247,
    rating: 4.8,
    successRate: 85,
    tips: [
      '选择特征明显的动漫角色',
      '确保角色图片清晰',
      '可以调整场景描述'
    ]
  },
  {
    id: 'architecture-3d-preview',
    title: '建筑平面图转3D预览',
    description: '将建筑平面图转换为3D渲染图，支持交互预览',
    prompt: 'Help me convert this residential floor plan into an isometric photorealistic 3D rendering of the house.',
    category: 'Professional Tools',
    difficulty: 'intermediate',
    tags: ['architecture', '3d', 'floor-plan', '建筑', '3D'],
    usageCount: 892,
    rating: 4.7,
    successRate: 80,
    tips: [
      '使用清晰的平面图',
      '可以指定特定视角',
      '添加装饰和家具描述'
    ]
  },
  {
    id: 'recipe-generation',
    title: '剩菜变菜谱',
    description: '将冰箱里的剩菜变成精美的菜谱展示',
    prompt: 'Turn the ingredients in the picture into a complete step-by-step recipe infographic, using a top-down perspective. Present it in a minimalist style on a white background. Include labeled photos of the ingredients, use dashed lines to connect icons representing the preparation steps, and display a photo of the final plated dish at the bottom of the infographic,At the same time, remove the background from the food items that have a background in the image and place the food on a white background.',
    category: 'Creative Workshops',
    difficulty: 'beginner',
    tags: ['cooking', 'recipe', 'food', '烹饪', '菜谱'],
    usageCount: 567,
    rating: 4.6,
    successRate: 75,
    tips: [
      '确保食材图片清晰',
      '可以添加烹饪步骤描述',
      '调整背景和布局'
    ]
  },
  {
    id: 'drink-to-pillow',
    title: '饮品变抱枕',
    description: '将喜欢的饮品变成可爱的抱枕设计',
    prompt: 'Design the main object in the photo as a soft, rounded, and airy plush balloon or inflatable toy. Using smooth matte fabric texture, Do not have a plastic feeling. complemented by subtle fabric wrinkles and stitching to emphasize its inflated effect. The shape should be slightly irregular and soft, with gentle shadows and lighting to highlight its volume and realism. Place it on a clean, minimalist background (light gray or light blue) to maintain a playful sculptural aesthetic.',
    category: 'Creative Workshops',
    difficulty: 'beginner',
    tags: ['design', 'pillow', 'drink', 'cute', '设计', '抱枕'],
    usageCount: 423,
    rating: 4.5,
    successRate: 70,
    tips: [
      '选择形状简单的饮品',
      '可以调整材质描述',
      '添加个性化元素'
    ]
  },
  {
    id: 'educational-cards',
    title: '教育知识卡片生成',
    description: '生成图文并茂的教育知识卡片',
    prompt: 'Help me generate multiple 16:9 doodle-style images to explain the concept of "futures" to middle school students. The images should have a consistent colorful, thick-pencil hand-drawn style, be rich in information, feature English text, use solid color backgrounds, have outlines around the cards, and include uniform titles, similar to a PowerPoint presentation.',
    category: 'Education',
    difficulty: 'intermediate',
    tags: ['education', 'cards', 'learning', '教育', '学习'],
    usageCount: 334,
    rating: 4.4,
    successRate: 65,
    tips: [
      '替换概念名称',
      '调整目标受众',
      '可以指定语言'
    ]
  },
  {
    id: 'figurine-3d-printer',
    title: '3D手办打印机版本',
    description: '创建3D打印机正在打印手办的场景',
    prompt: 'Please transform this car rendering into a collectible figurine. Behind it, place a figurine box printed with the car\'s image and the name "Xiaomi YU7." Next to it, add a high-end 3D printer that is currently printing the figurine. In front of the figurine box, add a round plastic base for the figurine to stand on. The PVC material of the base should have a crystal-clear, translucent texture, and set the entire scene indoors.',
    category: 'Creative Workshops',
    difficulty: 'advanced',
    tags: ['3d-printer', 'figurine', 'collectible', '3D打印', '手办'],
    usageCount: 289,
    rating: 4.3,
    successRate: 60,
    tips: [
      '替换产品名称',
      '调整打印机型号',
      '可以改变场景设置'
    ]
  },
  {
    id: 'building-to-icon',
    title: '建筑转3D图标',
    description: '将建筑照片转换为等距风格的3D图标',
    prompt: 'Convert the photo of this building into a rounded, cute isometric tile 3D rendering style, with a 1:1 ratio,To preserve the prominent features of the photographed building',
    category: 'Design',
    difficulty: 'beginner',
    tags: ['building', 'icon', '3d', 'isometric', '建筑', '图标'],
    usageCount: 198,
    rating: 4.2,
    successRate: 55,
    tips: [
      '选择特征明显的建筑',
      '可以调整风格描述',
      '保持建筑主要特征'
    ]
  }
];

const CATEGORIES = ['All', 'Professional Tools', 'Creative Workshops', 'Education', 'Design'];
const DIFFICULTIES = ['All', 'beginner', 'intermediate', 'advanced'];

export default function Prompts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent'>('popular');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());

  const filteredPrompts = PROMPTS_DATA
    .filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || prompt.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.usageCount - a.usageCount;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return b.usageCount - a.usageCount; // 简化处理
        default:
          return 0;
      }
    });

  const handleLike = (id: string) => {
    setLikedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nano Banana Prompts Library - Professional Prompt Collection",
    "description": "Discover the best Nano Banana prompts for professional image editing. Browse categorized prompts with success rates and usage statistics.",
    "url": "https://nano-banana.run/prompts"
  };

  return (
    <Layout
      title="Nano Banana Prompts Library - Professional Prompt Collection | Free Prompts"
      description="Discover the best Nano Banana prompts for professional image editing. Browse categorized prompts with success rates, usage statistics, and expert tips."
      keywords="nano banana prompts, nano banana prompt library, nano banana提示词, nano banana prompt examples, ai image editing prompts, nano banana教程"
      structuredData={websiteSchema}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nano Banana Prompt Library
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Professional prompt collection to enhance your AI image editing results
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiZap className="w-4 h-4 inline mr-2" />
              {PROMPTS_DATA.length} Prompts
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiTrendingUp className="w-4 h-4 inline mr-2" />
              75% Avg Success Rate
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiStar className="w-4 h-4 inline mr-2" />
              4.5/5 Avg Rating
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:flex-1 lg:max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search prompts, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="w-full lg:w-auto">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {DIFFICULTIES.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                      selectedDifficulty === difficulty
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty === 'All' ? 'All' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <FiFilter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'recent')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 w-full lg:w-auto"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {prompt.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                          {prompt.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(prompt.difficulty)}`}>
                          {prompt.difficulty}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLike(prompt.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedPrompts.has(prompt.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FiHeart className={`w-4 h-4 ${likedPrompts.has(prompt.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {prompt.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FiTrendingUp className="w-4 h-4 mr-1" />
                      {prompt.usageCount.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 mr-1" />
                      {prompt.rating}
                    </div>
                    <div className="flex items-center">
                      <FiZap className="w-4 h-4 mr-1" />
                      {prompt.successRate}%
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPrompt(prompt)}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <FiEye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <button
                      onClick={() => copyPrompt(prompt.prompt)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No prompts found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Using Professional Prompts
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Enhance your AI image editing results and create more professional works
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/image-editor" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <FiZap className="w-5 h-5 mr-2" />
              Start Editing Now
            </Link>
            <Link href="/tutorials" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center">
              <FiBook className="w-5 h-5 mr-2" />
              Learn More Tips
            </Link>
          </div>
        </div>
      </section>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPrompt.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                      {selectedPrompt.category}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(selectedPrompt.difficulty)}`}>
                      {selectedPrompt.difficulty}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedPrompt.description}
              </p>

              {/* Prompt */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Prompt</h4>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-sm text-gray-700 font-mono leading-relaxed">
                    {selectedPrompt.prompt}
                  </p>
                </div>
                <button
                  onClick={() => copyPrompt(selectedPrompt.prompt)}
                  className="mt-3 flex items-center text-sm text-primary-600 hover:text-primary-800"
                >
                  <FiCopy className="w-4 h-4 mr-1" />
                  Copy Prompt
                </button>
              </div>

              {/* Tips */}
              {selectedPrompt.tips && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Usage Tips</h4>
                  <ul className="space-y-2">
                    {selectedPrompt.tips.map((tip, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2" />
                  {selectedPrompt.usageCount.toLocaleString()} uses
                </div>
                <div className="flex items-center">
                  <FiStar className="w-4 h-4 mr-2" />
                  {selectedPrompt.rating}/5 rating
                </div>
                <div className="flex items-center">
                  <FiZap className="w-4 h-4 mr-2" />
                  {selectedPrompt.successRate}% success rate
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href="/image-editor"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
                >
                  Use This Prompt
                </Link>
                <button
                  onClick={() => handleLike(selectedPrompt.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    likedPrompts.has(selectedPrompt.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiHeart className={`w-4 h-4 ${likedPrompts.has(selectedPrompt.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
