import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// FAQ item interface
export interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions", 
  description,
  className = ""
}) => {
  // State to manage which FAQs are open
  const [faqItems, setFAQItems] = useState<FAQItem[]>(faqs);

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setFAQItems(faqItems.map((faq, i) => {
      if (i === index) {
        return { ...faq, isOpen: !faq.isOpen };
      }
      return faq;
    }));
  };

  return (
    <section className={`py-20 ${className}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {title && (
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
              {description && (
                <p className="text-xl text-gray-600">{description}</p>
              )}
            </div>
          )}
          
          <div className="space-y-6">
            {faqItems.map((faq, index) => (
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
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
