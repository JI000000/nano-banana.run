import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { generateWebPageSchema, generateBreadcrumbSchema, generateProductSchema } from '../lib/seo/StructuredDataGenerator';

export default function NanoBananaGeminiLanding() {
  const url = 'https://nano-banana.run/nano-banana-gemini-2-5-flash-image';

  const webPageSchema = generateWebPageSchema({
    url,
    title: 'Nano Banana (Gemini 2.5 Flash Image) – Definitive Guide',
    description: 'Authoritative guide to Nano Banana a.k.a. Gemini 2.5 Flash Image: capabilities, how to try, pricing/availability, and comparisons to Flux Kontext, Midjourney and DALL·E.'
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', item: 'https://nano-banana.run/' },
      { name: 'Nano Banana (Gemini 2.5 Flash Image)', item: url }
    ]
  });

  const productSchema = generateProductSchema({
    url,
    name: 'Nano Banana (Gemini 2.5 Flash Image)',
    description: 'Image editing model known for character consistency, multi-image blending and natural language editing.',
    imageUrl: 'https://nano-banana.run/images/nano-banana-model-preview.jpg',
    brand: 'Google / Nano Banana'
  });

  const structuredData = [webPageSchema, breadcrumbSchema, productSchema];

  return (
    <Layout
      title="Nano Banana (Gemini 2.5 Flash Image) – Definitive Guide"
      description="Everything you need to know about Nano Banana (Gemini 2.5 Flash Image): features, consistency, multi-image editing, how to access, pricing, FAQs, and comparisons."
      keywords="nano banana, gemini 2.5 flash image, gemini flash image, google nano banana, how to use nano banana, nano banana price, nano banana free, ai studio nano banana, character consistency, multi image blend"
      canonicalPath="/nano-banana-gemini-2-5-flash-image"
      structuredData={structuredData}
    >
      <section className="section">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nano Banana (Gemini 2.5 Flash Image)</h1>
          <p className="text-lg text-gray-700">
            This guide consolidates public information about <strong>Nano Banana</strong> — also referred to as <strong>Gemini 2.5 Flash Image</strong> — to help creators quickly understand its strengths, how to try it, and how it compares to other models.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/image-editor" className="btn btn-primary inline-block">Try the Editor</Link>
            <Link href="/comparison" className="btn inline-block">See Comparison</Link>
            <Link href="/tutorials" className="btn inline-block">Tutorials</Link>
            <Link href="/faq" className="btn inline-block">FAQs</Link>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold mb-3">Key Capabilities</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>High-fidelity <strong>character consistency</strong> across edits.</li>
            <li><strong>Multi-image blending</strong> and scene composition.</li>
            <li><strong>Natural-language editing</strong> with multi-turn refinement.</li>
            <li>Design mixing: apply one image style to objects in another.</li>
            <li>Watermarking policy: visible and invisible marks when created in Gemini app (per public sources).</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold mb-3">How to Try</h2>
          <p className="text-gray-700">You can experiment through our editor or follow official access paths referenced in our tutorials. We compile practical prompts and workflows to get reliable results fast.</p>
          <div className="mt-4">
            <Link href="/tutorials/getting-started" className="text-primary-600 font-medium">Getting Started →</Link>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold mb-3">FAQs (Most Searched)</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold">Is Nano Banana from Google?</h3>
              <p>Public sources refer to Nano Banana as the image editing model integrated in the Gemini app (aka Gemini 2.5 Flash Image).</p>
            </div>
            <div>
              <h3 className="font-semibold">Is it free and how is pricing handled?</h3>
              <p>Availability may differ by product tier and region. Our tutorials track current access paths and costs where applicable.</p>
            </div>
            <div>
              <h3 className="font-semibold">What makes it different?</h3>
              <p>Consistency across edits and multi-image composition are frequently cited advantages versus other models.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


