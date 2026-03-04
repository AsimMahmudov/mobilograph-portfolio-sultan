'use client';
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 2,
  className = "" 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  
  const rounded = useTransform(count, (latest: number) => 
    prefix + Math.round(latest).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
};