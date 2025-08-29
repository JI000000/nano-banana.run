export interface OpenRouterConfig {
  apiKey: string;
  model: 'free' | 'standard';
  baseUrl?: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  image?: string; // base64 encoded image for image-to-image
  width?: number;
  height?: number;
  quality?: 'standard' | 'hd';
  style?: string;
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  cost?: number;
  processingTime?: number;
}

export class OpenRouterService {
  private config: OpenRouterConfig;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor(config: OpenRouterConfig) {
    this.config = config;
  }

  private getModelId(): string {
    // 根据OpenRouter文档，正确的模型名称
    const baseModel = 'google/gemini-2.5-flash-image-preview';
    return this.config.model === 'free' ? `${baseModel}:free` : baseModel;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nano-banana.run',
      'X-Title': 'Nano Banana AI'
    };
  }

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const startTime = Date.now();
    
    try {
      // Gemini 2.5 Flash Image Preview 使用聊天API进行图像生成
      const payload = {
        model: this.getModelId(),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: request.prompt
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      };

      console.log('Sending payload to OpenRouter:', JSON.stringify(payload, null, 2));

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('OpenRouter Error Response:', JSON.stringify(errorData, null, 2));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;

      // 调试：打印响应数据
      console.log('OpenRouter API Response:', JSON.stringify(data, null, 2));
      console.log('Response structure:', {
        hasChoices: !!data.choices,
        choicesLength: data.choices?.length,
        hasMessage: !!data.choices?.[0]?.message,
        hasContent: !!data.choices?.[0]?.message?.content,
        contentType: typeof data.choices?.[0]?.message?.content,
        isArray: Array.isArray(data.choices?.[0]?.message?.content)
      });

      // 解析响应获取图片URL
      const imageUrl = this.extractImageUrl(data);
      
      if (!imageUrl) {
        console.log('Failed to extract image URL from response');
        throw new Error('No image generated in response');
      }

      return {
        success: true,
        imageUrl,
        processingTime,
        cost: this.calculateCost(data.usage, this.config.model)
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime
      };
    }
  }

  private extractImageUrl(data: any): string | null {
    // 根据OpenRouter图像生成API的响应格式提取图片URL
    try {
      console.log('Extracting image URL from data structure:', Object.keys(data));
      
      // 方法1: 检查data数组中的url字段 (OpenAI格式)
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const imageData = data.data[0];
        if (imageData.url) {
          console.log('Found URL in data array:', imageData.url);
          return imageData.url;
        }
      }
      
      // 方法2: 检查data中的直接图片字段
      if (data.image_url) {
        console.log('Found direct image_url:', data.image_url);
        return data.image_url;
      }
      
      // 方法3: 检查data中的images数组
      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        console.log('Found images array:', data.images[0]);
        return data.images[0];
      }
      
      // 方法4: 检查data中的url字段
      if (data.url) {
        console.log('Found direct url:', data.url);
        return data.url;
      }
      
      // 方法5: 检查choices数组中的content (聊天格式)
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        console.log('Found content:', typeof content, content.substring(0, 200));
        
        // 如果是字符串，尝试提取URL
        if (typeof content === 'string') {
          const urlMatch = content.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp|gif)/i);
          if (urlMatch) {
            console.log('Found URL in content:', urlMatch[0]);
            return urlMatch[0];
          }
        }
        
        // 如果是数组，检查是否有图片内容
        if (Array.isArray(content)) {
          for (const item of content) {
            if (item.type === 'image_url' && item.image_url?.url) {
              console.log('Found image_url in content array:', item.image_url.url);
              return item.image_url.url;
            }
          }
        }
      }
      
      // 方法6: 检查choices数组中的content数组 (Gemini格式)
      const choicesContent = data.choices?.[0]?.message?.content;
      if (Array.isArray(choicesContent)) {
        for (const item of choicesContent) {
          if (item.type === 'image_url' && item.image_url?.url) {
            console.log('Found image_url in choices content array:', item.image_url.url);
            return item.image_url.url;
          }
        }
      }
      
      // 方法7: 在完整JSON中查找 data:image Base64
      try {
        const jsonText = JSON.stringify(data);
        const dataUrlMatch = jsonText.match(/data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+/i);
        if (dataUrlMatch) {
          console.log('Found data URL in raw JSON');
          return dataUrlMatch[0];
        }
        // 兜底：查找超长Base64串并组装为data URL
        const base64Match = jsonText.match(/([A-Za-z0-9+/=]{800,})/);
        if (base64Match) {
          const candidate = base64Match[1];
          console.log('Found raw base64 candidate, constructing data URL');
          return `data:image/png;base64,${candidate}`;
        }
      } catch {}

      console.log('No image URL found in response');
      return null;
    } catch (error) {
      console.error('Error extracting image URL:', error);
      return null;
    }
  }

  private calculateCost(usage: any, model: 'free' | 'standard'): number {
    if (model === 'free') return 0;
    
    if (!usage) return 0;
    
    // Standard版本的定价
    const inputTokenCost = (usage.prompt_tokens / 1000000) * 0.30;
    const outputTokenCost = (usage.completion_tokens / 1000000) * 2.50;
    const inputImageCost = (usage.input_images / 1000) * 1.238;
    const outputImageCost = (usage.output_images / 1000) * 0.03;
    
    return inputTokenCost + outputTokenCost + inputImageCost + outputImageCost;
  }

  // 检查API密钥是否有效
  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: this.getHeaders()
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // 获取模型信息
  async getModelInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/models/${this.getModelId()}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to get model info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// 使用示例
export const createOpenRouterService = (apiKey: string, model: 'free' | 'standard' = 'free') => {
  return new OpenRouterService({
    apiKey,
    model,
    baseUrl: 'https://openrouter.ai/api/v1'
  });
};
