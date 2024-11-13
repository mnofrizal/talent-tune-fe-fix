"use client";
import { motion } from "framer-motion";

export function CircularProgress({ value = 0, size = 120, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = value / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-primary"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold">{Math.round(value)}</span>
          <span className="text-xl font-bold text-muted-foreground">/100</span>
        </div>
        <span className="text-xs text-muted-foreground">Complete</span>
      </div>
    </div>
  );
}