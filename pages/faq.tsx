import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
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
      question: "What is Nano-Banana?",
      answer: (
        <p>
          Nano-Banana is an advanced AI image editing model that excels in precise text replacement, scene transformations, and style-matched editing. It was first made available on the LMarena platform in August 2025 and has quickly gained attention for its ability to maintain context and coherence when making specific edits to images.
        </p>
      )
    },
    {
      question: "How does Nano-Banana differ from other AI image models?",
      answer: (
        <>
          <p className="mb-4">
            Nano-Banana stands out from other AI image models in several key ways:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Superior text replacement that preserves all background elements, including QR codes and intricate designs</li>
            <li>More coherent scene transformations that maintain the integrity of the main subjects</li>
            <li>Better style matching when adding new elements to existing images</li>
            <li>Faster processing times for most editing operations</li>
          </ul>
        </>
      )
    },
    {
      question: "Where can I access Nano-Banana?",
      answer: (
        <p>
          Currently, Nano-Banana is available through the LMarena platform. You'll need to create an account on LMarena and navigate to their image models section to access it. We provide detailed instructions in our <Link href="/tutorials/getting-started" className="text-primary-600 hover:text-primary-800">Getting Started tutorial</Link>.
        </p>
      )
    },
    {
      question: "Is Nano-Banana free to use?",
      answer: (
        <p>
          The availability and pricing of Nano-Banana depend on the LMarena platform's current policies. As of our last update, there is a limited free tier with a certain number of operations per day, and paid plans for more extensive usage. Check the LMarena platform for the most current pricing information.
        </p>
      )
    },
    {
      question: "What types of images work best with Nano-Banana?",
      answer: (
        <p>
          Nano-Banana works well with a wide range of images, but performs best with high-resolution, well-lit photographs and illustrations. It may struggle with extremely low-resolution images, heavily compressed images with artifacts, or images that already contain AI-generated elements from different models.
        </p>
      )
    },
    {
      question: "Can Nano-Banana edit videos?",
      answer: (
        <p>
          As of now, Nano-Banana is designed for still image editing only. It cannot directly process videos. However, advanced users might use it to edit individual frames and then recompile them, though this workflow is experimental and not officially supported.
        </p>
      )
    },
    {
      question: "What are the limitations of Nano-Banana?",
      answer: (
        <>
          <p className="mb-4">
            While powerful, Nano-Banana does have some limitations:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>It may struggle with non-Latin text replacement in some contexts</li>
            <li>Very complex scene transformations involving multiple interaction points can sometimes produce physically impossible results</li>
            <li>Like all AI models, it works within the constraints of its training data</li>
            <li>Currently limited to still images (no video support)</li>
          </ul>
        </>
      )
    },
    {
      question: "How do I get the best results from Nano-Banana?",
      answer: (
        <p>
          For optimal results, provide clear and specific prompts, use high-quality input images, and consider the model's strengths when designing your edits. Our <Link href="/tutorials" className="text-primary-600 hover:text-primary-800">tutorials section</Link> provides detailed guidance on prompt engineering and best practices for different types of edits.
        </p>
      )
    },
    {
      question: "Is there an API for Nano-Banana?",
      answer: (
        <p>
          As of our latest information, an official Nano-Banana API is not yet available for direct integration. Currently, access is through the LMarena platform's interface. We'll update this information if an API becomes available.
        </p>
      )
    },
    {
      question: "Who created Nano-Banana?",
      answer: (
        <p>
          The exact development team behind Nano-Banana has not been officially announced. There is speculation it may be associated with a major AI lab, but no formal attribution has been made public. The model first appeared on the LMarena platform in August 2025.
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
      title="Nano-Banana AI FAQ | Frequently Asked Questions"
      description="Find answers to frequently asked questions about the Nano-Banana AI image model, including how to use it, its capabilities, limitations, and more."
      keywords="nano banana faq, gemini 2.5 flash image faq, is nano banana free, nano banana price, nano banana google, gemini flash image nano banana, access nano banana, ai studio nano banana"
      structuredData={faqStructuredData}
      ogType="website"
      ogImage="/images/faq-sharing-image.jpg"
    >
      {/* Hero */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about Nano-Banana AI image model
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ List */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Trending Questions block */}
            <div className="mb-10 rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trending Questions</h2>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Is Nano Banana from Google? (aka Gemini 2.5 Flash Image)</li>
                <li>Is Nano Banana free? How is pricing handled?</li>
                <li>How can I access Nano Banana / AI Studio?</li>
                <li>What makes it different from Flux Kontext, Midjourney, and DALL·E?</li>
                <li>Does it add visible/invisible watermarks?</li>
              </ul>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0 text-gray-500">
                      {faq.isOpen ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
                    </span>
                  </button>
                  
                  {faq.isOpen && (
                    <div className="px-6 py-4 bg-gray-50">
                      <div className="text-base text-gray-700">
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
      
      {/* Still have questions */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our tutorials and examples might have the answers you're looking for. Or you can contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutorials" className="btn btn-primary">
                Browse Tutorials
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
