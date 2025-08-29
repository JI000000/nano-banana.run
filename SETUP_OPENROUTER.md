# OpenRouter 集成设置指南

## 🚀 快速开始

### 1. 获取 OpenRouter API Key

1. 访问 [OpenRouter](https://openrouter.ai/)
2. 注册账号并登录
3. 进入 [API Keys 页面](https://openrouter.ai/keys)
4. 创建新的 API Key
5. 复制 API Key

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# 选择模型版本: 'free' 或 'standard'
OPENROUTER_MODEL=free

# AI Service Configuration
AI_SERVICE_TYPE=openrouter
```

### 3. 充值（如果需要 Standard 版本）

- **Free 版本**: 无需充值，适合测试
- **Standard 版本**: 需要充值，按使用量计费
  - 输入 tokens: $0.30/M
  - 输出 tokens: $2.50/M
  - 输入图片: $1.238/K
  - 输出图片: $0.03/K

## 🔧 模型版本对比

### Free 版本 (`:free`)
- **价格**: $0/M input tokens, $0/M output tokens
- **特点**: 完全免费，适合测试和开发
- **限制**: 可能有使用量限制或功能限制
- **用途**: 预览期、测试、小规模使用

### Standard 版本 (无`:free`)
- **价格**: 
  - $0.30/M input tokens
  - $2.50/M output tokens  
  - $1.238/K input images
  - $0.03/K output images
- **特点**: 完整功能，按量计费
- **用途**: 生产环境、商业使用

## 📊 成本估算

### Free 版本
- 完全免费，无成本

### Standard 版本
- 每次图像生成约 $0.01-0.05
- 1000次生成约 $10-50
- 建议定价：
  - 免费用户：每日5次
  - 基础版：$9.99/月，100次
  - 专业版：$29.99/月，500次

## 🎯 使用步骤

### 1. 开发测试阶段
```bash
# 使用 Free 版本
OPENROUTER_MODEL=free
```

### 2. 生产环境
```bash
# 切换到 Standard 版本
OPENROUTER_MODEL=standard
```

### 3. 在代码中切换
```typescript
// 在 ImageProcessor 组件中
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt,
    imageBase64,
    model: 'free' // 或 'standard'
  })
});
```

## 🔍 监控和日志

### 1. 查看使用统计
- 登录 OpenRouter 控制台
- 查看 API 使用量和成本

### 2. 本地日志
- 检查控制台输出
- 查看 `/api/generate` 的日志

### 3. 错误处理
- API Key 无效
- 网络连接问题
- 模型响应错误

## 🛠️ 故障排除

### 常见问题

1. **API Key 无效**
   ```
   Error: Invalid OpenRouter API key
   ```
   解决：检查 API Key 是否正确，是否已激活

2. **模型不可用**
   ```
   Error: Model not available
   ```
   解决：检查模型名称是否正确，是否在可用区域

3. **配额超限**
   ```
   Error: Rate limit exceeded
   ```
   解决：升级到 Standard 版本或等待配额重置

### 调试模式

在 `.env.local` 中添加：
```bash
DEBUG=true
NODE_ENV=development
```

## 📈 性能优化

### 1. 缓存策略
- 缓存生成的图片
- 避免重复请求

### 2. 批量处理
- 支持批量图片处理
- 减少 API 调用次数

### 3. 错误重试
- 自动重试失败请求
- 指数退避策略

## 🔒 安全考虑

### 1. API Key 安全
- 不要在客户端暴露 API Key
- 使用环境变量存储
- 定期轮换 API Key

### 2. 请求验证
- 验证用户权限
- 限制请求频率
- 监控异常使用

### 3. 数据保护
- 不存储敏感图片
- 及时清理临时文件
- 遵守隐私政策

## 🎉 成功部署

### 检查清单
- [ ] API Key 已配置
- [ ] 环境变量已设置
- [ ] 模型版本已选择
- [ ] 测试生成成功
- [ ] 错误处理已实现
- [ ] 监控已配置
- [ ] 安全措施已实施

### 下一步
1. 集成用户认证系统
2. 实现积分/订阅系统
3. 添加批量处理功能
4. 优化用户体验
5. 部署到生产环境
