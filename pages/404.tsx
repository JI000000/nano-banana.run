import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <Layout
      title="404 - Page Not Found | Nano-Banana AI"
      description="The page you are looking for does not exist. Return to the Nano-Banana AI resource site."
    >
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-grow flex items-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">404</h1>
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                <FiArrowLeft className="mr-2" />
                Return to Home
              </Link>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link href="/tutorials" className="text-primary-600 hover:text-primary-800">
                  Browse Tutorials
                </Link>
                <Link href="/showcase" className="text-primary-600 hover:text-primary-800">
                  View Showcase
                </Link>
                <Link href="/contact" className="text-primary-600 hover:text-primary-800">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
