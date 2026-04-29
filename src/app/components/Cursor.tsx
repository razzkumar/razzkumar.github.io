import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });
  const ringX = useSpring(x, { damping: 22, stiffness: 140, mass: 0.6 });
  const ringY = useSpring(y, { damping: 22, stiffness: 140, mass: 0.6 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      >
        <motion.div
          animate={{ scale: hover ? 0.4 : 1 }}
          transition={{ type: "spring", damping: 18, stiffness: 280 }}
          className="w-2 h-2 rounded-full"
          style={{ background: "#F2EBDD" }}
        />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <motion.div
          animate={{ scale: hover ? 2.8 : 1, opacity: hover ? 0.6 : 0.35 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="w-8 h-8 rounded-full border"
          style={{ borderColor: "#D94B1F" }}
        />
      </motion.div>
    </>
  );
}
