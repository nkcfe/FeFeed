import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input className={cn('outline-none', className)} ref={ref} {...rest} />
    );
  },
);

export default Input;

Input.displayName = 'Input';
