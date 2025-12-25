## Packages
framer-motion | Essential for smooth micro-interactions and page transitions in Soft UI
date-fns | For formatting dates elegantly (e.g., "Today", "Oct 24")
clsx | For conditional class names
tailwind-merge | For merging tailwind classes safely

## Notes
Tailwind Config - extend boxShadow:
  neumorphic: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)",
  "neumorphic-sm": "5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255, 0.5)",
  "neumorphic-inset": "inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)",
  "neumorphic-inset-sm": "inset 3px 3px 6px 0 rgba(163,177,198, 0.7), inset -3px -3px 6px 0 rgba(255,255,255, 0.8)"

Tailwind Config - extend colors:
  soft: {
    base: "#e0e5ec",
    text: "#4a5568",
    muted: "#a0aec0",
    highlight: "#ffffff",
    shadow: "#a3b1c6",
    primary: "#667eea", // Soft Indigo
    success: "#48bb78", // Soft Green
    warning: "#ed8936", // Soft Orange
    danger: "#f56565"   // Soft Red
  }
