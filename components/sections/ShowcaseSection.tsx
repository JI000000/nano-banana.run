import React from 'react';
import Link from 'next/link';
import { FiClock } from 'react-icons/fi';
import LazyImage from '../LazyImage';
import Button from '../ui/Button';

interface ShowcaseItem {
  title: string;
  speed: string;
  image: string;
}

interface ShowcaseSectionProps {
  title?: string;
  subtitle?: string;
  items?: ShowcaseItem[];
  showViewAllButton?: boolean;
  viewAllLink?: string;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  title = "Showcase",
  subtitle = "Lightning-Fast AI Creations",
  items = [
    { title: "AI Generated Mountain", speed: "0.8s", image: "/images/examples/result-1.jpg" },
    { title: "Instant Garden Creation", speed: "0.6s", image: "/images/examples/result-2.jpg" },
    { title: "Real-time Beach Synthesis", speed: "0.7s", image: "/images/examples/result-3.jpg" },
    { title: "Rapid Aurora Generation", speed: "0.9s", image: "/images/examples/result-4.jpg" }
  ],
  showViewAllButton = true,
  viewAllLink = "/showcase"
}) => {
  return (
    <section id="showcase" className="section py-20">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Real Results from Real Users
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-gray-200">
                <LazyImage 
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="w-4 h-4 mr-1" />
                  {item.speed}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {showViewAllButton && (
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              href={viewAllLink}
              className="shadow-md hover:shadow-lg"
            >
              View Showcase
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowcaseSection;
