import React from 'react';
import { FiCheck, FiBook, FiClock } from 'react-icons/fi';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

interface TutorialProgressProps {
  completedTutorials: string[];
  totalTutorials: number;
  className?: string;
}

const TutorialProgress: React.FC<TutorialProgressProps> = ({
  completedTutorials,
  totalTutorials,
  className = ''
}) => {
  const progressPercentage = (completedTutorials.length / totalTutorials) * 100;
  
  const tutorialList = [
    { slug: 'getting-started', title: 'Getting Started' },
    { slug: 'text-replacement', title: 'Text Replacement' },
    { slug: 'scene-transformation', title: 'Scene Transformation' },
    { slug: 'style-matching', title: 'Style Matching' },
    { slug: 'prompt-engineering', title: 'Prompt Engineering' },
    { slug: 'product-photography', title: 'Product Photography' }
  ];

  return (
    <Card className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiBook className="w-5 h-5 mr-2 text-primary-600" />
            Learning Progress
          </h3>
          <span className="text-sm text-gray-500">
            {completedTutorials.length} of {totalTutorials} completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar
            progress={progressPercentage}
            size="lg"
            color="primary"
            showPercentage={true}
            animated={true}
          />
        </div>

        {/* Tutorial List */}
        <div className="space-y-2">
          {tutorialList.map((tutorial) => {
            const isCompleted = completedTutorials.includes(tutorial.slug);
            return (
              <div
                key={tutorial.slug}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isCompleted
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <FiCheck className="w-4 h-4" />
                    ) : (
                      <FiClock className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isCompleted ? 'text-green-800' : 'text-gray-700'
                    }`}
                  >
                    {tutorial.title}
                  </span>
                </div>
                {isCompleted && (
                  <span className="text-xs text-green-600 font-medium">
                    Completed
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Achievement Message */}
        {progressPercentage === 100 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏆</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-800">
                  Congratulations!
                </h4>
                <p className="text-sm text-yellow-700">
                  You've completed all tutorials. You're now a Nano Banana expert!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TutorialProgress;
