import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Cpu, TrendingUp } from "lucide-react";

export function KarpenterViz() {
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(0.3);
  const [nodes, setNodes] = useState(3);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setLoad((l) => {
        const next = l + (Math.random() - 0.45) * 0.25;
        return Math.max(0.15, Math.min(0.95, next));
      });
    }, 1200);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    setNodes(load > 0.75 ? 8 : load > 0.55 ? 6 : load > 0.35 ? 4 : 3);
  }, [load]);

  return (
    <div
      className="rounded-3xl border p-5 md:p-6 relative overflow-hidden h-full"
      style={{ background: "#161210", borderColor: "#3A332E" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp size={14} style={{ color: "#D94B1F" }} />
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "#8A8073" }}>
          karpenter · ec2
        </span>
      </div>
      <h4 style={{ color: "#F2EBDD", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>
        Right-sized nodes. In seconds.
      </h4>
      <p className="text-[13px] mt-1" style={{ color: "#8A8073" }}>
        Provision the cheapest, fastest fit per workload.
      </p>

      {/* Load bar */}
      <div className="mt-6">
        <div className="flex justify-between font-mono text-[10px] mb-1.5" style={{ color: "#8A8073" }}>
          <span>cluster load</span>
          <motion.span style={{ color: "#F2EBDD" }}>
            {Math.round(load * 100)}%
          </motion.span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#241E1B" }}>
          <motion.div
            animate={{ width: `${load * 100}%` }}
            transition={{ type: "spring", damping: 22, stiffness: 90 }}
            className="h-full rounded-full"
            style={{
              background: load > 0.75 ? "#D94B1F" : load > 0.5 ? "#D9A441" : "#7A9B6E",
            }}
          />
        </div>
      </div>

      {/* Nodes */}
      <div className="mt-6">
        <p className="font-mono text-[10px] mb-2" style={{ color: "#8A8073" }}>
          ▸ {nodes} active nodes
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => {
            const live = i < nodes;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: live ? 1 : 0.7,
                  opacity: live ? 1 : 0.2,
                  borderColor: live ? "#D94B1F" : "#3A332E",
                }}
                transition={{ type: "spring", damping: 18, stiffness: 200, delay: i * 0.04 }}
                className="w-10 h-10 rounded-lg border flex items-center justify-center"
                style={{ background: live ? "#241E1B" : "#161210" }}
              >
                <Cpu size={14} style={{ color: live ? "#D94B1F" : "#3A332E" }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
