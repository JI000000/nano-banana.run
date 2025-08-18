import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

interface WebVitalsDisplayProps {
  showDetails?: boolean;
  className?: string;
}

const metricDisplayNames = {
  LCP: 'Largest Contentful Paint',
  FID: 'First Input Delay',
  CLS: 'Cumulative Layout Shift',
  FCP: 'First Contentful Paint',
  TTFB: 'Time to First Byte',
};

const WebVitalsDisplay: React.FC<WebVitalsDisplayProps> = ({ 
  showDetails = false,
  className = '' 
}) => {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 检查是否为管理员
    const checkAdmin = () => {
      // 实际场景中，应该检查用户权限或查询参数
      const isAdminQuery = new URLSearchParams(window.location.search).get('admin');
      return isAdminQuery === 'true';
    };

    // 仅管理员可见
    if (typeof window !== 'undefined') {
      setIsAdmin(checkAdmin());
    }
  }, []);

  useEffect(() => {
    // 只有启用了详情显示或是管理员才收集指标
    if (showDetails || isAdmin) {
      // 模拟从Web Vitals监控工具收集的数据
      // 实际场景中，这些数据应从WebVitalsMonitor或分析服务获取
      const mockMetrics: WebVitalsMetric[] = [
        { id: '1', name: 'LCP', value: 2200, rating: 'good', delta: 0 },
        { id: '2', name: 'FID', value: 85, rating: 'good', delta: 0 },
        { id: '3', name: 'CLS', value: 0.08, rating: 'good', delta: 0 },
        { id: '4', name: 'FCP', value: 1600, rating: 'good', delta: 0 },
        { id: '5', name: 'TTFB', value: 750, rating: 'good', delta: 0 },
      ];
      
      setMetrics(mockMetrics);
      
      // 注册监听器以获取实际指标
      // 实际情况下，这里应该订阅WebVitalsMonitor提供的事件
      const handleWebVitals = (metric: WebVitalsMetric) => {
        setMetrics(current => {
          const existingIndex = current.findIndex(m => m.name === metric.name);
          
          if (existingIndex >= 0) {
            const updated = [...current];
            updated[existingIndex] = metric;
            return updated;
          }
          
          return [...current, metric];
        });
      };
      
      // 清理函数
      return () => {
        // 实际情况下，这里应取消订阅
      };
    }
  }, [showDetails, isAdmin]);
  
  // 如果没有启用详情显示且不是管理员，不显示组件
  if (!showDetails && !isAdmin) {
    return null;
  }
  
  // 根据评级获取颜色和图标
  const getRatingDisplay = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return { 
          color: 'text-green-500', 
          bgColor: 'bg-green-100', 
          icon: <FiCheckCircle className="h-4 w-4" /> 
        };
      case 'needs-improvement':
        return { 
          color: 'text-yellow-500', 
          bgColor: 'bg-yellow-100', 
          icon: <FiInfo className="h-4 w-4" /> 
        };
      case 'poor':
        return { 
          color: 'text-red-500', 
          bgColor: 'bg-red-100', 
          icon: <FiAlertCircle className="h-4 w-4" /> 
        };
      default:
        return { 
          color: 'text-gray-500', 
          bgColor: 'bg-gray-100', 
          icon: <FiInfo className="h-4 w-4" /> 
        };
    }
  };
  
  // 格式化指标值
  const formatMetricValue = (name: string, value: number): string => {
    if (name === 'CLS') {
      return value.toFixed(2);
    }
    return `${Math.round(value)}ms`;
  };

  return (
    <div className={`${className} p-4 rounded-lg bg-white shadow-sm border border-gray-200`}>
      <h3 className="text-lg font-medium text-gray-900 mb-3">Core Web Vitals</h3>
      
      <div className="space-y-2">
        {metrics.map((metric) => {
          const { color, bgColor, icon } = getRatingDisplay(metric.rating);
          
          return (
            <div 
              key={metric.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center">
                <span className={`${color} mr-2`}>{icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {metricDisplayNames[metric.name as keyof typeof metricDisplayNames] || metric.name}
                </span>
              </div>
              
              <div className={`text-sm ${color} px-2 py-1 rounded-full ${bgColor}`}>
                {formatMetricValue(metric.name, metric.value)}
              </div>
            </div>
          );
        })}
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Optimization Tips</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-start">
              <span className="text-green-500 mr-1">•</span>
              Images are lazy-loaded and optimized
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-1">•</span>
              CSS and JS are minified and split
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-1">•</span>
              Server-side rendering for initial content
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WebVitalsDisplay;
