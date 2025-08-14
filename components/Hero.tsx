import React from 'react';
import Link from 'next/link';

interface HeroProps {
  title: string;
  description: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  primaryBtnText = 'Get Started',
  primaryBtnLink = '/tutorials',
  secondaryBtnText = 'Learn More',
  secondaryBtnLink = '/about',
}) => {
  return (
    <div className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600 rounded-full mix-blend-multiply opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-800 rounded-full mix-blend-multiply opacity-10 transform translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-50 mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryBtnText && primaryBtnLink && (
              <Link href={primaryBtnLink} className="btn btn-primary bg-white text-primary-800 hover:bg-primary-50 px-8 py-3 rounded-md font-medium">
                {primaryBtnText}
              </Link>
            )}
            {secondaryBtnText && secondaryBtnLink && (
              <Link href={secondaryBtnLink} className="btn border border-white text-white hover:bg-primary-600/30 px-8 py-3 rounded-md font-medium">
                {secondaryBtnText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
