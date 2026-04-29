import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  {
    title: "Adaptive Audio",
    copy: "Listen with stunning clarity. Personalized sound that knows what you need.",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600",
    tone: "from-zinc-900 to-black",
  },
  {
    title: "Titanium Watch",
    copy: "Aerospace-grade titanium. Crafted lighter, stronger, more refined.",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600",
    tone: "from-stone-800 to-stone-950",
  },
  {
    title: "Phone, Reimagined",
    copy: "A camera system that captures the impossible. Built around the chip that changes everything.",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600",
    tone: "from-neutral-900 to-black",
  },
];

function Panel({ p, i, progress, total }: { p: typeof products[0]; i: number; progress: MotionValue<number>; total: number }) {
  const start = i / total;
  const end = (i + 1) / total;
  const opacity = useTransform(progress, [start - 0.05, start, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1, 1.15]);
  const textY = useTransform(progress, [start, end], [40, -40]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center">
      <div className={`absolute inset-0 bg-gradient-to-b ${p.tone}`} />
      <motion.div style={{ scale }} className="absolute inset-0">
        <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover opacity-50" />
      </motion.div>
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-white/50 tracking-[0.3em] uppercase mb-4 text-[12px]">Chapter 0{i + 1}</p>
        <h2
          className="text-white"
          style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          {p.title}
        </h2>
        <p className="mt-6 text-white/70" style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}>
          {p.copy}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function PinnedShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative" style={{ height: `${products.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {products.map((p, i) => (
          <Panel key={p.title} p={p} i={i} progress={scrollYProgress} total={products.length} />
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {products.map((_, i) => {
            const start = i / products.length;
            const end = (i + 1) / products.length;
            const w = useTransform(scrollYProgress, [start, end], [8, 32]);
            const o = useTransform(scrollYProgress, [start - 0.05, start, end - 0.1, end], [0.3, 1, 1, 0.3]);
            return (
              <motion.div
                key={i}
                style={{ width: w, opacity: o }}
                className="h-1 rounded-full bg-white"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
