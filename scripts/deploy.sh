#!/bin/bash
# 部署脚本

echo "准备部署Nano-Banana.Run到生产环境..."

# 安装依赖
echo "安装生产依赖..."
npm ci

# 构建
echo "构建生产版本..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "构建成功，准备部署..."
    
    # 这里可以添加部署到Vercel、AWS、或其他服务器的命令
    # 例如:
    # vercel --prod
    
    echo "已成功完成构建过程。"
    echo "要部署到Vercel，请运行: vercel --prod"
    echo "要部署到其他平台，请参考相应的部署指南。"
else
    echo "构建失败，请检查错误并修复后再尝试。"
    exit 1
fi
