import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string>("about");
  const [clicked, setClicked] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const scrollTo = (id: string) => {
    setClicked(id);
    setTimeout(() => setClicked(null), 600);
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-auto max-w-[680px]"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(28,23,21,0.88)" : "rgba(28,23,21,0.55)",
            boxShadow: scrolled
              ? "0 14px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(242,235,221,0.06)"
              : "0 8px 24px -10px rgba(0,0,0,0.4)",
          }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
          className="backdrop-blur-2xl border rounded-full pl-2 pr-2 py-1.5 flex items-center justify-between md:justify-start gap-1"
          style={{ borderColor: "#3A332E" }}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 14, stiffness: 240 }}
            className="px-3 md:px-4 tracking-tight font-mono text-[13px] cursor-pointer"
            style={{ color: "#D94B1F" }}
            onClick={() => scrollTo("about")}
          >
            ~/razz
          </motion.span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="w-px h-5" style={{ background: "#3A332E" }} />
            {items.map((it) => {
              const isActive = active === it.id;
              const isClicked = clicked === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  onMouseEnter={() => setHovered(it.id)}
                  data-hover
                  className="relative px-4 py-1.5 rounded-full text-[13px] transition-colors"
                  style={{ color: isActive ? "#F2EBDD" : "#C8BFAE" }}
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full"
                    style={{
                      background: "#D94B1F",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 200ms ease",
                    }}
                  />
                  <AnimatePresence>
                    {isClicked && (
                      <motion.span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "rgba(217,75,31,0.4)" }}
                        initial={{ scale: 0.4, opacity: 0.7 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.span
                    animate={{ y: isClicked ? [0, -2, 1, 0] : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative inline-block"
                  >
                    {it.label}
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(242,235,221,0.06)", color: "#F2EBDD" }}
            aria-label="menu"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 backdrop-blur-xl"
            style={{ background: "rgba(14,11,9,0.92)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
              className="pt-24 px-6 flex flex-col gap-1"
            >
              {items.map((it, i) => (
                <motion.button
                  key={it.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, type: "spring", damping: 22 }}
                  onClick={() => scrollTo(it.id)}
                  className="text-left py-4 border-b flex items-center justify-between"
                  style={{
                    borderColor: "#3A332E",
                    color: active === it.id ? "#D94B1F" : "#F2EBDD",
                  }}
                >
                  <span style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    {it.label}
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: "#8A8073" }}>
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
