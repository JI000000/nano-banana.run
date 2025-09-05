import React from 'react';
import { FiStar } from 'react-icons/fi';

interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface ReviewsSectionProps {
  title?: string;
  subtitle?: string;
  reviews?: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  title = "User Reviews",
  subtitle = "What creators are saying",
  reviews = [
    {
      name: "AIArtistPro",
      role: "Digital Creator",
      content: "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
      rating: 5
    },
    {
      name: "ContentCreator",
      role: "UGC Specialist",
      content: "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
      rating: 5
    },
    {
      name: "PhotoEditor",
      role: "Professional Editor",
      content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
      rating: 5
    }
  ]
}) => {
  return (
    <section id="reviews" className="section py-20">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700 mb-4">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            4.8/5 Average Rating
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"{review.content}"</p>
              <div>
                <div className="font-semibold text-gray-900">{review.name}</div>
                <div className="text-sm text-gray-500">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
