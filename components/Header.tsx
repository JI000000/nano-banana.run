import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch, FiPlay } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">🍌 Nano Banana</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - 工具生态系统导航结构 */}
          <nav className="hidden lg:ml-6 lg:flex lg:space-x-6">
            <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-600 hover:text-primary-700">Home</Link>
            <Link href="/tools" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-600 hover:text-primary-700">Tools</Link>
            <Link href="/prompts" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-600 hover:text-primary-700">Prompts</Link>
            <Link href="/tutorials" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-600 hover:text-primary-700">Tutorials</Link>
            <Link href="/showcase" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-600 hover:text-primary-700">Examples</Link>
            <Link href="/faq" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary-600 hover:text-primary-700">FAQ</Link>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-500 hover:text-primary-600 focus:outline-none"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <Link href="/image-editor" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              <FiPlay className="w-4 h-4 mr-2" />
              Try Free
            </Link>
          </div>
          
          {/* Mobile CTA Button */}
          <div className="flex md:hidden items-center">
            <Link href="/image-editor" className="inline-flex items-center px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              <FiPlay className="w-4 h-4 mr-1" />
              Try
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden ml-2">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - 工具生态系统移动端导航结构 */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">Home</Link>
            <Link href="/tools" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">Tools</Link>
            <Link href="/prompts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">Prompts</Link>
            <Link href="/tutorials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">Tutorials</Link>
            <Link href="/showcase" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">Examples</Link>
            <Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">FAQ</Link>
            <div className="pt-4 border-t border-gray-200">
              <Link href="/image-editor" className="block w-full text-center px-3 py-3 bg-primary-600 text-white text-base font-bold rounded-lg hover:bg-primary-700 shadow-lg">
                🚀 Try Nano Banana Free
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 py-3 px-4">
          <form className="flex items-center" onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`); setIsSearchOpen(false); } }}>
            <input
              type="text"
              placeholder="Search tutorials, examples..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-primary-600 text-white p-2 rounded-r-md hover:bg-primary-700 focus:outline-none"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
