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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                <Link href="/image-editor" className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">Try Editor</h3>
                  <p className="text-sm text-gray-600">Start editing images with Nano Banana</p>
                </Link>
                <Link href="/prompts" className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">Browse Prompts</h3>
                  <p className="text-sm text-gray-600">Find professional prompts</p>
                </Link>
                <Link href="/tutorials" className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">Learn More</h3>
                  <p className="text-sm text-gray-600">Read our tutorials</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
