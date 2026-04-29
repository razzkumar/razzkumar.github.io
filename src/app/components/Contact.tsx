import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

const links = [
  { icon: Github, label: "github.com/razzkumar", href: "https://github.com/razzkumar" },
  { icon: Linkedin, label: "linkedin.com/in/drazzkumar", href: "https://www.linkedin.com/in/drazzkumar/" },
  { icon: Mail, label: "Email me", href: "mailto:hello@razzkumar.com" },
];

function StaggeredHeading({ text }: { text: string }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.025, type: "spring", damping: 20, stiffness: 180 }}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-40 px-4 md:px-6 overflow-hidden" style={{ background: "#0E0B09" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: "rgba(217,75,31,0.12)" }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <p
          className="font-mono tracking-[0.3em] uppercase text-[11px] mb-6"
          style={{ color: "#D94B1F" }}
        >
          05 — let’s build
        </p>

        <h2
          className="overflow-hidden"
          style={{
            color: "#F2EBDD",
            fontSize: "clamp(48px, 9vw, 144px)",
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
          }}
        >
          <StaggeredHeading text="Got something" />
          <br />
          <span style={{ color: "#D94B1F", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
            <StaggeredHeading text="ambitious?" />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 max-w-xl mx-auto text-[18px]"
          style={{ color: "#C8BFAE" }}
        >
          I’m always up for a chat about platforms, reliability, AI infrastructure, and the messy
          space in between.
        </motion.p>

        <div className="mt-14 flex flex-col items-center gap-3">
          {links.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
              className="w-full max-w-md"
            >
              <Magnetic strength={0.2}>
                <a
                  href={l.href}
                  target="_blank"
                  data-hover
                  className="group flex items-center justify-between px-6 py-4 rounded-2xl border transition-colors"
                  style={{ background: "#161210", borderColor: "#3A332E", color: "#F2EBDD" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D94B1F")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#3A332E")}
                >
                  <span className="flex items-center gap-3">
                    <l.icon size={18} />
                    {l.label}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="group-hover:rotate-45 transition-transform"
                    style={{ color: "#D94B1F" }}
                  />
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
