import type { NextApiRequest, NextApiResponse } from 'next';
import { createOpenRouterService } from '../../lib/api/OpenRouterService';
import { fileToBase64 } from '../../lib/api/MockAIService';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

interface GenerateRequest {
  prompt: string;
  imageBase64?: string;
  model?: 'free' | 'standard';
  quality?: 'standard' | 'hd';
}

interface GenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  cost?: number;
  processingTime?: number;
  model?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const { prompt, imageBase64, model = 'free', quality = 'hd' }: GenerateRequest = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt is required' 
      });
    }

    // 获取OpenRouter API密钥
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'OpenRouter API key not configured' 
      });
    }

    // 创建OpenRouter服务
    const openRouterService = createOpenRouterService(apiKey, model);

    // 验证API密钥
    const isValidKey = await openRouterService.validateApiKey();
    if (!isValidKey) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid OpenRouter API key' 
      });
    }

    // 生成图像
    const response = await openRouterService.generateImage({
      prompt,
      image: imageBase64,
      quality: quality
    });

    const processingTime = Date.now() - startTime;

    if (!response.success) {
      console.error('OpenRouter provider error detail:', response.error);
      return res.status(500).json({
        success: false,
        error: response.error || 'Image generation failed',
        processingTime
      });
    }

    // 记录使用统计（这里可以集成到你的用户系统）
    console.log('Image generation completed:', {
      prompt: prompt.substring(0, 100) + '...',
      model: `google/gemini-2.5-flash-image-preview${model === 'free' ? ':free' : ''}`,
      cost: response.cost,
      processingTime,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      imageUrl: response.imageUrl,
      cost: response.cost,
      processingTime,
      model: `google/gemini-2.5-flash-image-preview${model === 'free' ? ':free' : ''}`
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Image generation error:', error);
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      processingTime
    });
  }
}
