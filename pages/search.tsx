import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';

// Lightweight client-side search over static pages metadata
const documents = [
  { title: 'Nano Banana (Gemini 2.5 Flash Image) – Definitive Guide', url: '/nano-banana-gemini-2-5-flash-image', keywords: 'nano banana gemini 2.5 flash image guide pricing access faq' },
  { title: 'Model Comparison', url: '/comparison', keywords: 'flux kontext midjourney dalle comparison benchmark' },
  { title: 'Getting Started with Nano-Banana', url: '/tutorials/getting-started', keywords: 'tutorial getting started access prompt' },
  { title: 'Mastering Text Replacement', url: '/tutorials/text-replacement', keywords: 'tutorial text replacement fonts background' },
  { title: 'Advanced Scene Transformations', url: '/tutorials/scene-transformation', keywords: 'tutorial scene transformation environment' },
  { title: 'FAQ', url: '/faq', keywords: 'faq pricing free google watermarks' },
  { title: 'Try Generator', url: '/try-generator', keywords: 'editor generator upload image' },
  { title: 'Batch Processing', url: '/batch-processing', keywords: 'batch processing multiple images' },
  { title: 'Examples', url: '/examples', keywords: 'gallery examples outputs' },
];

export default function SearchPage() {
  const router = useRouter();
  const q = typeof router.query.q === 'string' ? router.query.q : '';

  const results = useMemo(() => {
    const term = q.toLowerCase();
    if (!term) return [];
    return documents.filter(d => (d.title + ' ' + d.keywords).toLowerCase().includes(term));
  }, [q]);

  return (
    <Layout title={`Search: ${q || ''}`} description="Find tutorials, examples and pages about Nano Banana (Gemini 2.5 Flash Image).">
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Search</h1>
          <p className="text-gray-600 mb-6">Results for: <span className="font-medium">{q}</span></p>
          {q && results.length === 0 && (
            <p className="text-gray-600">No results found. Try broader terms like "nano banana" or "gemini flash image".</p>
          )}
          <ul className="space-y-4">
            {results.map((r) => (
              <li key={r.url} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <Link href={r.url} className="text-primary-700 font-medium">{r.title}</Link>
                <div className="text-xs text-gray-500 mt-1">{r.url}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}


