import React, { useState, useCallback } from 'react';
import { FiUpload, FiZap, FiSettings, FiZap as FiLightbulb, FiDownload, FiShare2, FiHeart, FiStar } from 'react-icons/fi';
import { AIServiceManager, urlToFile, ImageAnalysis, fileToBase64 } from '../lib/api/MockAIService';

// 预设提示词模板
const PROMPT_TEMPLATES = [
  { name: "Digital Art", prompts: ["Digital art style", "Cyberpunk aesthetic", "Neon colors", "Futuristic design"] },
  { name: "Photorealistic", prompts: ["Photorealistic", "High quality", "Professional photography", "4K resolution"] },
  { name: "Artistic", prompts: ["Oil painting style", "Watercolor effect", "Impressionist art", "Abstract composition"] },
  { name: "Cinematic", prompts: ["Cinematic lighting", "Movie poster style", "Dramatic atmosphere", "Hollywood quality"] }
];

// 热门提示词
const POPULAR_PROMPTS = [
  "Beautiful sunset over mountains, digital art style",
  "Cyberpunk cityscape at night with neon lights", 
  "Portrait of a warrior in fantasy armor",
  "Futuristic spaceship in deep space",
  "Magical forest with glowing mushrooms",
  "Steampunk mechanical robot",
  "Underwater scene with coral reef",
  "Apocalyptic wasteland with ruins"
];

interface ImageProcessorProps {
  className?: string;
}

