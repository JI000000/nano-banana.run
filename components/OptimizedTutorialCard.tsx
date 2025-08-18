import React from 'react';
import Link from 'next/link';
import LazyImage from './LazyImage';

interface TutorialCardProps {
  title: string;
  description: string;
  imagePath: string;
  slug: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
}

const OptimizedTutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  imagePath,
  slug,
  readTime,
  difficulty,
  date
}) => {
  // 根据难度级别获取标签颜色
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
      {/* 图片容器：固定高度，图片填充，防止标题被覆盖 */}
      <div className="relative h-48">
        <LazyImage
          src={imagePath}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full"
        />
      </div>
      
      {/* 内容 */}
      <div className="p-5">
        {/* 元数据 */}
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getDifficultyColor()}`}>
            {difficulty}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        
        {/* 标题 */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Link href={`/tutorials/${slug}`} className="hover:text-primary-600">
            {title}
          </Link>
        </h3>
        
        {/* 描述 */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* 底部 */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {readTime} min read
          </span>
          <Link 
            href={`/tutorials/${slug}`}
            className="text-primary-600 hover:text-primary-800 font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OptimizedTutorialCard;