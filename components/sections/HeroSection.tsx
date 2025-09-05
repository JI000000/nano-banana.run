import React from 'react';
import Hero from '../Hero';

interface HeroSectionProps {
  title: string;
  description: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  primaryBtnText = 'Try The AI Editor',
  primaryBtnLink = '/image-editor',
  secondaryBtnText = 'Learn How',
  secondaryBtnLink = '/tutorials',
}) => {
  return (
    <Hero
      title={title}
      description={description}
      primaryBtnText={primaryBtnText}
      primaryBtnLink={primaryBtnLink}
      secondaryBtnText={secondaryBtnText}
      secondaryBtnLink={secondaryBtnLink}
    />
  );
};

export default HeroSection;