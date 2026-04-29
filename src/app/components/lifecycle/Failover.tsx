import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Globe, Zap } from "lucide-react";

export function FailoverViz() {
  const reduce = useReducedMotion();
  const [primary, setPrimary] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPrimary((p) => !p), 4200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="rounded-3xl border p-5 md:p-6 relative overflow-hidden h-full"
      style={{ background: "#161210", borderColor: "#3A332E" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Globe size={14} style={{ color: "#7A9B6E" }} />
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "#8A8073" }}>
          dns failover · route 53
        </span>
      </div>
      <h4 style={{ color: "#F2EBDD", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>
        Geo-aware traffic. Zero downtime.
      </h4>
      <p className="text-[13px] mt-1" style={{ color: "#8A8073" }}>
        Health-checked failover to the secondary cluster.
      </p>

      <div className="relative mt-6 h-[140px]">
        {/* DNS */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 px-3 py-2 rounded-xl border font-mono text-[11px] flex items-center gap-1.5"
          style={{ background: "#241E1B", borderColor: "#3A332E", color: "#F2EBDD" }}
        >
          <Zap size={12} style={{ color: "#D94B1F" }} />
          api.razzkumar.com
        </div>

        {/* Primary */}
        <motion.div
          animate={{
            borderColor: primary ? "#7A9B6E" : "#7A2A1B",
            opacity: primary ? 1 : 0.5,
          }}
          className="absolute left-0 bottom-0 w-[44%] rounded-xl border p-3"
          style={{ background: "#241E1B" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px]" style={{ color: "#F2EBDD" }}>
              primary · us-east-1
            </span>
            <motion.div
              animate={{
                scale: primary ? [1, 1.3, 1] : 1,
                background: primary ? "#7A9B6E" : "#7A2A1B",
              }}
              transition={{ duration: 1.4, repeat: primary ? Infinity : 0 }}
              className="w-2 h-2 rounded-full"
            />
          </div>
          <p className="mt-1.5 font-mono text-[10px]" style={{ color: "#8A8073" }}>
            {primary ? "healthy · 142ms" : "● incident · timeout"}
          </p>
        </motion.div>

        {/* Secondary */}
        <motion.div
          animate={{
            borderColor: !primary ? "#7A9B6E" : "#3A332E",
            opacity: !primary ? 1 : 0.7,
          }}
          className="absolute right-0 bottom-0 w-[44%] rounded-xl border p-3"
          style={{ background: "#241E1B" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px]" style={{ color: "#F2EBDD" }}>
              secondary · eu-west-1
            </span>
            <motion.div
              animate={{
                scale: !primary ? [1, 1.3, 1] : 1,
                background: !primary ? "#7A9B6E" : "#3A332E",
              }}
              transition={{ duration: 1.4, repeat: !primary ? Infinity : 0 }}
              className="w-2 h-2 rounded-full"
            />
          </div>
          <p className="mt-1.5 font-mono text-[10px]" style={{ color: "#8A8073" }}>
            {!primary ? "active · 138ms" : "standby · warm"}
          </p>
        </motion.div>

        {/* Traffic line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.line
            x1="50" y1="18"
            animate={{ x2: primary ? 22 : 78, y2: 82 }}
            transition={{ type: "spring", damping: 22, stiffness: 80 }}
            stroke="#D94B1F"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
          />
        </svg>

        {/* Traffic packets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`${primary}-${i}`}
            initial={{ left: "50%", top: "18%", opacity: 0 }}
            animate={{
              left: primary ? "22%" : "78%",
              top: "82%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.6,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ background: "#D94B1F" }}
          />
        ))}
      </div>
    </div>
  );
}
