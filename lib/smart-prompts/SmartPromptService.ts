import { AIServiceManager } from '../api/MockAIService';

/**
 * Smart Prompt Service - Core engine for intelligent prompt suggestions
 * Provides context-aware, industry-specific, and user-personalized prompt recommendations
 */
export interface PromptSuggestion {
  id: string;
  prompt: string;
  confidence: number;
  category: string;
  industry?: string;
  tags: string[];
  estimatedQuality: number;
  userRating?: number;
  usageCount: number;
}

export interface IndustryTemplate {
  id: string;
  industry: string;
  name: string;
  description: string;
  basePrompt: string;
  variables: PromptVariable[];
  examples: TemplateExample[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  cost: number;
}

export interface PromptVariable {
  name: string;
  type: 'text' | 'color' | 'style' | 'mood' | 'quality';
  description: string;
  defaultValue: string;
  options?: string[];
  required: boolean;
}

export interface TemplateExample {
  beforeImage: string;
  afterImage: string;
  prompt: string;
  result: string;
  rating: number;
}

export interface UserBehavior {
  userId: string;
  promptHistory: string[];
  preferredStyles: string[];
  industryFocus: string[];
  qualityPreferences: string[];
  lastUsed: Date;
}

export class SmartPromptService {
  private aiService: AIServiceManager;
  private industryTemplates: Map<string, IndustryTemplate> = new Map();
  private userBehaviors: Map<string, UserBehavior> = new Map();
  private promptSuggestions: Map<string, PromptSuggestion[]> = new Map();

  constructor(aiService: AIServiceManager) {
    this.aiService = aiService;
    this.initializeIndustryTemplates();
  }

  /**
   * Initialize industry-specific prompt templates
   */
  private initializeIndustryTemplates(): void {
    // E-commerce Templates
    this.addIndustryTemplate({
      id: 'ecom-product-optimization',
      industry: 'ecommerce',
      name: 'Product Photography Enhancement',
      description: 'Optimize product images for e-commerce with professional lighting and styling',
      basePrompt: 'Professional product photography with {lighting} lighting, {background} background, {style} style, {quality} quality',
      variables: [
        { name: 'lighting', type: 'style', description: 'Lighting style', defaultValue: 'studio lighting', options: ['studio lighting', 'natural lighting', 'dramatic lighting'], required: true },
        { name: 'background', type: 'style', description: 'Background style', defaultValue: 'clean white', options: ['clean white', 'lifestyle', 'minimalist'], required: true },
        { name: 'style', type: 'style', description: 'Photography style', defaultValue: 'commercial', options: ['commercial', 'lifestyle', 'editorial'], required: true },
        { name: 'quality', type: 'quality', description: 'Image quality', defaultValue: '4K', options: ['HD', '4K', '8K'], required: true }
      ],
      examples: [],
      tags: ['ecommerce', 'product', 'photography', 'professional'],
      difficulty: 'intermediate',
      estimatedTime: '2-3 minutes',
      cost: 0.003
    });

    // Marketing Templates
    this.addIndustryTemplate({
      id: 'marketing-social-media',
      industry: 'marketing',
      name: 'Social Media Content Creation',
      description: 'Create engaging social media content with viral potential',
      basePrompt: 'Engaging social media content with {mood} mood, {style} style, {platform} optimized, {trending} trending elements',
      variables: [
        { name: 'mood', type: 'mood', description: 'Content mood', defaultValue: 'energetic', options: ['energetic', 'calm', 'mysterious', 'funny'], required: true },
        { name: 'style', type: 'style', description: 'Visual style', defaultValue: 'modern', options: ['modern', 'vintage', 'minimalist', 'bold'], required: true },
        { name: 'platform', type: 'text', description: 'Social platform', defaultValue: 'Instagram', options: ['Instagram', 'TikTok', 'Facebook', 'Twitter'], required: true },
        { name: 'trending', type: 'text', description: 'Trending elements', defaultValue: 'gradient backgrounds', options: ['gradient backgrounds', '3D elements', 'neon effects', 'glassmorphism'], required: false }
      ],
      examples: [],
      tags: ['marketing', 'social media', 'viral', 'trending'],
      difficulty: 'beginner',
      estimatedTime: '1-2 minutes',
      cost: 0.002
    });

    // Design Templates
    this.addIndustryTemplate({
      id: 'design-brand-identity',
      industry: 'design',
      name: 'Brand Identity Development',
      description: 'Create cohesive brand identity elements with consistent visual language',
      basePrompt: 'Brand identity design with {brandStyle} style, {colorPalette} colors, {mood} mood, {industry} industry focus',
      variables: [
        { name: 'brandStyle', type: 'style', description: 'Brand style', defaultValue: 'modern', options: ['modern', 'classic', 'playful', 'luxury'], required: true },
        { name: 'colorPalette', type: 'color', description: 'Color palette', defaultValue: 'professional blues', options: ['professional blues', 'warm earth tones', 'bold primary colors', 'pastel soft'], required: true },
        { name: 'mood', type: 'mood', description: 'Brand mood', defaultValue: 'trustworthy', options: ['trustworthy', 'innovative', 'friendly', 'premium'], required: true },
        { name: 'industry', type: 'text', description: 'Industry focus', defaultValue: 'technology', options: ['technology', 'healthcare', 'finance', 'education'], required: true }
      ],
      examples: [],
      tags: ['design', 'branding', 'identity', 'professional'],
      difficulty: 'advanced',
      estimatedTime: '5-7 minutes',
      cost: 0.005
    });
  }

