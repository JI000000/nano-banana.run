import React from 'react';
import Link from 'next/link';
import { FiPlay, FiZap, FiCheck } from 'react-icons/fi';

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
  primaryBtnText = 'Launch Editor',
  primaryBtnLink = '/image-editor',
  secondaryBtnText = 'View Showcase',
  secondaryBtnLink = '/showcase',
}) => {
  return (
    <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.05"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary-700/50 rounded-full text-sm font-medium text-primary-100 mb-6">
              <FiZap className="w-4 h-4 mr-2" />
              The AI model that outperforms Flux Kontext
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
            
            {/* Trust Signal */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiCheck key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-primary-100 text-sm font-medium">10K+ creators trust us</span>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={primaryBtnLink} 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                <FiPlay className="w-5 h-5 mr-2" />
                {primaryBtnText}
              </Link>
              <Link 
                href={secondaryBtnLink} 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/80 text-white font-medium rounded-xl hover:bg-white hover:text-primary-900 transition-all duration-200 backdrop-blur-sm"
              >
                {secondaryBtnText}
              </Link>
            </div>
          </div>
          
          {/* Simple Trust Indicators */}
          <div className="flex justify-center items-center gap-8 text-primary-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">&lt;2s</div>
              <div className="text-xs">Generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-xs">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-xs">To Use</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
