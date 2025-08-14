#!/bin/bash
# 项目初始化脚本

echo "正在初始化Nano-Banana.Run项目..."

# 安装依赖
echo "安装依赖..."
npm install

# 创建必要的目录
echo "创建必要的目录..."
mkdir -p public/images/{examples,tutorials}

echo "初始化完成！现在可以使用以下命令启动开发服务器:"
echo "npm run dev"
