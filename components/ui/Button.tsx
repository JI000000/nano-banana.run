import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactElement<IconType>;
  iconPosition?: 'left' | 'right';
  href?: string;
  external?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  href,
  external = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  // 基础样式类
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // 变体样式
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 focus:ring-primary-500 shadow-md hover:shadow-lg',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg',
  };
  
  // 尺寸样式
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };
  
  // 宽度样式
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // 图标样式
  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };
  
  // 组合所有样式
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;
  
  // 渲染图标
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconElement = React.cloneElement(icon, {
      className: `${iconClasses[size]} ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`,
    } as any);
    
    return iconElement;
  };
  
  // 渲染加载状态
  const renderLoading = () => (
    <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconClasses[size]} ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`} />
  );
  
  // 渲染内容
  const renderContent = () => (
    <>
      {loading && renderLoading()}
      {!loading && icon && iconPosition === 'left' && renderIcon()}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && renderIcon()}
    </>
  );
  
  // 如果是链接
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          onClick={onClick}
        >
          {renderContent()}
        </a>
      );
    }
    
    return (
      <Link href={href} className={buttonClasses} onClick={onClick}>
        {renderContent()}
      </Link>
    );
  }
  
  // 普通按钮
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {renderContent()}
    </button>
  );
};

export default Button;