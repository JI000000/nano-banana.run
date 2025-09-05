import React, { useState } from 'react';
import { FiPlay, FiExternalLink } from 'react-icons/fi';

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoUrl, title, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);
  
  if (!videoId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-6 text-center ${className}`}>
        <p className="text-gray-600 mb-4">Video tutorial coming soon!</p>
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
        >
          <FiExternalLink className="w-4 h-4 mr-2" />
          Watch on YouTube
        </a>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPlay className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-gray-600 font-medium">Loading video...</p>
          </div>
        </div>
      )}
      
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full h-80 ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default VideoEmbed;
