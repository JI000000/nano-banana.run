import React from 'react';
import { FiEdit, FiRefreshCcw, FiThumbsUp, FiZap, FiBriefcase, FiLayers } from 'react-icons/fi';
import FeatureCard from '../FeatureCard';

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: number;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = "Core Features",
  subtitle = "Why Choose Nano Banana?",
  features = [
    {
      icon: <FiEdit className="w-6 h-6" />,
      title: "Natural Language Editing",
      description: "Edit images using simple text prompts. Nano-banana AI understands complex instructions like GPT for images."
    },
    {
      icon: <FiThumbsUp className="w-6 h-6" />,
      title: "Character Consistency",
      description: "Maintain perfect character details across edits. This model excels at preserving faces and identities."
    },
    {
      icon: <FiRefreshCcw className="w-6 h-6" />,
      title: "Scene Preservation",
      description: "Seamlessly blend edits with original backgrounds. Superior scene fusion compared to Flux Kontext."
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "One-Shot Editing",
      description: "Perfect results in a single attempt. Nano-banana solves one-shot image editing challenges effortlessly."
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: "Multi-Image Context",
      description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows."
    },
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: "AI UGC Creation",
      description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns."
    }
  ],
  columns = 3
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className="section py-20">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Advanced AI Technology
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-8`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;