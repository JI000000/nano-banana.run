import React from 'react';
import { FiZap } from 'react-icons/fi';
import Button from '../ui/Button';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: React.ReactElement;
  additionalText?: string;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Transform Your Images?",
  description = "Join 10K+ creators using the most advanced AI image generator. Start creating amazing results in seconds.",
  buttonText = "Try Free Now",
  buttonLink = "/image-editor",
  buttonIcon = <FiZap className="w-5 h-5" />,
  additionalText = "No credit card required • Free to use",
  className = "section bg-primary-900 text-white py-20"
}) => {
  return (
    <section className={className}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-primary-100 mb-8">
            {description}
          </p>
          <Button
            variant="secondary"
            size="lg"
            href={buttonLink}
            icon={buttonIcon}
            className="bg-white text-primary-900 hover:bg-primary-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 text-lg font-bold px-8 py-4"
          >
            {buttonText}
          </Button>
          {additionalText && (
            <p className="text-sm text-primary-200 mt-4">{additionalText}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
