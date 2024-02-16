import { cn } from '@/utils/style';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

const ButtonVariants = cva('', {
  variants: {
    variant: {
      blue: 'bg-blue-500 text-white shadow-md transition hover:bg-blue-400',
      white:
        'rounded-lg bg-white p-2 text-black transition hover:bg-gray-100 hover:text-blue-800',
      gray: 'bg-gray-200 text-gray-500 transition hover:bg-gray-100',
    },
    shape: {
      primary: 'rounded-lg',
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
}

const Button = (props: ButtonProps) => {
  const { variant, shape, size, weight, children, disabled } = props;
  return (
    <button
      className={cn(ButtonVariants({ variant, shape, size, weight, disabled }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
