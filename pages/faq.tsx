import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';
import { generateFAQSchema } from '../lib/seo/StructuredDataGenerator';

// FAQ item interface
interface FAQItem {
  question: string;
  answer: React.ReactNode;
  isOpen?: boolean;
}

// FAQ component
const FAQ: React.FC = () => {
  // Initial FAQ items
  const initialFAQs: FAQItem[] = [
    {
      question: "What is Nano Banana?",
      answer: (
        <p>
          It's a revolutionary AI image editing model that transforms photos using natural language prompts. This is currently the most powerful image editing model available, with exceptional consistency. It offers superior performance compared to Flux Kontext for consistent character editing and scene preservation.
        </p>
      )
    },
    {
      question: "How does it work?",
      answer: (
        <p>
          Simply upload an image and describe your desired edits in natural language. The AI understands complex instructions like "place the creature in a snowy mountain" or "imagine the whole face and create it". It processes your text prompt and generates perfectly edited images.
        </p>
      )
    },
    {
      question: "How is it better than Flux Kontext?",
      answer: (
        <p>
          This model excels in character consistency, scene blending, and one-shot editing. Users report it "completely destroys" Flux Kontext in preserving facial features and seamlessly integrating edits with backgrounds. It also supports multi-image context, making it ideal for creating consistent AI influencers.
        </p>
      )
    },
    {
      question: "Can I use it for commercial projects?",
      answer: (
        <p>
          Yes! It's perfect for creating AI UGC content, social media campaigns, and marketing materials. Many users leverage it for creating consistent AI influencers and product photography. The high-quality outputs are suitable for professional use.
        </p>
      )
    },
    {
      question: "What types of edits can it handle?",
      answer: (
        <p>
          The editor handles complex edits including face completion, background changes, object placement, style transfers, and character modifications. It excels at understanding contextual instructions like "place in a blizzard" or "create the whole face" while maintaining photorealistic quality.
        </p>
      )
    },
    {
      question: "Where can I try Nano Banana?",
      answer: (
        <p>
          You can try nano-banana on LMArena or through our web interface. Simply upload your image, enter a text prompt describing your desired edits, and watch as nano-banana AI transforms your photo with incredible accuracy and consistency.
        </p>
      )
    }
  ];

  // State to manage which FAQs are open
  const [faqs, setFAQs] = useState<FAQItem[]>(initialFAQs);

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setFAQs(faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, isOpen: !faq.isOpen };
      }
      return faq;
    }));
  };

  // 提取纯文本答案用于结构化数据
  const extractTextContent = (reactNode: React.ReactNode): string => {
    if (typeof reactNode === 'string') {
      return reactNode;
    } else if (React.isValidElement(reactNode)) {
      // 处理HTML元素
      if (reactNode.props.children) {
        return extractTextContent(reactNode.props.children);
      }
      return '';
    } else if (Array.isArray(reactNode)) {
      // 处理数组
      return reactNode.map(extractTextContent).join(' ');
    }
    return '';
  };
  
  // 生成FAQ结构化数据
  const faqStructuredData = generateFAQSchema({
    questions: initialFAQs.map(faq => ({
      question: faq.question,
      answer: extractTextContent(faq.answer)
    }))
  });

  return (
    <Layout
      title="Frequently Asked Questions - Nano Banana AI"
      description="Find answers to frequently asked questions about Nano Banana AI image editor. Learn how it works, its capabilities, and how it compares to other AI models."
      keywords="nano banana faq, ai image editor faq, flux kontext alternative, ai photo editing questions"
      structuredData={faqStructuredData}
      ogType="website"
      ogImage="/images/faq-sharing-image.jpg"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-primary-100">
              Everything you need to know about Nano Banana AI
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ List */}
      <section className="section py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    className="flex justify-between items-center w-full px-8 py-6 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-xl font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0 text-gray-500">
                      {faq.isOpen ? <FiChevronUp className="h-6 w-6" /> : <FiChevronDown className="h-6 w-6" />}
                    </span>
                  </button>
                  
                  {faq.isOpen && (
                    <div className="px-8 pb-6">
                      <div className="text-lg text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gray-50 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to try Nano Banana?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the most advanced AI image editor available today
            </p>
            <Link href="/image-editor" className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
              Try Nano Banana Generator
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
