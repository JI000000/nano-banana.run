import React, { useState, useCallback } from 'react';
import { 
  FiUpload, 
  FiZap, 
  FiEye, 
  FiDownload, 
  FiShare2, 
  FiCheck, 
  FiInfo,
  FiImage,
  FiType,
  FiGrid
} from 'react-icons/fi';

// 编辑模式类型
type EditingMode = 'text' | 'scene' | 'style' | 'batch';

interface UnifiedImageEditorProps {
  className?: string;
  showModeTabs?: boolean;
  showFeatures?: boolean;
  showTips?: boolean;
  showStats?: boolean;
  compact?: boolean;
}

export default function UnifiedImageEditor({ 
  className = '',
  showModeTabs = false,
  showFeatures = true,
  showTips = true,
  showStats = true,
  compact = false
}: UnifiedImageEditorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<EditingMode>('text');

  // 处理图片上传
  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
  }, []);

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
    // 模拟处理过程
    setTimeout(() => {
      setResultImage('/images/examples/result-1.jpg'); // 使用示例图片
      setIsProcessing(false);
    }, 2000);
  };

  // 根据模式获取快速提示词
  const getQuickPrompts = (mode: EditingMode) => {
    const prompts = {
      text: [
        "Replace sign text: 'Coming Soon' → 'Now Open'",
        "Translate all visible text into Japanese (match fonts)"
      ],
      scene: [
        "Place subject in a snowy mountain at golden hour",
        "Convert daytime to sunset with warm lighting"
      ],
      style: [
        "Apply oil painting style with visible brush strokes",
        "Convert to watercolor while keeping outlines"
      ],
      batch: [
        "Process all images with the same text replacement",
        "Apply consistent style across multiple images"
      ]
    };
    return prompts[mode];
  };

  const quickPrompts = getQuickPrompts(mode);

  return (
    <div className={`${compact ? 'max-w-6xl' : 'max-w-7xl'} mx-auto ${className}`}>
      
      {/* 模式切换标签 - 仅在需要时显示 */}
      {showModeTabs && (
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button
            onClick={() => setMode('text')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'text' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiType className="w-4 h-4 mr-2" />
            Text
          </button>
          <button
            onClick={() => setMode('scene')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'scene' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiImage className="w-4 h-4 mr-2" />
            Scene
          </button>
          <button
            onClick={() => setMode('style')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'style' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiZap className="w-4 h-4 mr-2" />
            Style
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'batch' 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiGrid className="w-4 h-4 mr-2" />
            Batch
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Upload & Prompt */}
        <div className="space-y-4">
          
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <FiUpload className="w-5 h-5 mr-2 text-primary-600" />
              <h3 className="font-semibold text-gray-900">Upload Image</h3>
            </div>
            
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
                selectedImage 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {selectedImage ? (
                <div className="space-y-2">
                  <img src={selectedImage} alt="Uploaded" className="w-20 h-20 object-cover rounded-lg mx-auto" />
                  <p className="text-sm font-medium text-gray-700">✓ Image uploaded</p>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <FiUpload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600">Drag & drop or</p>
                  <button
                    onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Browse Files
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Prompt Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <FiZap className="w-5 h-5 mr-2 text-primary-600" />
              <h3 className="font-semibold text-gray-900">Describe Vision</h3>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            
            {/* Quick Prompts */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Quick prompts:</p>
              <div className="space-y-1">
                {quickPrompts.map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(quickPrompt)}
                    className="w-full text-left p-2 bg-gray-50 hover:bg-primary-50 text-gray-700 rounded text-xs border border-gray-200 hover:border-primary-300 transition-colors"
                  >
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isProcessing}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FiZap className="w-4 h-4 mr-2 inline" />
            {isProcessing ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {/* Center Column: Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <FiEye className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Live Preview</h3>
          </div>
          
          <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            {resultImage ? (
              <img src={resultImage} alt="Generated" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-center text-gray-500">
                <FiImage className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Preview will appear here</p>
              </div>
            )}
          </div>
          
          {resultImage && (
            <div className="mt-3 flex gap-2">
              <button className="flex-1 bg-primary-600 text-white py-2 rounded text-sm font-medium hover:bg-primary-700">
                <FiDownload className="w-4 h-4 mr-1 inline" />
                Download
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-200">
                <FiShare2 className="w-4 h-4 mr-1 inline" />
                Share
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Features & Tips - 条件渲染 */}
        {(showFeatures || showTips || showStats) && (
          <div className="space-y-4">
            
            {/* Features */}
            {showFeatures && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCheck className="w-4 h-4 mr-2 text-green-500" />
                    <span>Text Replacement</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCheck className="w-4 h-4 mr-2 text-green-500" />
                    <span>Scene Transformation</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCheck className="w-4 h-4 mr-2 text-green-500" />
                    <span>Style Matching</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCheck className="w-4 h-4 mr-2 text-green-500" />
                    <span>Batch Processing</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pro Tips */}
            {showTips && (
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <div className="flex items-center mb-3">
                  <FiInfo className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Pro Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800">
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
              </div>
            )}

            {/* Quick Stats */}
            {showStats && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Performance</h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary-600">&lt;2s</div>
                    <div className="text-xs text-gray-500">Generation</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">4.8/5</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
