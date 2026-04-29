import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";
import { Magnetic } from "./Magnetic";

const lines = [
  { p: "$", c: "whoami", color: "#D94B1F" },
  { p: ">", c: "razzkumar — Lead SWE / DevOps / SRE", color: "#F2EBDD" },
  { p: "$", c: "kubectl get clusters --all-regions", color: "#D94B1F" },
  { p: ">", c: "✓ 100+ apps · multi-region · 99.99% uptime", color: "#7A9B6E" },
  { p: "$", c: "cat focus.txt", color: "#D94B1F" },
  { p: ">", c: "DevOps · SRE · AI · Full-Stack", color: "#D9A441" },
];

function Typing({ text, delay }: { text: string; delay: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 22);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return <span>{out}</span>;
}

// reveal each word with spring stagger
function WordReveal({ text, delay = 0, className = "", style = {} as React.CSSProperties }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            style={{ display: "inline-block", paddingRight: "0.3em" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.06, type: "spring", damping: 22, stiffness: 200 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // parallax based on cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { damping: 25, stiffness: 80 });
  const py = useSpring(my, { damping: 25, stiffness: 80 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 30);
        my.set((e.clientY / window.innerHeight - 0.5) * 30);
      }}
      className="relative min-h-screen overflow-hidden flex items-center px-4 md:px-6 pt-24 pb-16"
      style={{ backgroundColor: "#0E0B09" }}
    >
      {/* paper grain */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* warm ambient lights — mobile blur radii reduced (R6 mitigation, pre-approved per Principle 1.b) */}
      <motion.div
        style={{ x: px, y: py }}
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[60px] md:blur-[140px]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "rgba(217,75,31,0.22)" }} />
      </motion.div>
      <motion.div
        style={{ x: useTransform(px, (v) => -v), y: useTransform(py, (v) => -v) }}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[70px] md:blur-[160px]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "rgba(217,164,65,0.14)" }} />
      </motion.div>
      <div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[60px] md:blur-[140px]"
        style={{ background: "rgba(122,155,110,0.12)" }}
      />

      {/* type-block grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#F2EBDD 1px, transparent 1px), linear-gradient(90deg, #F2EBDD 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[12px] mb-8 font-mono"
            style={{ borderColor: "rgba(122,155,110,0.4)", background: "rgba(122,155,110,0.08)", color: "#7A9B6E" }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#7A9B6E" }}
            />
            available · principal / staff
          </motion.div>

          <h1 style={{ fontSize: "clamp(56px, 9vw, 132px)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 0.92, color: "#F2EBDD" }}>
            <WordReveal text="razzkumar." delay={0.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-6 max-w-xl text-[18px] leading-relaxed"
            style={{ color: "#C8BFAE" }}
          >
            Lead Software Engineer building resilient, multi-region Kubernetes platforms and shipping{" "}
            <span style={{ color: "#F2EBDD" }}>100+ production apps</span>. I work across DevOps, SRE,
            AI infrastructure, and full-stack delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="https://github.com/razzkumar"
                target="_blank"
                className="px-6 py-3 rounded-full inline-flex items-center gap-2 transition-shadow hover:shadow-[0_10px_40px_-10px_rgba(217,75,31,0.6)] font-medium"
                style={{ background: "#D94B1F", color: "#0E0B09" }}
                data-hover
              >
                <Github size={16} /> GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/drazzkumar/"
                target="_blank"
                className="px-6 py-3 rounded-full border inline-flex items-center gap-2 transition-colors"
                style={{ borderColor: "#3A332E", color: "#F2EBDD" }}
                data-hover
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border inline-flex items-center gap-2 transition-colors"
                style={{ borderColor: "#3A332E", color: "#F2EBDD" }}
                data-hover
              >
                <Mail size={16} /> Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] md:text-[13px] font-mono"
            style={{ color: "#8A8073" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> Kathmandu, Nepal
            </span>
            <span style={{ color: "#3A332E" }}>·</span>
            <span>10+ yrs</span>
            <span style={{ color: "#3A332E" }}>·</span>
            <span>open source</span>
          </motion.div>

          {/* Now line + case study badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[11.5px]"
              style={{ borderColor: "#3A332E", background: "#161210", color: "#C8BFAE" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#D9A441" }}
              />
              <span style={{ color: "#8A8073" }}>now:</span>
              tuning Karpenter spot strategy on prod
            </span>
            <a
              href="#lifecycle"
              data-hover
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("lifecycle");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[11.5px] transition-colors"
              style={{ borderColor: "#D94B1F", background: "rgba(217,75,31,0.08)", color: "#D94B1F" }}
            >
              ▸ featured case study
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <ArrowDown size={11} />
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1000 }}
          className="relative"
        >
          <div
            className="rounded-2xl overflow-hidden border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            style={{ background: "rgba(22,18,16,0.85)", borderColor: "#3A332E", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "#3A332E", background: "rgba(36,30,27,0.6)" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#D94B1F" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#D9A441" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#7A9B6E" }} />
              <span className="ml-3 text-[12px] font-mono" style={{ color: "#8A8073" }}>razz@k8s — zsh</span>
            </div>
            <div className="p-5 font-mono text-[13px] space-y-2 min-h-[280px]">
              {lines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.4, type: "spring", damping: 22, stiffness: 200 }}
                  className="flex gap-2"
                  style={{ color: l.color }}
                >
                  <span>{l.p}</span>
                  <span>
                    <Typing text={l.c} delay={700 + i * 400} />
                  </span>
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 align-middle ml-1"
                style={{ background: "#D94B1F" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.3em]"
        style={{ color: "#8A8073" }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          ↓ SCROLL
        </motion.div>
      </motion.div>
    </section>
  );
}
