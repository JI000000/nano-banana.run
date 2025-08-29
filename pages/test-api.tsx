import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FiZap, FiCheck, FiX, FiDollarSign } from 'react-icons/fi';

export default function TestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testAPI = async () => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'A beautiful sunset over mountains, digital art style',
          model: 'free'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'API调用失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="API 测试 - Nano Banana AI"
      description="测试 OpenRouter API 集成"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              OpenRouter API 测试
            </h1>
            <p className="text-lg text-gray-600">
              测试 Nano Banana AI 与 OpenRouter 的集成
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                API 状态检查
              </h2>
              <button
                onClick={testAPI}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiZap className="w-5 h-5 mr-2" />
                {isLoading ? '测试中...' : '开始测试'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <FiX className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 font-medium">错误: {error}</span>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-700 font-medium">API 调用成功!</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">响应详情</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">模型:</span>
                        <span className="font-mono">{result.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">处理时间:</span>
                        <span>{result.processingTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">成本:</span>
                        <span className="flex items-center">
                          <FiDollarSign className="w-4 h-4 mr-1" />
                          {result.cost ? result.cost.toFixed(4) : '0.0000'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {result.imageUrl && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">生成结果</h3>
                      <img
                        src={result.imageUrl}
                        alt="Generated image"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">成本分析</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• 当前使用 Free 版本: 完全免费</p>
                    <p>• Standard 版本成本: 约 $0.002/张图片</p>
                    <p>• 建议定价: $9.99/月 (100次) 利润率 99.8%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              成本对比表
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">版本</th>
                    <th className="text-left py-3 px-4 font-semibold">价格</th>
                    <th className="text-left py-3 px-4 font-semibold">单张成本</th>
                    <th className="text-left py-3 px-4 font-semibold">适用场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Free</td>
                    <td className="py-3 px-4 text-green-600 font-medium">$0</td>
                    <td className="py-3 px-4">$0</td>
                    <td className="py-3 px-4">开发测试</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Standard</td>
                    <td className="py-3 px-4">按量计费</td>
                    <td className="py-3 px-4">~$0.002</td>
                    <td className="py-3 px-4">生产环境</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
