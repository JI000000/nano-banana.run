import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiBarChart } from 'react-icons/fi';

interface TutorialCardProps {
  title: string;
  description: string;
  imagePath: string;
  slug: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  imagePath,
  slug,
  readTime,
  difficulty,
  date,
}) => {
  // Function to get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <Link href={`/tutorials/${slug}`} className="block relative h-48 w-full">
        <Image
          src={imagePath}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Link>
      
      {/* Content */}
      <div className="p-6">
        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{date}</span>
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{readTime} min read</span>
          </div>
        </div>
        
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
