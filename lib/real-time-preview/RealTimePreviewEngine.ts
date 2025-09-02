/**
 * Real-time Preview Engine - Handles live preview generation and updates
 * Provides 60fps preview updates with intelligent caching and performance optimization
 */

export interface PreviewConfig {
  quality: 'low' | 'medium' | 'high';
  updateFrequency: 'realtime' | 'debounced' | 'manual';
  cacheEnabled: boolean;
  maxCacheSize: number;
  previewResolution: 'thumbnail' | 'preview' | 'full';
}

export interface PreviewUpdate {
  id: string;
  timestamp: number;
  previewData: string; // Base64 encoded preview image
  confidence: number;
  processingTime: number;
  metadata: PreviewMetadata;
}

export interface PreviewMetadata {
  prompt: string;
  style: string;
  quality: string;
  industry?: string;
  userPreferences: string[];
}

export interface PreviewCache {
  key: string;
  preview: PreviewUpdate;
  lastAccessed: number;
  accessCount: number;
  size: number;
}

export class RealTimePreviewEngine {
  private config: PreviewConfig;
  private previewCache: Map<string, PreviewCache> = new Map();
  private updateQueue: PreviewUpdate[] = [];
  private isProcessing: boolean = false;
  private lastUpdateTime: number = 0;
  private updateCallbacks: Set<(update: PreviewUpdate) => void> = new Set();

  constructor(config: Partial<PreviewConfig> = {}) {
    this.config = {
      quality: 'medium',
      updateFrequency: 'debounced',
      cacheEnabled: true,
      maxCacheSize: 50,
      previewResolution: 'preview',
      ...config
    };
  }

  /**
   * Generate preview based on current prompt and image
   */
  async generatePreview(
    prompt: string,
    baseImage?: string,
    metadata?: Partial<PreviewMetadata>
  ): Promise<PreviewUpdate> {
    const startTime = performance.now();
    
    // Check cache first
    const cacheKey = this.generateCacheKey(prompt, baseImage, metadata);
    const cachedPreview = this.getCachedPreview(cacheKey);
    
    if (cachedPreview && this.config.cacheEnabled) {
      this.updateCacheAccess(cacheKey);
      return cachedPreview;
    }

    // Generate new preview
    const previewUpdate: PreviewUpdate = {
      id: this.generatePreviewId(),
      timestamp: Date.now(),
      previewData: await this.generatePreviewImage(prompt, baseImage, metadata),
      confidence: this.calculateConfidence(prompt, metadata),
      processingTime: performance.now() - startTime,
      metadata: {
        prompt,
        style: metadata?.style || 'default',
        quality: metadata?.quality || 'standard',
        industry: metadata?.industry,
        userPreferences: metadata?.userPreferences || [],
        ...metadata
      }
    };

    // Cache the preview
    if (this.config.cacheEnabled) {
      this.cachePreview(cacheKey, previewUpdate);
    }

    // Notify subscribers
    this.notifySubscribers(previewUpdate);

    return previewUpdate;
  }

  /**
   * Generate preview image using AI service
   */
  private async generatePreviewImage(
    prompt: string,
    baseImage?: string,
    metadata?: Partial<PreviewMetadata>
  ): Promise<string> {
    // Mock preview generation - in production, this would call the AI service
    // with reduced quality settings for faster preview generation
    
    const previewQuality = this.getPreviewQuality();
    const previewStyle = metadata?.style || 'default';
    
    // Simulate AI processing time based on quality and complexity
    const processingTime = this.estimateProcessingTime(prompt, previewQuality);
    await this.delay(processingTime);
    
    // Return mock preview data (in production, this would be actual AI-generated preview)
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
  }

  /**
   * Get preview quality based on configuration
   */
  private getPreviewQuality(): string {
    switch (this.config.previewResolution) {
      case 'thumbnail':
        return 'low';
      case 'preview':
        return 'medium';
      case 'full':
        return 'high';
      default:
        return 'medium';
    }
  }

  /**
   * Estimate processing time based on prompt complexity and quality
   */
  private estimateProcessingTime(prompt: string, quality: string): number {
    const baseTime = 100; // Base processing time in ms
    const complexityMultiplier = Math.min(prompt.length / 100, 3); // Max 3x for very long prompts
    const qualityMultiplier = quality === 'low' ? 0.5 : quality === 'medium' ? 1 : 2;
    
    return baseTime * complexityMultiplier * qualityMultiplier;
  }

