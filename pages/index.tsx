import React from 'react';
import Layout from '../components/Layout';
import FAQ from '../components/FAQ';
import HeroSection from '../components/sections/HeroSection';
import QuickAccessSection from '../components/sections/QuickAccessSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ShowcaseSection from '../components/sections/ShowcaseSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import CTASection from '../components/sections/CTASection';
import { generateWebSiteSchema, generateProductSchema } from '../lib/seo/StructuredDataGenerator';
import { faqData } from '../lib/data/faqData';

export default function Home() {
  // 生成网站结构化数据
  const websiteSchema = generateWebSiteSchema({
    url: 'https://nano-banana.run/',
    name: 'Nano Banana - AI Image Editor & Generator',
    description: 'Transform any image with simple text prompts. Nano-banana\'s advanced model delivers consistent character editing and scene preservation that surpasses Flux Kontext.',
    searchUrl: 'https://nano-banana.run/search?q={search_term_string}'
  });
  
  // 生成产品结构化数据
  const productSchema = generateProductSchema({
    url: 'https://nano-banana.run/',
    name: 'Nano Banana AI Image Editor',
    description: 'Revolutionary AI image model that outperforms competitors with precise text replacement and seamless scene transformations.',
    imageUrl: 'https://nano-banana.run/images/nano-banana-model-preview.jpg',
    brand: 'Nano Banana',
    review: [
      {
        reviewRating: 5,
        author: 'AIArtistPro',
        reviewBody: 'This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!'
      },
      {
        reviewRating: 5,
        author: 'ContentCreator',
        reviewBody: 'Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!'
      }
    ],
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 89
    }
  });

  // 组合结构化数据
  const combinedStructuredData = [websiteSchema, productSchema];

  return (
    <Layout
      title="Nano Banana - What is Nano Banana? Free AI Image Editor & Generator 2025"
      description="What is Nano Banana? The most advanced AI image editor that transforms any image with simple text prompts. Learn how to use nano banana free on Google AI Studio, Gemini, and LMarena. Nano banana vs flux kontext comparison shows superior results."
      keywords="nano banana, what is nano banana, how to use nano banana, nano banana tutorial, nano banana free, nano banana google, google nano banana, nano banana gemini, gemini nano banana, nano banana lmarena, lmarena nano banana, nano banana ai studio, google ai studio nano banana, nano banana vs flux kontext, nano banana vs midjourney, nano banana comparison, nano banana examples, nano banana prompt, nano banana prompts, nano banana api, nano banana access, nano banana 使い方, nano banana使用方法, nano banana是什么, nano banana 無料, nano banana教学, nano banana exampies, nano banana reddit, reddit nano banana, nano banana review, nano banana open source, nano banana github, nano banana model, nano banana ai, nano banana image editing, nano banana scene transformation, nano banana text replacement"
      structuredData={combinedStructuredData}
      showWebVitals={false}
    >
      {/* Hero Section */}
      <HeroSection
        title="Nano Banana - Free AI Image Editor"
        description="Transform any image with simple text prompts. The most advanced AI image editor that outperforms Flux Kontext with superior character consistency and scene preservation."
        primaryBtnText="Try Free Now"
        primaryBtnLink="/image-editor"
        secondaryBtnText="See Examples"
        secondaryBtnLink="/showcase"
      />
      
      {/* Quick Access Section - 3 Steps to Get Started */}
      <QuickAccessSection />
      
      {/* Showcase Section - Inspire with Examples */}
      <ShowcaseSection />
      
      {/* Core Features Section - Detailed Benefits */}
      <FeaturesSection
        title="Why Choose Nano Banana?"
        subtitle="Advanced AI technology that delivers superior results"
        columns={3}
      />
      
      {/* User Reviews Section - Social Proof */}
      <ReviewsSection />
      
      {/* FAQ Section - Address Concerns */}
      <FAQ 
        faqs={faqData}
        title="Frequently Asked Questions"
        description="Everything you need to know about Nano Banana AI"
        className="bg-gray-50"
      />
      
      {/* Final CTA Section */}
      <CTASection />
    </Layout>
  );
}
