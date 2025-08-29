import React, { useState, useCallback } from 'react';
import { 
  FiUpload, 
  FiZap, 
  FiSettings, 
  FiZap as FiLightbulb, 
  FiDownload, 
  FiShare2, 
  FiHeart, 
  FiStar,
  FiEdit3,
  FiInfo,
  FiCheck,
  FiX,
  FiImage,
  FiRefreshCw
} from 'react-icons/fi';
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
    <div className={`max-w-6xl mx-auto p-8 ${className}`}>
      {/* 三个区块完全上下排列 - 彻底重新设计 */}
      <div className="space-y-12">
        
        {/* ===== 第一区块：Upload Image ===== */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FiUpload className="w-10 h-10 mr-4 text-primary-600" />
              Upload Image
            </h2>
            <p className="text-lg text-gray-600">Start by uploading your image to begin the AI transformation</p>
          </div>
          
          <div
            className={`border-3 border-dashed rounded-3xl p-20 text-center transition-all duration-300 ${
              selectedImage 
                ? 'border-primary-500 bg-primary-50 shadow-lg' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {selectedImage ? (
              <div className="space-y-8">
                <div className="relative inline-block">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded" 
                    className="max-h-96 mx-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-colors"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Image uploaded successfully!</p>
                  <p className="text-sm text-gray-500">Ready for AI transformation</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="relative">
                  <FiUpload className="w-24 h-24 mx-auto text-gray-400 mb-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary-600 text-white rounded-full p-4 shadow-lg">
                      <FiImage className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-2xl font-semibold text-gray-700">Drag & drop your image here</p>
                  <p className="text-lg text-gray-500">or</p>
                  <label className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg cursor-pointer transition-colors shadow-lg">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-base text-gray-600 mb-2">Supported formats:</p>
                  <p className="text-sm text-gray-500">JPG, PNG, WebP, GIF (Max 10MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== 第二区块：Edit Mode ===== */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FiZap className="w-10 h-10 mr-4 text-primary-600" />
              Edit Mode
            </h2>
            <p className="text-lg text-gray-600">Describe your vision and configure generation settings</p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            
            {/* 左侧：提示词输入区域 */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* 主要提示词输入 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiEdit3 className="w-8 h-8 mr-3 text-primary-600" />
                  Describe Your Vision
                </h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate... (e.g., A beautiful sunset over mountains, digital art style, cinematic lighting, 4K quality)"
                  className="w-full h-56 p-6 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg transition-colors"
                />
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FiInfo className="w-4 h-4 mr-2" />
                  Be specific about style, mood, lighting, and artistic direction
                </div>
              </div>

              {/* 样式模板 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Style Templates</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PROMPT_TEMPLATES.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => applyTemplate(template.name)}
                      className={`p-4 rounded-xl transition-all duration-200 ${
                        selectedTemplate === template.name
                          ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                          : 'bg-white hover:bg-primary-50 text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-medium">{template.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 热门提示词 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Prompts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {POPULAR_PROMPTS.slice(0, 6).map((popularPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => usePopularPrompt(popularPrompt)}
                      className="text-left p-4 bg-white hover:bg-primary-50 text-gray-700 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-primary-300"
                    >
                      <div className="text-sm font-medium">{popularPrompt}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI建议的提示词 */}
              {imageAnalysis && imageAnalysis.suggestedPrompts.length > 0 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
                  <div className="flex items-center text-xl font-semibold text-yellow-800 mb-6">
                    <FiLightbulb className="w-8 h-8 mr-3 text-yellow-600" />
                    AI Suggested Prompts
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {imageAnalysis.suggestedPrompts.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(suggestion)}
                        className="p-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl transition-colors text-sm font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧：生成控制区域 */}
            <div className="xl:col-span-1 space-y-8">
              
              {/* 生成按钮 */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Ready to Generate?</h3>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isProcessing}
                  className={`w-full py-6 px-8 rounded-xl font-bold text-xl transition-all duration-300 ${
                    !prompt.trim() || isProcessing
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-white text-primary-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-4"></div>
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
                  <div className="mt-6">
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all duration-300 shadow-lg"
                        style={{ width: `${processingProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-white text-sm mt-2">Processing your image...</p>
                  </div>
                )}
              </div>

              {/* 高级选项 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-left mb-6 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-700">Advanced Options</span>
                  <FiSettings className={`w-6 h-6 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
                </button>
                
                {showAdvanced && (
                  <div className="space-y-6 p-6 bg-white rounded-xl">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-3">
                        Image Quality
                      </label>
                      <select
                        value={imageQuality}
                        onChange={(e) => setImageQuality(e.target.value as 'standard' | 'hd')}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                      >
                        <option value="standard">Standard Quality</option>
                        <option value="hd">High Definition (HD)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 使用提示 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                  <FiLightbulb className="w-6 h-6 mr-3 text-blue-600" />
                  Pro Tips
                </h3>
                <ul className="text-blue-800 space-y-4">
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>Be specific about style and mood</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>Include lighting preferences</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>Mention artistic style and quality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 第三区块：Output Gallery ===== */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FiStar className="w-10 h-10 mr-4 text-primary-600" />
              Output Gallery
            </h2>
            <p className="text-lg text-gray-600">Your AI-generated masterpiece will appear here</p>
          </div>
          
          {resultImage ? (
            <div className="space-y-12">
              {/* 生成的图片展示 */}
              <div className="relative group max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={resultImage}
                    alt="Generated"
                    className="w-full h-auto"
                  />
                  {/* 悬停效果 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-6">
                      <button className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-110">
                        <FiDownload className="w-8 h-8 text-gray-700" />
                      </button>
                      <button className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-110">
                        <FiShare2 className="w-8 h-8 text-gray-700" />
                      </button>
                      <button className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-110">
                        <FiHeart className="w-8 h-8 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex justify-center space-x-8">
                <button className="px-12 py-6 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FiDownload className="w-8 h-8 mr-4 inline" />
                  Download Image
                </button>
                <button className="px-12 py-6 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FiShare2 className="w-8 h-8 mr-4 inline" />
                  Share Result
                </button>
                <button className="px-12 py-6 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105">
                  <FiRefreshCw className="w-8 h-8 mr-4 inline" />
                  Generate Again
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500 max-w-2xl">
                <div className="relative mb-12">
                  <FiZap className="w-40 h-40 mx-auto text-gray-300 mb-8" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary-600 text-white rounded-full p-6 shadow-2xl">
                      <FiImage className="w-12 h-12" />
                    </div>
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-400 mb-6">Your AI Masterpiece Awaits</h3>
                <p className="text-xl text-gray-500 mb-8">Upload an image and describe your vision to see the magic happen</p>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-lg text-gray-600">✨ Ready to transform your images with AI?</p>
                </div>
              </div>
            </div>
          )}
                 </div>
       </div>
     </div>
  );
}
