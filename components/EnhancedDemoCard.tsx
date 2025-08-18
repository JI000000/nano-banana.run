import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface EnhancedDemoCardProps {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  featureHighlight?: string;
  performanceMetric?: string;
  tutorialLink?: string;
}

const EnhancedDemoCard: React.FC<EnhancedDemoCardProps> = ({
  title,
  description,
  beforeImage,
  afterImage,
  featureHighlight,
  performanceMetric,
  tutorialLink
}) => {
  // State to control the image shown
  const [showAfter, setShowAfter] = React.useState(false);
  
  // Toggle between before and after images
  const toggleImage = () => {
    setShowAfter(!showAfter);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
      {/* Image showcase with before/after toggle */}
      <div className="relative">
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={showAfter ? afterImage : beforeImage}
            alt={showAfter ? "After editing" : "Before editing"}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        
        {/* Before/After toggle overlay */}
        <div 
          className="absolute inset-0 flex flex-col justify-end cursor-pointer"
          onClick={toggleImage}
        >
          <div className="bg-gradient-to-t from-black/60 to-transparent p-4 text-white flex justify-between items-center">
            <span className="text-sm font-medium">{showAfter ? 'After' : 'Before'}</span>
            <span className="text-xs bg-white/30 px-3 py-1 rounded-full">
              Click to {showAfter ? 'see original' : 'see result'}
            </span>
          </div>
        </div>
        
        {/* Feature highlight badge */}
        {featureHighlight && (
          <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {featureHighlight}
          </div>
        )}
        
        {/* Performance metric badge */}
        {performanceMetric && (
          <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {performanceMetric}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        {tutorialLink && (
          <Link href={tutorialLink} className="text-primary-600 hover:text-primary-800 font-medium text-sm inline-flex items-center">
            Learn how to do this
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EnhancedDemoCard;
