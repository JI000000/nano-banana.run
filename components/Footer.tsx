import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍌</span>
            </div>
            <span className="text-xl font-bold">Nano Banana</span>
          </div>
          
          {/* Navigation Links - 优化Footer链接结构 */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/tutorials" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              How to Use
            </Link>
            <Link href="/nano-banana-vs-flux-kontext" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              vs Flux Kontext
            </Link>
            <Link href="/showcase" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Examples
            </Link>
            <Link href="/nano-banana-api" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              API
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Nano Banana AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
