import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ParallaxProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-black via-zinc-950 to-black py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [60, -60]) }}>
          <p className="text-white/40 tracking-[0.3em] uppercase mb-4 text-[12px]">The new standard</p>
          <h2
            className="text-white"
            style={{ fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            A timepiece for the next decade.
          </h2>
          <p className="mt-6 text-white/60 max-w-md text-[18px]">
            Crafted from a single block of titanium. Calibrated by hand. Engineered for a lifetime of wear.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Titanium", "Stainless", "Onyx"].map((c) => (
              <button
                key={c}
                className="px-5 py-2 rounded-full border border-white/15 text-white/80 hover:bg-white hover:text-black transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y, rotate, scale }} className="relative aspect-square">
          <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent blur-3xl" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200"
            alt="Watch"
            className="relative w-full h-full object-cover rounded-[3rem] border border-white/10 shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
