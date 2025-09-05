import React from 'react';
import TutorialCard from '../TutorialCard';

interface Tutorial {
  title: string;
  description: string;
  slug: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
  category?: string;
  videoUrl?: string;
}

interface TutorialGridProps {
  tutorials: Tutorial[];
  columns?: number;
  variant?: 'default' | 'compact';
  showMetaInfo?: boolean;
  className?: string;
}

const TutorialGrid: React.FC<TutorialGridProps> = ({
  tutorials,
  columns = 3,
  variant = 'default',
  showMetaInfo = true,
  className = ''
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 ${className}`}>
      {tutorials.map((tutorial, index) => (
        <TutorialCard
          key={index}
          title={tutorial.title}
          description={tutorial.description}
          slug={tutorial.slug}
          readTime={tutorial.readTime}
          difficulty={tutorial.difficulty}
          date={tutorial.date}
          category={tutorial.category}
          videoUrl={tutorial.videoUrl}
          variant={variant}
          showMetaInfo={showMetaInfo}
        />
      ))}
    </div>
  );
};

export default TutorialGrid;
