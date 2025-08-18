/**
 * WebVitalsMonitor.ts
 * 
 * Core Web Vitals监控工具
 * 用于测量、监控和报告关键的Web性能指标
 */

// Web Vitals 指标模块 - 如果API变化，请更新以匹配最新版本
import * as webVitals from 'web-vitals';

// Web Vitals指标接口
interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

// 性能阈值（按Google标准）
const thresholds = {
  LCP: {
    good: 2500, // 2.5秒
    poor: 4000, // 4秒
  },
  FID: {
    good: 100, // 100毫秒
    poor: 300, // 300毫秒
  },
  CLS: {
    good: 0.1,
    poor: 0.25,
  },
  FCP: {
    good: 1800, // 1.8秒
    poor: 3000, // 3秒
  },
  TTFB: {
    good: 800, // 800毫秒
    poor: 1800, // 1.8秒
  },
};

/**
 * 确定指标的评级
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const metricThresholds = thresholds[name as keyof typeof thresholds];
  
  if (!metricThresholds) {
    return 'good'; // 默认评级，如果没有特定阈值
  }
  
  if (value <= metricThresholds.good) {
    return 'good';
  }
  
  if (value <= metricThresholds.poor) {
    return 'needs-improvement';
  }
  
  return 'poor';
}

/**
 * 将Web Vitals指标发送到分析服务
 */
function sendToAnalytics(metric: WebVitalsMetric) {
  // 在实际应用中，这里会将指标发送到分析服务
  // 例如Google Analytics、自定义API端点等
  console.log(`[Web Vitals] ${metric.name}: ${metric.value}, Rating: ${metric.rating}`);
  
  // 如果有分析服务API，可以发送请求
  /*
  fetch('/api/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  });
  */
}

/**
 * 测量页面的Core Web Vitals指标
 * @param reportAllMetrics 是否报告所有指标（包括非Core Web Vitals）
 */
export function measureWebVitals(reportAllMetrics: boolean = false) {
  try {
    // 使用统一的处理函数，适应API变化
    const handleMetric = (metric: any, name: string) => {
      const metricData: WebVitalsMetric = {
        id: metric.id || '',
        name: name,
        value: metric.value,
        rating: getRating(name, metric.value),
        delta: metric.delta || 0,
      };
      sendToAnalytics(metricData);
    };

    // 使用现有API
    if (typeof webVitals.onCLS === 'function') {
      webVitals.onCLS((metric: any) => handleMetric(metric, 'CLS'), { reportAllChanges: true });
    }
    
    if (typeof webVitals.onINP === 'function') {
      webVitals.onINP((metric: any) => handleMetric(metric, 'INP'));
    }
    
    if (typeof webVitals.onLCP === 'function') {
      webVitals.onLCP((metric: any) => handleMetric(metric, 'LCP'), { reportAllChanges: true });
    }

    // 额外指标
    if (reportAllMetrics) {
      if (typeof webVitals.onFCP === 'function') {
        webVitals.onFCP((metric: any) => handleMetric(metric, 'FCP'));
      }
      
      if (typeof webVitals.onTTFB === 'function') {
        webVitals.onTTFB((metric: any) => handleMetric(metric, 'TTFB'));
      }
    }
  } catch (error) {
    console.error('Failed to measure web vitals:', error);
  }
}

/**
 * 分析Web Vitals数据，返回改进建议
 */
export function analyzeWebVitals(metrics: WebVitalsMetric[]): string[] {
  const suggestions: string[] = [];
  
  // 分析LCP指标
  const lcpMetric = metrics.find(m => m.name === 'LCP');
  if (lcpMetric && lcpMetric.rating !== 'good') {
    suggestions.push(
      '优化最大内容绘制(LCP): 考虑使用图像懒加载、减小资源大小、启用浏览器缓存、使用CDN'
    );
  }
  
  // 分析FID指标
  const fidMetric = metrics.find(m => m.name === 'FID');
  if (fidMetric && fidMetric.rating !== 'good') {
    suggestions.push(
      '优化首次输入延迟(FID): 减少长任务执行时间、优化JavaScript执行、移除不必要的第三方脚本'
    );
  }
  
  // 分析CLS指标
  const clsMetric = metrics.find(m => m.name === 'CLS');
  if (clsMetric && clsMetric.rating !== 'good') {
    suggestions.push(
      '优化累积布局偏移(CLS): 为图像指定尺寸、避免动态插入内容、确保字体不会导致布局偏移'
    );
  }
  
  return suggestions;
}

export default { measureWebVitals, analyzeWebVitals };
