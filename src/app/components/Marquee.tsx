import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

const phrases = [
  "Kubernetes", "DevOps", "SRE", "AI Infra", "Full-Stack", "AWS", "Terraform",
  "GitOps", "Observability", "Multi-Region", "Reliability",
];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // scroll-velocity scrub
  const baseX = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const x = useSpring(baseX, { damping: 30, stiffness: 80 });

  return (
    <section
      ref={ref}
      className="border-y py-10 overflow-hidden"
      style={{ background: "#0E0B09", borderColor: "#3A332E" }}
    >
      <motion.div
        style={{ x }}
        className="flex gap-12 whitespace-nowrap"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-12"
        >
          {[...phrases, ...phrases, ...phrases].map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 transition-colors"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "rgba(242,235,221,0.18)",
                fontStyle: i % 3 === 1 ? "italic" : "normal",
                fontFamily: i % 3 === 1 ? "Georgia, serif" : "inherit",
              }}
            >
              {p}
              <span style={{ color: "rgba(217,75,31,0.5)" }}>✦</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
