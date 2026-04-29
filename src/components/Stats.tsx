import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

type Format = "compact" | "int" | "decimal";

function format(v: number, fmt: Format, decimals: number) {
  if (fmt === "compact") {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1) + "M";
    if (v >= 1_000) return (v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 1) + "K";
    return Math.round(v).toString();
  }
  if (fmt === "decimal") return v.toFixed(decimals);
  return Math.round(v).toLocaleString();
}

function Counter({ to, prefix = "", suffix = "", fmt = "int", decimals = 0 }: { to: number; prefix?: string; suffix?: string; fmt?: Format; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => prefix + format(v, fmt, decimals) + suffix);
  useEffect(() => {
    if (inView) animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
  }, [inView, to]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

const stats: { v: number; s?: string; p?: string; l: string; sub: string; fmt: Format; d?: number }[] = [
  { v: 100, s: "+", l: "Production apps", sub: "deployed & maintained", fmt: "int" },
  { v: 10, s: "+", l: "Years of engineering", sub: "shipping at scale", fmt: "int" },
  { v: 99.99, s: "%", l: "Platform uptime", sub: "multi-region SLO", fmt: "decimal", d: 2 },
];

export function Stats() {
  return (
    <section
      className="border-y py-14 md:py-20 px-4 md:px-6"
      style={{ background: "#0E0B09", borderColor: "#3A332E" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, type: "spring", damping: 24 }}
            className={`px-4 md:px-6 py-5 ${i !== 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
            style={{ borderColor: "#3A332E" }}
          >
            <div
              style={{
                color: "#F2EBDD",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <Counter to={s.v} suffix={s.s} fmt={s.fmt} decimals={s.d ?? 0} />
            </div>
            <p className="mt-3 text-[14px]" style={{ color: "#F2EBDD" }}>
              {s.l}
            </p>
            <p className="mt-1 text-[12px] font-mono" style={{ color: "#8A8073" }}>
              ▸ {s.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
