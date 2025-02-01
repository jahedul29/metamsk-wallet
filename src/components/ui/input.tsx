import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startContent, endContent, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {startContent && (
          <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
            {startContent}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border border-input bg-white px-3 text-sm transition-colors',
            'placeholder:text-gray-500',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            startContent && 'pl-9',
            endContent && 'pr-9',
            className
          )}
          ref={ref}
          {...props}
        />
        {endContent && (
          <div className="absolute right-3 flex items-center">
            {endContent}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
