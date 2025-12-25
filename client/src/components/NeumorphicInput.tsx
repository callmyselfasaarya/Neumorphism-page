import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export const NeumorphicInput = React.forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={twMerge("relative", wrapperClassName)}>
        <input
          ref={ref}
          className={twMerge(
            "w-full bg-[#e0e5ec] text-gray-600 placeholder-gray-400",
            "rounded-full px-6 py-4 outline-none transition-all duration-300",
            "shadow-neumorphic-inset focus:shadow-neumorphic-inset-sm",
            "border-none ring-0",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

NeumorphicInput.displayName = "NeumorphicInput";
