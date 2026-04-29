import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { damping: 20, stiffness: 200 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { damping: 20, stiffness: 200 });

  useEffect(() => {
    const m = window.matchMedia("(hover: none), (pointer: coarse)");
    setEnabled(!m.matches);
  }, []);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
