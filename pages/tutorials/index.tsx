import React, { useState } from 'react';
import Layout from '../../components/Layout';
import TutorialGrid from '../../components/tutorials/TutorialGrid';
import TutorialProgress from '../../components/tutorials/TutorialProgress';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { FiBook, FiClock, FiUsers, FiZap, FiFilter, FiExternalLink } from 'react-icons/fi';
import { tutorialsData, Tutorial, getTutorialsByPriority } from '../../lib/data/tutorials';

type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export default function TutorialsIndex() {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');
  const [completedTutorials] = useState<string[]>(['getting-started']); // This would come from user data

  const prioritizedTutorials = getTutorialsByPriority();
  const filteredTutorials = difficultyFilter === 'All' 
    ? prioritizedTutorials 
    : prioritizedTutorials.filter(tutorial => tutorial.difficulty === difficultyFilter);

  const totalReadTime = tutorialsData.reduce((acc, tutorial) => acc + tutorial.readTime, 0);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "How to Use Nano Banana - AI Image Generation Tutorials",
    "description": "Learn how to use Nano Banana with comprehensive tutorials. Master Nano Banana techniques, prompt engineering, text replacement, and scene transformation.",
    "url": "https://nano-banana.run/tutorials",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tutorialsData.map((tutorial, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "HowTo",
          "name": tutorial.title,
          "description": tutorial.description,
          "totalTime": `PT${tutorial.readTime}M`,
          "url": `https://nano-banana.run/tutorials/${tutorial.slug}`
        }
      }))
    }
  };

  return (
    <Layout
      title="How to Use Nano Banana - Complete Tutorial Guide | Nano Banana Tutorial 2025"
      description="Learn how to use nano banana with our comprehensive tutorial guide. Master nano banana techniques, prompt engineering, examples, and advanced editing. Access nano banana free on Google AI Studio, Gemini, and LMarena. Complete guide for beginners to experts."
      keywords="how to use nano banana, nano banana tutorial, nano banana how to use, nano banana examples, nano banana prompt, nano banana prompts, nano banana free, nano banana access, nano banana api, nano banana gemini, nano banana ai studio, nano banana lmarena, nano banana google, google nano banana, nano banana vs flux kontext, nano banana comparison, nano banana reddit, reddit nano banana, nano banana test, nano banana try, nano banana local, nano banana gemini app, nano banana gemini ai, nano banana google ai studio, nano banana youtube, nano banana batch processing, nano banana scene transformation, nano banana text replacement, nano banana 使い方, nano banana使用方法, nano banana教学, nano banana exampies, what is nano banana, nano banana model, nano banana ai"
      structuredData={websiteSchema}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How to Use Nano Banana - Complete Tutorial Guide
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Learn how to use nano banana with expert tutorials. Master nano banana techniques, prompt engineering, and advanced editing for perfect results. Access nano banana free on Google AI Studio, Gemini, and LMarena.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiBook className="w-4 h-4 inline mr-2" />
              {tutorialsData.length} Tutorials
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiClock className="w-4 h-4 inline mr-2" />
              {totalReadTime} min total
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <FiUsers className="w-4 h-4 inline mr-2" />
              10K+ Students
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Guide */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Access to Nano Banana</h2>
            <p className="text-gray-600">Start using Nano Banana on your preferred platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="md" hover={true}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Google AI Studio</h3>
                  <p className="text-sm text-gray-600">Official Platform</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Access Nano Banana through Google's official AI platform with full features.</p>
              <Button
                variant="ghost"
                size="sm"
                href="/about"
                className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                icon={<FiExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                Learn How to Access
              </Button>
            </Card>
            
            <Card padding="md" hover={true}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">LMarena</h3>
                  <p className="text-sm text-gray-600">Community Platform</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Try Nano Banana on LMarena with an easy-to-use interface.</p>
              <Button
                variant="ghost"
                size="sm"
                href="https://lmarena.ai"
                external={true}
                className="text-green-600 hover:text-green-800 p-0 h-auto"
                icon={<FiExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                Visit LMarena
              </Button>
            </Card>
            
            <Card padding="md" hover={true}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Gemini</h3>
                  <p className="text-sm text-gray-600">AI Assistant</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Use Nano Banana through Gemini's conversational interface.</p>
              <Button
                variant="ghost"
                size="sm"
                href="https://gemini.google.com"
                external={true}
                className="text-purple-600 hover:text-purple-800 p-0 h-auto"
                icon={<FiExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                Try Gemini
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Progress */}
              <TutorialProgress
                completedTutorials={completedTutorials}
                totalTutorials={tutorialsData.length}
              />
              
              {/* Filter */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiFilter className="w-5 h-5 mr-2 text-primary-600" />
                    Filter by Difficulty
                  </h3>
                  <div className="space-y-2">
                    {(['All', 'Beginner', 'Intermediate', 'Advanced'] as DifficultyFilter[]).map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setDifficultyFilter(difficulty)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          difficultyFilter === difficulty
                            ? 'bg-primary-100 text-primary-800'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Tutorials Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {difficultyFilter === 'All' ? 'All Tutorials' : `${difficultyFilter} Tutorials`}
                </h2>
                <p className="text-gray-600">
                  {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <TutorialGrid
                tutorials={filteredTutorials}
                columns={2}
                variant="default"
                showMetaInfo={true}
              />
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
            <Button
              variant="secondary"
              size="lg"
              href="/image-editor"
              icon={<FiZap />}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Start Creating Now
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/showcase"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              View Showcase
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
