import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface NeumorphicButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  active?: boolean;
}

export const NeumorphicButton = React.forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  ({ className, children, variant = 'primary', active, ...props }, ref) => {
    
    const baseStyles = "relative outline-none transition-all duration-300 ease-out font-bold flex items-center justify-center";
    
    const variants = {
      primary: `
        px-6 py-3 rounded-full text-[#667eea] 
        shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-inset
        disabled:opacity-50 disabled:cursor-not-allowed
      `,
      secondary: `
        px-4 py-2 rounded-xl text-gray-500 text-sm font-semibold
        shadow-neumorphic hover:text-gray-700 active:shadow-neumorphic-inset
      `,
      danger: `
        px-6 py-3 rounded-full text-red-500
        shadow-neumorphic hover:text-red-600 active:shadow-neumorphic-inset
      `,
      icon: `
        p-3 rounded-full text-gray-500
        shadow-neumorphic hover:text-[#667eea] active:shadow-neumorphic-inset
      `
    };

    const activeState = active ? "shadow-neumorphic-inset text-[#667eea]" : "";

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={twMerge(baseStyles, variants[variant], activeState, className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";