  /**
   * Add industry template to the service
   */
  private addIndustryTemplate(template: IndustryTemplate): void {
    this.industryTemplates.set(template.id, template);
  }

  /**
   * Get intelligent prompt suggestions based on context
   */
  async getSmartSuggestions(
    context: {
      imageContent?: string;
      userIndustry?: string;
      preferredStyle?: string;
      qualityLevel?: string;
      userId?: string;
    }
  ): Promise<PromptSuggestion[]> {
    const suggestions: PromptSuggestion[] = [];

    // Industry-specific suggestions
    if (context.userIndustry) {
      const industryTemplates = Array.from(this.industryTemplates.values())
        .filter(template => template.industry === context.userIndustry)
        .slice(0, 3);
      
      suggestions.push(...industryTemplates.map(template => ({
        id: `template-${template.id}`,
        prompt: template.basePrompt,
        confidence: 0.9,
        category: 'industry-template',
        industry: template.industry,
        tags: template.tags,
        estimatedQuality: 0.85,
        usageCount: 0
      })));
    }

    // Style-based suggestions
    if (context.preferredStyle) {
      suggestions.push({
        id: 'style-suggestion',
        prompt: `Apply ${context.preferredStyle} style with professional quality and consistent lighting`,
        confidence: 0.8,
        category: 'style-based',
        tags: [context.preferredStyle, 'professional', 'consistent'],
        estimatedQuality: 0.8,
        usageCount: 0
      });
    }

    // Quality-based suggestions
    if (context.qualityLevel) {
      suggestions.push({
        id: 'quality-suggestion',
        prompt: `Generate ${context.qualityLevel} quality image with enhanced details and professional finish`,
        confidence: 0.85,
        category: 'quality-based',
        tags: [context.qualityLevel, 'enhanced', 'professional'],
        estimatedQuality: 0.9,
        usageCount: 0
      });
    }

    // User behavior-based suggestions
    if (context.userId) {
      const userBehavior = this.userBehaviors.get(context.userId);
      if (userBehavior) {
        const popularPrompts = userBehavior.promptHistory
          .slice(-5)
          .map(prompt => ({
            id: `user-${Date.now()}`,
            prompt: `Similar to: ${prompt}`,
            confidence: 0.7,
            category: 'user-behavior',
            tags: ['personalized', 'user-preference'],
            estimatedQuality: 0.75,
            usageCount: 1
          }));
        suggestions.push(...popularPrompts);
      }
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Get industry templates by industry
   */
  getIndustryTemplates(industry: string): IndustryTemplate[] {
    return Array.from(this.industryTemplates.values())
      .filter(template => template.industry === industry);
  }

  /**
   * Get all available industries
   */
  getAvailableIndustries(): string[] {
    const industries = new Set<string>();
    this.industryTemplates.forEach(template => {
      industries.add(template.industry);
    });
    return Array.from(industries);
  }

  /**
   * Track user behavior for learning
   */
  trackUserBehavior(userId: string, behavior: Partial<UserBehavior>): void {
    const existing = this.userBehaviors.get(userId) || {
      userId,
      promptHistory: [],
      preferredStyles: [],
      industryFocus: [],
      qualityPreferences: [],
      lastUsed: new Date()
    };

    this.userBehaviors.set(userId, {
      ...existing,
      ...behavior,
      lastUsed: new Date()
    });
  }

  /**
   * Get personalized recommendations for user
   */
  getPersonalizedRecommendations(userId: string): PromptSuggestion[] {
    const userBehavior = this.userBehaviors.get(userId);
    if (!userBehavior) return [];

    const recommendations: PromptSuggestion[] = [];

    // Style preferences
    userBehavior.preferredStyles.forEach(style => {
      recommendations.push({
        id: `personal-${style}`,
        prompt: `Create image in ${style} style with your preferred aesthetic`,
        confidence: 0.9,
        category: 'personalized',
        tags: [style, 'personalized', 'preferred'],
        estimatedQuality: 0.85,
        usageCount: 0
      });
    });

    // Industry focus
    userBehavior.industryFocus.forEach(industry => {
      const industryTemplates = this.getIndustryTemplates(industry);
      if (industryTemplates.length > 0) {
        const template = industryTemplates[0];
        recommendations.push({
          id: `industry-${industry}`,
          prompt: template.basePrompt,
          confidence: 0.85,
          category: 'industry-personalized',
          industry: industry,
          tags: [...template.tags, 'personalized'],
          estimatedQuality: 0.8,
          usageCount: 0
        });
      }
    });

    return recommendations;
  }
}