  /**
   * Calculate confidence score for preview
   */
  private calculateConfidence(prompt: string, metadata?: Partial<PreviewMetadata>): number {
    let confidence = 0.7; // Base confidence
    
    // Increase confidence for well-structured prompts
    if (prompt.length > 20 && prompt.length < 200) {
      confidence += 0.1;
    }
    
    // Increase confidence for specific styles
    if (metadata?.style && metadata.style !== 'default') {
      confidence += 0.1;
    }
    
    // Increase confidence for industry-specific prompts
    if (metadata?.industry) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 0.95); // Cap at 95%
  }

  /**
   * Generate cache key for preview
   */
  private generateCacheKey(
    prompt: string,
    baseImage?: string,
    metadata?: Partial<PreviewMetadata>
  ): string {
    const components = [
      prompt.substring(0, 100), // Limit prompt length for key
      baseImage ? this.hashString(baseImage) : 'no-image',
      metadata?.style || 'default',
      metadata?.quality || 'standard',
      metadata?.industry || 'general'
    ];
    
    return components.join('|');
  }

  /**
   * Simple string hashing for cache keys
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  /**
   * Get cached preview if available
   */
  private getCachedPreview(cacheKey: string): PreviewUpdate | null {
    const cached = this.previewCache.get(cacheKey);
    if (cached) {
      cached.lastAccessed = Date.now();
      cached.accessCount++;
      return cached.preview;
    }
    return null;
  }

  /**
   * Cache preview with size management
   */
  private cachePreview(cacheKey: string, preview: PreviewUpdate): void {
    // Remove old entries if cache is full
    if (this.previewCache.size >= this.config.maxCacheSize) {
      this.cleanupCache();
    }

    const cacheEntry: PreviewCache = {
      key: cacheKey,
      preview,
      lastAccessed: Date.now(),
      accessCount: 1,
      size: this.estimatePreviewSize(preview)
    };

    this.previewCache.set(cacheKey, cacheEntry);
  }

  /**
   * Estimate preview size for cache management
   */
  private estimatePreviewSize(preview: PreviewUpdate): number {
    // Rough estimation based on preview data length
    return preview.previewData.length;
  }

  /**
   * Clean up cache by removing least recently used entries
   */
  private cleanupCache(): void {
    const entries = Array.from(this.previewCache.entries());
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    
    // Remove oldest 20% of entries
    const removeCount = Math.ceil(entries.length * 0.2);
    for (let i = 0; i < removeCount; i++) {
      this.previewCache.delete(entries[i][0]);
    }
  }

  /**
   * Update cache access statistics
   */
  private updateCacheAccess(cacheKey: string): void {
    const cached = this.previewCache.get(cacheKey);
    if (cached) {
      cached.lastAccessed = Date.now();
      cached.accessCount++;
    }
  }

  /**
   * Generate unique preview ID
   */
  private generatePreviewId(): string {
    return `preview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Subscribe to preview updates
   */
  subscribe(callback: (update: PreviewUpdate) => void): () => void {
    this.updateCallbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.updateCallbacks.delete(callback);
    };
  }

  /**
   * Notify all subscribers of preview update
   */
  private notifySubscribers(update: PreviewUpdate): void {
    this.updateCallbacks.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('Error in preview update callback:', error);
      }
    });
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PreviewConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Clear cache if caching is disabled
    if (!this.config.cacheEnabled) {
      this.previewCache.clear();
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): PreviewConfig {
    return { ...this.config };
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    totalAccesses: number;
  } {
    const totalAccesses = Array.from(this.previewCache.values())
      .reduce((sum, entry) => sum + entry.accessCount, 0);
    
    return {
      size: this.previewCache.size,
      maxSize: this.config.maxCacheSize,
      hitRate: this.previewCache.size > 0 ? totalAccesses / this.previewCache.size : 0,
      totalAccesses
    };
  }

  /**
   * Clear all cached previews
   */
  clearCache(): void {
    this.previewCache.clear();
  }

  /**
   * Utility function for delay simulation
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
