import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface NeumorphicCardProps extends HTMLMotionProps<"div"> {
  inset?: boolean;
}

export const NeumorphicCard = React.forwardRef<HTMLDivElement, NeumorphicCardProps>(
  ({ className, children, inset, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={twMerge(
          "bg-[#e0e5ec] rounded-[2rem]",
          inset ? "shadow-neumorphic-inset p-4" : "shadow-neumorphic p-6",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

NeumorphicCard.displayName = "NeumorphicCard";
