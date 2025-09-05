import React, { useState, useCallback } from 'react';
import Image from 'next/image';
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
  FiRefreshCw,
  FiEye
} from 'react-icons/fi';
import { AIServiceManager, urlToFile, ImageAnalysis, fileToBase64 } from '../lib/api/MockAIService';
import SmartPromptSuggester from './SmartPromptSuggester';
import RealTimePreview from './RealTimePreview';
import Button from './ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import LoadingSpinner, { ButtonLoader } from './ui/LoadingSpinner';
import ProgressBar from './ui/ProgressBar';
import Modal, { ImageModal } from './ui/Modal';

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
  const [showImageModal, setShowImageModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 分析上传的图片（稳定引用）
  const analyzeUploadedImage = useCallback(async (file: File) => {
    try {
      const analysis = await aiService.analyzeImage(file);
      setImageAnalysis(analysis);
    } catch (error) {
      console.error('Image analysis failed:', error);
    }
  }, [aiService]);

  // 处理图片上传
  const handleImageUpload = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      analyzeUploadedImage(file);
    };
    reader.readAsDataURL(file);
  }, [analyzeUploadedImage]);

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
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image');
      return;
    }
    
    setIsProcessing(true);
    setProcessingProgress(0);
    setError(null);
    
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
      setError(error instanceof Error ? error.message : 'Generation failed. Please try again.');
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

  // 使用热门提示词（避免被误判为Hook）
  const selectPopularPrompt = (popularPrompt: string) => {
    setPrompt(popularPrompt);
  };

  return (
    <div className={`max-w-7xl mx-auto p-4 ${className}`}>
      {/* 按照用户操作流程设计的布局：上传 → 编辑 → 预览 → 输出 */}
      <div className="space-y-6">
        
        {/* 错误提示 */}
        {error && (
          <Card variant="outlined" className="border-red-200 bg-red-50">
            <div className="flex items-center text-red-800">
              <FiX className="w-5 h-5 mr-2" />
              <span className="font-medium">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </Card>
        )}
        
        {/* ===== 第一步：上传图片 ===== */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FiUpload className="w-6 h-6 mr-3 text-primary-600" />
                Step 1: Upload Your Image
              </CardTitle>
              {selectedImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiX className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
          
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                selectedImage 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {selectedImage ? (
                <div className="flex items-center justify-center space-x-6">
                  <div className="relative">
                    <Image 
                      src={selectedImage} 
                      alt="Uploaded" 
                      width={120}
                      height={120}
                      className="rounded-lg shadow-sm object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-medium text-gray-700">✓ Image uploaded successfully!</p>
                    <p className="text-sm text-gray-500">Ready for AI transformation</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <FiUpload className="w-12 h-12 mx-auto text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">Drag & drop your image here</p>
                    <p className="text-sm text-gray-500">or</p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    >
                      Browse Files
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">JPG, PNG, WebP, GIF (Max 10MB)</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ===== 第二步：编辑和配置 ===== */}
        <div className="space-y-6">
          
          {/* 提示词输入区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiZap className="w-6 h-6 mr-3 text-primary-600" />
                Step 2: Describe Your Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to create?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate... (e.g., A beautiful sunset over mountains, digital art style, cinematic lighting, 4K quality)"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">💡 Be specific about style, mood, lighting, and artistic direction</p>
            </div>

            {/* 样式模板和快速提示词 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 样式模板 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Style Templates</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PROMPT_TEMPLATES.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => applyTemplate(template.name)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTemplate === template.name
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-primary-50 text-gray-700 border border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 快速提示词 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Prompts</h3>
                <div className="space-y-2">
                  {POPULAR_PROMPTS.slice(0, 4).map((popularPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => selectPopularPrompt(popularPrompt)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-primary-50 text-gray-700 rounded-lg transition-colors text-sm border border-gray-200 hover:border-primary-300"
                    >
                      {popularPrompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI建议的提示词 */}
            {imageAnalysis && imageAnalysis.suggestedPrompts.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-center text-sm font-medium text-yellow-800 mb-3">
                  <FiLightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  AI Suggested Prompts
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {imageAnalysis.suggestedPrompts.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(suggestion)}
                      className="p-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors text-sm font-medium text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 生成按钮和高级选项 */}
            <div className="flex items-center justify-between mt-6">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isProcessing}
                loading={isProcessing}
                size="lg"
                icon={<FiZap />}
                className="min-w-[200px]"
              >
                {isProcessing ? `Generating... ${processingProgress}%` : 'Generate Image'}
              </Button>

              {/* 高级选项 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                icon={<FiSettings />}
              >
                Advanced Options
              </Button>
            </div>

            {/* 高级选项展开 */}
            {showAdvanced && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Quality
                </label>
                <select
                  value={imageQuality}
                  onChange={(e) => setImageQuality(e.target.value as 'standard' | 'hd')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                >
                  <option value="standard">Standard Quality</option>
                  <option value="hd">High Definition (HD)</option>
                </select>
              </div>
            )}

            {/* 进度条 */}
            {isProcessing && (
              <div className="mt-4">
                <ProgressBar
                  progress={processingProgress}
                  size="lg"
                  color="primary"
                  showPercentage={true}
                  animated={true}
                  label="Processing your image..."
                />
              </div>
            )}
          </CardContent>
        </Card>

          {/* 预览和辅助功能区域 - 三列布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 实时预览 - 占据更多空间 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FiEye className="w-5 h-5 mr-2 text-blue-600" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RealTimePreview
                    prompt={prompt}
                    baseImage={selectedImage || undefined}
                    metadata={{
                      style: selectedTemplate,
                      quality: imageQuality,
                      industry: selectedTemplate ? 'general' : undefined
                    }}
                    className="mb-0"
                  />
                </CardContent>
              </Card>
            </div>

            {/* 右侧辅助功能 - 紧凑布局 */}
            <div className="space-y-4">
              
              {/* AI助手 */}
              <Card padding="sm">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <FiZap className="w-4 h-4 mr-2 text-green-600" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SmartPromptSuggester
                    onPromptSelected={setPrompt}
                    currentPrompt={prompt}
                    userIndustry={selectedTemplate}
                    preferredStyle={imageQuality}
                    qualityLevel={imageQuality}
                    className="mb-0"
                  />
                </CardContent>
              </Card>

              {/* 使用提示 */}
              <Card variant="filled" className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-sm text-blue-900 flex items-center">
                    <FiLightbulb className="w-4 h-4 mr-2 text-blue-600" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Be specific about style and mood</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Include lighting preferences</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Mention artistic style and quality</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ===== 第三步：输出结果 - 突出显示 ===== */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FiStar className="w-6 h-6 mr-3 text-primary-600" />
              Step 3: Your AI-Generated Masterpiece
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resultImage ? (
              <div className="space-y-6">
                {/* 生成的图片展示 - 大尺寸显示 */}
                <div className="relative group max-w-4xl mx-auto">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={resultImage}
                      alt="Generated"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain cursor-pointer"
                      onClick={() => setShowImageModal(true)}
                    />
                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<FiDownload />}
                          className="rounded-full p-3"
                        >
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<FiShare2 />}
                          className="rounded-full p-2"
                        >
                          <span className="sr-only">Share</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<FiHeart />}
                          className="rounded-full p-2"
                        >
                          <span className="sr-only">Like</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<FiDownload />}
                    className="shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Download Image
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<FiShare2 />}
                    className="shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Share Result
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    icon={<FiRefreshCw />}
                    onClick={() => {
                      setResultImage(null);
                      setPrompt('');
                    }}
                    className="shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Generate Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                <div className="text-center text-gray-500 max-w-2xl">
                  <div className="relative mb-6">
                    <FiZap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary-600 text-white rounded-full p-3 shadow-lg">
                        <FiImage className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-3">Your AI Masterpiece Awaits</h3>
                  <p className="text-sm text-gray-500 mb-4">Upload an image and describe your vision to see the magic happen</p>
                  <Card variant="filled" className="bg-white">
                    <CardContent>
                      <p className="text-sm text-gray-600">✨ Ready to transform your images with AI?</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* 图片预览模态框 */}
        {resultImage && (
          <ImageModal
            isOpen={showImageModal}
            onClose={() => setShowImageModal(false)}
            src={resultImage}
            alt="Generated AI Image"
            title="Your AI-Generated Masterpiece"
          />
        )}
      </div>
    </div>
  );
}
