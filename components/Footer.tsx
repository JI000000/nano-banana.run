import React from 'react';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <a href="mailto:info@nanobanana.ai" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
              <FiMail className="w-4 h-4 mr-2" />
              info@nanobanana.ai
            </a>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Additional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tutorials" className="text-gray-300 hover:text-white transition-colors">Tutorials</Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-300 hover:text-white transition-colors">Examples</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {currentYear} Nano Banana AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
