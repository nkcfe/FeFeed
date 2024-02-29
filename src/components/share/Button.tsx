import { cn } from '@/utils/style';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

const ButtonVariants = cva('', {
  variants: {
    variant: {
      blue: 'rounded-lg bg-blue-100 text-black shadow-md transition hover:bg-blue-300',
      white:
        'rounded-lg p-2 text-black transition hover:bg-gray-100 hover:text-blue-800 dark:text-white dark:hover:bg-transparent dark:hover:text-blue-400',
      gray: 'bg-gray-100 bg-opacity-70 text-black backdrop-blur-md transition hover:bg-gray-100',
      slate: ' text-white transition  hover:text-blue-300',
      purple: 'bg-purple-400 text-white hover:bg-purple-500',
    },
    shape: {
      primary: 'rounded-lg',
      secondary: 'rounded-3xl',
      full: 'rounded-full',
    },
    size: {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-1.5 text-sm',
      large: 'px-6 py-3 text-lg',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      bold: 'font-bold',
    },
    defaultVariants: {
      variant: 'blue',
      shape: 'primary',
      size: 'small',
      weight: 'normal',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  disabled?: boolean;
  custom?: string;
  label?: string;
}

const Button = (props: ButtonProps) => {
  const { variant, shape, size, weight, children, disabled, custom, label } =
    props;
  return (
    <button
      className={cn(
        ButtonVariants({ variant, shape, size, weight, disabled }),
        custom,
      )} // 수정
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
