import React, { useEffect, useState } from 'react';
import { FiActivity, FiClock, FiDownload, FiCpu } from 'react-icons/fi';
import Card from '../ui/Card';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
}

interface PerformanceMonitorProps {
  showDetails?: boolean;
  className?: string;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showDetails = false,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    bundleSize: 0,
    memoryUsage: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 测量页面加载时间
    const measureLoadTime = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        
        setMetrics(prev => ({
          ...prev,
          loadTime: Math.round(loadTime)
        }));
      }
    };

    // 测量渲染时间
    const measureRenderTime = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const paintEntries = window.performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        if (fcp) {
          setMetrics(prev => ({
            ...prev,
            renderTime: Math.round(fcp.startTime)
          }));
        }
      }
    };

    // 测量内存使用
    const measureMemoryUsage = () => {
      if (typeof window !== 'undefined' && (window as any).performance?.memory) {
        const memory = (window as any).performance.memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024) // MB
        }));
      }
    };

    // 延迟测量以确保页面完全加载
    const timer = setTimeout(() => {
      measureLoadTime();
      measureRenderTime();
      measureMemoryUsage();
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !showDetails) {
    return null;
  }

  return (
    <Card className={`fixed bottom-4 right-4 z-50 max-w-xs ${className}`}>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <FiActivity className="w-5 h-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiClock className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-gray-600">Load Time</span>
            </div>
            <span className="font-medium text-gray-900">{metrics.loadTime}ms</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiCpu className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-gray-600">Render Time</span>
            </div>
            <span className="font-medium text-gray-900">{metrics.renderTime}ms</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiDownload className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-gray-600">Memory</span>
            </div>
            <span className="font-medium text-gray-900">{metrics.memoryUsage}MB</span>
          </div>
        </div>
        
        {/* 性能评级 */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Performance Score</span>
            <span className={`text-xs font-medium ${
              metrics.loadTime < 1000 ? 'text-green-600' :
              metrics.loadTime < 2000 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {metrics.loadTime < 1000 ? 'Excellent' :
               metrics.loadTime < 2000 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceMonitor;
