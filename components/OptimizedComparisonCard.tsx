import React from 'react';
import LazyImage from './LazyImage';

interface ComparisonCardProps {
  title: string;
  nanoBananaScore: number;
  competitorName: string;
  competitorScore: number;
  imagePath: string;
}

const OptimizedComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  nanoBananaScore,
  competitorName,
  competitorScore,
  imagePath
}) => {
  // 计算分数差值
  const scoreDifference = nanoBananaScore - competitorScore;
  const percentageDifference = ((scoreDifference / competitorScore) * 100).toFixed(0);
  
  // 格式化分数，确保显示一位小数
  const formatScore = (score: number) => score.toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* 图片区域 */}
      <div className="relative h-48">
        <LazyImage
          src={imagePath}
          alt={`${title} comparison between Nano-Banana and ${competitorName}`}
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />
        
        {/* 悬浮标题 */}
        <div className="absolute top-0 left-0 bg-gradient-to-r from-primary-900 to-transparent p-3 w-full">
          <h3 className="text-white font-medium text-lg">{title}</h3>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="p-5">
        {/* Nano-Banana 分数 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Nano-Banana</span>
            <span className="text-lg font-bold text-primary-600">{formatScore(nanoBananaScore)}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${(nanoBananaScore / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* 竞争对手分数 */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">{competitorName}</span>
            <span className="text-lg font-bold text-gray-700">{formatScore(competitorScore)}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gray-500 h-2.5 rounded-full" 
              style={{ width: `${(competitorScore / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* 性能差异 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Performance Difference</span>
            <span className={`font-medium ${scoreDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {scoreDifference > 0 ? '+' : ''}{formatScore(scoreDifference)} ({scoreDifference > 0 ? '+' : ''}{percentageDifference}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedComparisonCard;