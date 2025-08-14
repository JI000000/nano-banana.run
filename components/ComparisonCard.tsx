import React from 'react';
import Image from 'next/image';

interface ComparisonCardProps {
  title: string;
  nanoBananaScore: number;
  competitorName: string;
  competitorScore: number;
  imagePath?: string;
  alt?: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  nanoBananaScore,
  competitorName,
  competitorScore,
  imagePath,
  alt = 'Comparison example',
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Image */}
      {imagePath && (
        <div className="relative h-48 w-full">
          <Image
            src={imagePath}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        
        {/* Comparison bars */}
        <div className="space-y-4">
          {/* Nano-Banana Score */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Nano-Banana</span>
              <span className="text-sm font-medium text-gray-700">{nanoBananaScore}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${nanoBananaScore * 10}%` }}
              ></div>
            </div>
          </div>
          
          {/* Competitor Score */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{competitorName}</span>
              <span className="text-sm font-medium text-gray-700">{competitorScore}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-500 h-2 rounded-full" 
                style={{ width: `${competitorScore * 10}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