export default function ImageProcessor({ className = '' }: ImageProcessorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysis | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [imageQuality, setImageQuality] = useState<'standard' | 'hd'>('hd');
  const [aiService] = useState(() => new AIServiceManager('openrouter'));

  // 处理图片上传
  const handleImageUpload = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      analyzeUploadedImage(file);
    };
    reader.readAsDataURL(file);
  }, []);

  // 分析上传的图片
  const analyzeUploadedImage = async (file: File) => {
    try {
      const analysis = await aiService.analyzeImage(file);
      setImageAnalysis(analysis);
    } catch (error) {
      console.error('Image analysis failed:', error);
    }
  };

  // 处理拖拽上传
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  // 处理文件选择
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  // 生成图片
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // 准备请求数据
      const requestData: any = {
        prompt,
        model: 'free',
        quality: imageQuality
      };
      
      // 如果有上传图片，添加到请求中
      if (selectedImage) {
        const imageFile = await urlToFile(selectedImage, 'image.jpg');
        requestData.imageBase64 = await fileToBase64(imageFile);
      }
      
      // 调用真实API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setProcessingProgress(100);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
      
      clearInterval(progressInterval);
    } catch (error) {
      console.error('AI processing failed:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
      }, 500);
    }
  };

  // 应用提示词模板
  const applyTemplate = (templateName: string) => {
    const template = PROMPT_TEMPLATES.find(t => t.name === templateName);
    if (template) {
      setSelectedTemplate(templateName);
      setPrompt(prev => prev + ', ' + template.prompts.join(', '));
    }
  };

  // 使用热门提示词
  const usePopularPrompt = (popularPrompt: string) => {
    setPrompt(popularPrompt);
  };

  return (
    <div className={`max-w-5xl mx-auto p-6 ${className}`}>
      {/* 三个区块完全上下排列 */}
      <div className="space-y-10">
        {/* 第一区块：Upload Image */}
        <div className="bg-white rounded-2xl p-10 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <FiUpload className="w-8 h-8 mr-4 text-primary-600" />
            Upload Image
          </h3>
          
          <div
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-colors ${
              selectedImage 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {selectedImage ? (
              <div className="space-y-8">
                <img 
                  src={selectedImage} 
                  alt="Uploaded" 
                  className="max-h-80 mx-auto rounded-xl shadow-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-base text-gray-500 hover:text-red-500 font-medium"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <FiUpload className="w-20 h-20 mx-auto text-gray-400" />
                <div>
                  <p className="text-gray-600 text-xl mb-2">Drag & drop an image here, or</p>
                  <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-semibold text-xl">
                    browse files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-lg text-gray-500">
                  JPG, PNG, WebP (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 第二区块：Edit Mode */}
        <div className="bg-white rounded-2xl p-10 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <FiZap className="w-8 h-8 mr-4 text-primary-600" />
            Edit Mode
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左侧：提示词输入 */}
            <div>
              <h4 className="text-xl font-medium text-gray-700 mb-6">Describe Your Vision</h4>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate... (e.g., A beautiful sunset over mountains, digital art style)"
                className="w-full h-48 p-6 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg mb-8"
              />

              {/* 提示词模板 */}
              <div className="mb-8">
                <h5 className="text-lg font-medium text-gray-700 mb-4">Style Templates:</h5>
                <div className="flex flex-wrap gap-3">
                  {PROMPT_TEMPLATES.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => applyTemplate(template.name)}
                      className={`px-6 py-3 text-base rounded-lg transition-colors ${
                        selectedTemplate === template.name
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 热门提示词 */}
              <div>
                <h5 className="text-lg font-medium text-gray-700 mb-4">Popular Prompts:</h5>
                <div className="space-y-3">
                  {POPULAR_PROMPTS.slice(0, 4).map((popularPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => usePopularPrompt(popularPrompt)}
                      className="text-left p-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors w-full text-base"
                    >
                      {popularPrompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：生成控制和高级选项 */}
            <div>
              <h4 className="text-xl font-medium text-gray-700 mb-6">Generation Settings</h4>
              
              {/* 高级选项 */}
              <div className="mb-8">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-left mb-4 p-4 bg-gray-50 rounded-lg"
                >
                  <span className="text-lg font-medium text-gray-700">Advanced Options</span>
                  <FiSettings className={`w-6 h-6 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
                </button>
                
                {showAdvanced && (
                  <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-3">
                        Image Quality
                      </label>
                      <select
                        value={imageQuality}
                        onChange={(e) => setImageQuality(e.target.value as 'standard' | 'hd')}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-base"
                      >
                        <option value="standard">Standard</option>
                        <option value="hd">High Definition</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 生成按钮 */}
              <div className="space-y-6">
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isProcessing}
                  className={`w-full py-8 px-8 rounded-xl font-semibold text-2xl transition-all ${
                    !prompt.trim() || isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-4"></div>
                      Generating... {processingProgress}%
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FiZap className="w-8 h-8 mr-4" />
                      Generate Image
                    </div>
                  )}
                </button>

                {/* 进度条 */}
                {isProcessing && (
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-primary-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {/* 使用提示 */}
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h5 className="font-medium text-blue-900 mb-4 text-lg">💡 Tips</h5>
                <ul className="text-base text-blue-800 space-y-3">
                  <li>• Be specific about style and mood</li>
                  <li>• Include lighting preferences</li>
                  <li>• Mention artistic style</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI建议的提示词 */}
          {imageAnalysis && imageAnalysis.suggestedPrompts.length > 0 && (
            <div className="mt-8 p-8 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center text-lg text-yellow-800 mb-4">
                <FiLightbulb className="w-6 h-6 mr-3 text-yellow-600" />
                AI Suggested Prompts:
              </div>
              <div className="flex flex-wrap gap-4">
                {imageAnalysis.suggestedPrompts.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="px-6 py-3 text-base bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 第三区块：Output Gallery */}
        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-10 flex items-center">
            <FiStar className="w-8 h-8 mr-4 text-primary-600" />
            Output Gallery
          </h3>
          
          {resultImage ? (
            <div className="space-y-10">
              <div className="relative group max-w-5xl mx-auto">
                <img
                  src={resultImage}
                  alt="Generated"
                  className="w-full rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-6">
                    <button className="p-5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <FiDownload className="w-8 h-8 text-gray-700" />
                    </button>
                    <button className="p-5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <FiShare2 className="w-8 h-8 text-gray-700" />
                    </button>
                    <button className="p-5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <FiHeart className="w-8 h-8 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-10">
                <button className="px-12 py-5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold text-xl">
                  <FiDownload className="w-8 h-8 mr-4 inline" />
                  Download
                </button>
                <button className="px-12 py-5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold text-xl">
                  <FiShare2 className="w-8 h-8 mr-4 inline" />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FiZap className="w-32 h-32 mx-auto mb-10 text-gray-300" />
                <p className="text-3xl font-medium text-gray-400 mb-6">Your generated image will appear here</p>
                <p className="text-xl text-gray-400">Upload an image and enter a prompt to get started</p>
              </div>
            </div>
          )}
                 </div>
       </div>
     </div>
  );
}
