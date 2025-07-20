import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'xs' | 'sm' | 'lg';
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className = '',
  size = 'lg',
  disabled = false
}: ButtonProps) => {
  const sizeStyles = {
    xs: 'w-[104px] h-[48px] font-md-medium px-[18px] py-[12px] whitespace-nowrap',
    sm: 'w-[114px] h-[48px] font-md-medium px-[18px] py-[12px]',
    lg: 'w-[392px] h-[56px] font-xl-semibold'
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-[12px] transition-all  ${sizeStyles[size]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
