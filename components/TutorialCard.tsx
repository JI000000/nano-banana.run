import React from 'react';
import Link from 'next/link';
import { FiClock, FiPlay, FiExternalLink } from 'react-icons/fi';

interface TutorialCardProps {
  title: string;
  description: string;
  slug: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
  showMetaInfo?: boolean;
  variant?: 'default' | 'compact';
  videoUrl?: string;
  category?: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  slug,
  readTime,
  difficulty,
  date,
  showMetaInfo = true,
  variant = 'default',
  videoUrl,
  category,
}) => {
  // 根据难度级别获取标签颜色
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getDifficultyColor()}`}>
                {difficulty}
              </span>
              {category && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {category}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            <Link href={`/tutorials/${slug}`} className="hover:text-primary-600">
              {title}
            </Link>
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 flex items-center">
                <FiClock className="w-3 h-3 mr-1" />
                {readTime} min read
              </span>
              {videoUrl && (
                <span className="text-sm text-red-600 flex items-center">
                  <FiPlay className="w-3 h-3 mr-1" />
                  Video
                </span>
              )}
            </div>
            <Link 
              href={`/tutorials/${slug}`}
              className="text-primary-600 hover:text-primary-800 font-medium text-sm"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Content */}
      <div className="p-6">
        {/* Meta info */}
        {showMetaInfo && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              <span>{date}</span>
              {category && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800">
                  {category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center">
                <FiClock className="mr-1" />
                {readTime} min read
              </span>
              {videoUrl && (
                <span className="flex items-center text-red-600">
                  <FiPlay className="mr-1" />
                  Video
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Title and description */}
        <Link href={`/tutorials/${slug}`} className="block">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {difficulty}
          </span>
          <Link href={`/tutorials/${slug}`} className="text-primary-600 font-medium hover:text-primary-800 text-sm">
            Read Tutorial →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
