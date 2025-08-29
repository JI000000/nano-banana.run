export interface ImageAnalysis {
  objects: string[];
  style: string;
  quality: string;
  suggestedPrompts: string[];
}

export interface ProcessingStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  estimatedTime?: number;
  result?: string;
  error?: string;
}

export interface AIService {
  processImage(image: File, prompt: string): Promise<string>;
  analyzeImage(image: File): Promise<ImageAnalysis>;
  getProcessingStatus(jobId: string): Promise<ProcessingStatus>;
}

// 模拟AI处理服务
export class MockAIService implements AIService {
  private processingJobs = new Map<string, ProcessingStatus>();

  async processImage(image: File, prompt: string): Promise<string> {
    const jobId = this.generateJobId();
    
    // 初始化处理状态
    this.processingJobs.set(jobId, {
      status: 'pending',
      progress: 0
    });

    // 模拟处理过程
    await this.simulateProcessing(jobId);
    
    // 返回处理后的图片URL（这里返回原图，实际应用中会返回AI处理后的图片）
    return URL.createObjectURL(image);
  }

  async analyzeImage(image: File): Promise<ImageAnalysis> {
    // 模拟图片分析延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 返回模拟的分析结果
    return {
      objects: ['person', 'background', 'object'],
      style: 'photographic',
      quality: 'high',
      suggestedPrompts: [
        'Add a mountain background',
        'Change the lighting to sunset',
        'Make it more dramatic',
        'Add some clouds in the sky',
        'Transform to a winter scene'
      ]
    };
  }

  async getProcessingStatus(jobId: string): Promise<ProcessingStatus> {
    const status = this.processingJobs.get(jobId);
    if (!status) {
      throw new Error('Job not found');
    }
    return status;
  }

  private generateJobId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async simulateProcessing(jobId: string): Promise<void> {
    const status = this.processingJobs.get(jobId);
    if (!status) return;

    // 更新状态为处理中
    status.status = 'processing';
    status.estimatedTime = 3000; // 3秒

    // 模拟进度更新
    const progressSteps = [10, 25, 50, 75, 90, 100];
    const stepDelay = 500; // 每步500ms

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDelay));
      
      const currentStatus = this.processingJobs.get(jobId);
      if (currentStatus) {
        currentStatus.progress = progressSteps[i];
        currentStatus.estimatedTime = (progressSteps.length - i - 1) * stepDelay;
      }
    }

    // 完成处理
    const finalStatus = this.processingJobs.get(jobId);
    if (finalStatus) {
      finalStatus.status = 'completed';
      finalStatus.progress = 100;
      finalStatus.estimatedTime = 0;
    }
  }

  // 清理完成的作业
  cleanupCompletedJobs(): void {
    this.processingJobs.forEach((status, jobId) => {
      if (status.status === 'completed' || status.status === 'failed') {
        this.processingJobs.delete(jobId);
      }
    });
  }
}

// OpenRouter AI服务适配器
class OpenRouterAIService implements AIService {
  constructor(private openRouterService: any) {}

  async processImage(image: File, prompt: string): Promise<string> {
    const imageBase64 = await fileToBase64(image);
    const response = await this.openRouterService.generateImage({
      prompt,
      image: imageBase64
    });

    if (!response.success || !response.imageUrl) {
      throw new Error(response.error || 'Failed to generate image');
    }

    return response.imageUrl;
  }

  async analyzeImage(image: File): Promise<ImageAnalysis> {
    // OpenRouter可能不支持图片分析，返回默认分析
    return {
      objects: ['person', 'background', 'object'],
      style: 'photographic',
      quality: 'high',
      suggestedPrompts: [
        'Add a mountain background',
        'Change the lighting to sunset',
        'Make it more dramatic',
        'Add some clouds in the sky',
        'Transform to a winter scene'
      ]
    };
  }

  async getProcessingStatus(jobId: string): Promise<ProcessingStatus> {
    // OpenRouter是同步的，直接返回完成状态
    return {
      status: 'completed',
      progress: 100,
      estimatedTime: 0
    };
  }
}

// AI服务管理器
export class AIServiceManager {
  private service!: AIService;
  private openRouterService?: any;
  
  constructor(serviceType: 'mock' | 'replicate' | 'stability' | 'openai' | 'openrouter' = 'mock') {
    switch (serviceType) {
      case 'mock':
        this.service = new MockAIService();
        break;
      case 'openrouter':
        // 动态导入OpenRouter服务
        this.initOpenRouterService();
        break;
      case 'replicate':
        // TODO: 实现Replicate服务
        this.service = new MockAIService();
        break;
      case 'stability':
        // TODO: 实现Stability服务
        this.service = new MockAIService();
        break;
      case 'openai':
        // TODO: 实现OpenAI服务
        this.service = new MockAIService();
        break;
      default:
        this.service = new MockAIService();
    }
  }

  private async initOpenRouterService() {
    try {
      const { createOpenRouterService } = await import('./OpenRouterService');
      const apiKey = process.env.OPENROUTER_API_KEY || '';
      const model = (process.env.OPENROUTER_MODEL as 'free' | 'standard') || 'free';
      this.openRouterService = createOpenRouterService(apiKey, model);
      this.service = new OpenRouterAIService(this.openRouterService);
    } catch (error) {
      console.error('Failed to initialize OpenRouter service:', error);
      this.service = new MockAIService();
    }
  }
  
  async processImage(image: File, prompt: string): Promise<string> {
    return this.service.processImage(image, prompt);
  }

  async analyzeImage(image: File): Promise<ImageAnalysis> {
    return this.service.analyzeImage(image);
  }

  async getProcessingStatus(jobId: string): Promise<ProcessingStatus> {
    return this.service.getProcessingStatus(jobId);
  }
}

// 工具函数：将URL转换为File对象
export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

// 工具函数：将File转换为Base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // 移除data:image/jpeg;base64,前缀
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}
