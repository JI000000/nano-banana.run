import React from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Nano-Banana</span>
              <span className="text-primary-600 ml-1 font-bold">.Run</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              The definitive resource for Nano-Banana AI image editing model.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-base font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tutorials" className="text-gray-600 hover:text-primary-600 text-sm">Tutorials</Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-600 hover:text-primary-600 text-sm">Examples</Link>
              </li>
              <li>
                <Link href="/comparison" className="text-gray-600 hover:text-primary-600 text-sm">Comparison</Link>
              </li>
              <li>
                <Link href="/news/nano-banana-2025-08-26" className="text-gray-600 hover:text-primary-600 text-sm">News</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600 text-sm">FAQ</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-base font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-primary-600 text-sm">Disclaimer</Link>
              </li>
            </ul>
          </div>
          
          {/* Sitemap */}
          <div className="md:col-span-1">
            <h3 className="text-base font-medium text-gray-900 mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600 text-sm">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 text-sm">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 text-sm">Contact</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-gray-600 hover:text-primary-600 text-sm">XML Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} Nano-Banana.Run. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
