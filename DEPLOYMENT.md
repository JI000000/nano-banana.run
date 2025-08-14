# Nano-Banana.Run 部署指南

本文档提供将Nano-Banana.Run网站部署到生产环境的步骤和最佳实践。

## 部署前检查清单

在部署前，请确保完成以下任务：

1. **替换占位图片**：
   - 使用实际的高质量图像替换public/images目录下的所有占位图像
   - 创建网站favicon（32x32 .ico文件）

2. **配置分析工具**：
   - 在`_app.tsx`中将Google Analytics ID（`G-XXXXXXXXXX`）替换为您的实际ID

3. **环境变量配置**：
   - 创建`.env.local`文件配置环境变量（如有需要）
   - 确保生产环境也设置了相同的环境变量

4. **执行构建测试**：
   ```bash
   npm run build
   ```
   确保没有错误或警告

## 部署到Vercel（推荐）

Nano-Banana.Run网站设计为在Vercel平台上运行。以下是部署步骤：

1. **安装Vercel CLI**：
   ```bash
   npm install -g vercel
   ```

2. **登录Vercel**：
   ```bash
   vercel login
   ```

3. **部署项目**：
   ```bash
   vercel
   ```
   根据提示配置项目

4. **部署到生产环境**：
   ```bash
   vercel --prod
   ```

## 部署到其他平台

### 静态导出（任何静态托管平台）

1. **修改`next.config.js`添加静态导出配置**：
   ```js
   module.exports = {
     // 其他配置...
     output: 'export',
   }
   ```

2. **生成静态文件**：
   ```bash
   npm run build
   ```
   静态文件将生成在`out`目录

3. **部署静态文件**：
   将`out`目录中的文件上传到您选择的静态托管平台（如Netlify、GitHub Pages等）

### 自托管服务器

1. **安装Node.js**：
   确保服务器上安装了Node.js 14.x或更高版本

2. **构建项目**：
   ```bash
   npm run build
   ```

3. **启动服务**：
   ```bash
   npm run start
   ```

4. **使用PM2守护进程**（推荐）：
   ```bash
   npm install -g pm2
   pm2 start npm --name "nano-banana" -- start
   ```

## 域名和DNS配置

1. **购买域名**：
   如果尚未拥有`nano-banana.run`域名，请从域名注册商处购买

2. **配置DNS记录**：
   - 如果使用Vercel，在域名注册商控制面板中添加Vercel DNS记录
   - 通常需要添加A记录或CNAME记录，具体取决于您的托管平台

3. **SSL证书**：
   - Vercel自动处理SSL证书
   - 对于其他平台，考虑使用Let's Encrypt获取免费的SSL证书

## 监控和维护

1. **设置监控**：
   - 配置Uptime监控（如UptimeRobot或Pingdom）
   - 启用错误跟踪工具（如Sentry）

2. **定期维护**：
   - 每月更新依赖包（`npm update`）
   - 监控性能指标（如通过Lighthouse）
   - 定期检查SEO性能

## 故障排除

如果您在部署过程中遇到问题，请参阅以下常见问题解决方案：

1. **构建失败**：
   - 检查依赖版本兼容性
   - 确保所有引用的图像和资源都存在

2. **样式问题**：
   - 确保TailwindCSS正确配置
   - 检查是否缺少PostCSS插件

3. **环境变量问题**：
   - 确认所有必要的环境变量都已设置
   - 检查环境变量名称拼写是否正确

