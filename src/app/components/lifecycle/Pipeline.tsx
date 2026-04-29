import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  GitCommit, Github, Box, Cloud, RefreshCw, GitBranch, Rocket, Server,
} from "lucide-react";

type PodS = "old" | "terminating" | "pending" | "new";

function ClusterCard({ name, region, trigger, delay }: { name: string; region: string; trigger: number; delay: number }) {
  const [pods, setPods] = useState<PodS[]>(["old", "old", "old"]);
  const [version, setVersion] = useState(1);
  const [phase, setPhase] = useState<"idle" | "rolling" | "ready">("idle");

  useEffect(() => {
    if (trigger === 0) {
      setPods(["old", "old", "old"]);
      setPhase("idle");
      return;
    }
    let cancelled = false;
    const run = async () => {
      await sleep(delay);
      if (cancelled) return;
      setPhase("rolling");
      for (let i = 0; i < 3; i++) {
        if (cancelled) return;
        // start: spin up new (pending) + drain old (terminating)
        setPods((p) => {
          const n = [...p];
          n[i] = "terminating";
          return n;
        });
        await sleep(280);
        if (cancelled) return;
        setPods((p) => {
          const n = [...p];
          n[i] = "pending";
          return n;
        });
        await sleep(320);
        if (cancelled) return;
        setPods((p) => {
          const n = [...p];
          n[i] = "new";
          return n;
        });
        await sleep(220);
      }
      if (cancelled) return;
      setVersion((v) => v + 1);
      setPhase("ready");
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [trigger, delay]);

  const ready = pods.filter((p) => p === "new" || p === "old").length;
  const ok = phase !== "idle" && pods.every((p) => p === "new" || p === "old");
  const cardColor = ok ? "#7A9B6E" : phase === "rolling" ? "#D9A441" : "#3A332E";

  return (
    <motion.div
      animate={{
        borderColor: cardColor,
        backgroundColor: ok ? "rgba(122,155,110,0.08)" : phase === "rolling" ? "rgba(217,164,65,0.06)" : "#0E0B09",
      }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border p-2.5"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[11.5px]" style={{ color: "#F2EBDD" }}>
            {name}
          </div>
          <div className="font-mono text-[9.5px]" style={{ color: "#8A8073" }}>
            {region}
          </div>
        </div>
        <span className="font-mono text-[9px]" style={{ color: phase === "rolling" ? "#D9A441" : ok ? "#7A9B6E" : "#8A8073" }}>
          v{version}
        </span>
      </div>
      <div className="flex gap-1 mt-2">
        {pods.map((s, i) => (
          <PodCell key={i} status={s} />
        ))}
      </div>
      <div className="mt-1.5 h-0.5 rounded-full overflow-hidden" style={{ background: "#241E1B" }}>
        <motion.div
          animate={{ width: `${(ready / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
          className="h-full"
          style={{ background: ok ? "#7A9B6E" : "#D9A441" }}
        />
      </div>
    </motion.div>
  );
}

function PodCell({ status }: { status: PodS }) {
  const color =
    status === "new"         ? "#7A9B6E" :
    status === "old"         ? "#5B6E7A" :
    status === "pending"     ? "#D9A441" :
                               "#D94B1F";
  const pulse = status === "pending" || status === "terminating";
  return (
    <motion.div
      layout
      animate={{
        backgroundColor: color,
        opacity: status === "terminating" ? [1, 0.3, 1] : pulse ? [0.5, 1, 0.5] : 1,
        scale: status === "new" ? [1, 1.25, 1] : 1,
      }}
      transition={{
        duration: pulse ? 0.6 : 0.35,
        repeat: pulse ? Infinity : 0,
      }}
      className="flex-1 h-3 rounded-sm"
    />
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const stages = [
  { id: 0, label: "commit", title: "git push origin main",   icon: GitCommit, color: "#F2EBDD" },
  { id: 1, label: "actions", title: "GitHub Actions",         icon: Github,    color: "#F2EBDD" },
  { id: 2, label: "build",  title: "docker build",            icon: Box,       color: "#5B6E7A" },
  { id: 3, label: "ecr",    title: "push → AWS ECR",          icon: Cloud,     color: "#D9A441" },
  { id: 4, label: "updater",title: "ArgoCD Image Updater",    icon: RefreshCw, color: "#D9A441" },
  { id: 5, label: "gitops", title: "GitOps repo bump",        icon: GitBranch, color: "#7A9B6E" },
  { id: 6, label: "argocd", title: "ArgoCD sync",             icon: Rocket,    color: "#D94B1F" },
  { id: 7, label: "fleet",  title: "10 clusters deployed",    icon: Server,    color: "#D94B1F" },
];

const logsByStage: Record<number, string[]> = {
  0: ["▸ feat(api): add /v2/inference endpoint", "▸ author: razzkumar  · sha: a91f2c4"],
  1: ["▸ workflow: ci.yaml triggered", "▸ runner: ubuntu-22.04 · 4 cores"],
  2: ["▸ docker build -t app:a91f2c4 .", "▸ layers: 12  · cache: 9 hits"],
  3: ["▸ aws ecr get-login-password | docker login", "▸ push 614733333333.dkr.ecr/app:a91f2c4"],
  4: ["▸ image-updater detected new tag", "▸ writing values.yaml :: image.tag=a91f2c4"],
  5: ["▸ committing to gitops-repo/main", "▸ signed-off-by: argocd-bot"],
  6: ["▸ argocd app sync platform-prod", "▸ wave 1/3 → wave 2/3 → wave 3/3"],
  7: ["▸ rollout: 10/10 clusters healthy ✓", "▸ p99 latency: 142ms · err 0.01%"],
};

const clusters = [
  { name: "us-east-1",   region: "Virginia"   },
  { name: "us-west-2",   region: "Oregon"     },
  { name: "eu-west-1",   region: "Ireland"    },
  { name: "eu-central-1",region: "Frankfurt"  },
  { name: "ap-south-1",  region: "Mumbai"     },
  { name: "ap-southeast",region: "Singapore"  },
  { name: "ap-northeast",region: "Tokyo"      },
  { name: "sa-east-1",   region: "São Paulo"  },
  { name: "af-south-1",  region: "Cape Town"  },
  { name: "me-south-1",  region: "Bahrain"    },
];

export function Pipeline() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rolloutKey, setRolloutKey] = useState(0);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 2800);
    return () => clearInterval(id);
  }, [paused, reduce]);

  useEffect(() => {
    if (stage === 7) setRolloutKey((k) => k + 1);
    else if (stage === 0) setRolloutKey(0);
  }, [stage]);

  return (
    <div
      className="rounded-3xl border p-4 md:p-8"
      style={{ background: "#161210", borderColor: "#3A332E" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage strip */}
      <div className="relative">
        <div className="absolute top-5 md:top-7 left-5 right-5 h-px" style={{ background: "#3A332E" }} />
        <motion.div
          className="absolute top-5 md:top-7 left-5 h-px"
          animate={{ width: `calc(${(stage / (stages.length - 1)) * 100}% - 0px)` }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "#D94B1F", boxShadow: "0 0 12px rgba(217,75,31,0.6)" }}
        />

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 relative">
          {stages.map((s, i) => {
            const active = i === stage;
            const passed = i < stage;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setStage(i)}
                className="group flex flex-col items-center gap-2 relative"
                data-hover
              >
                <motion.div
                  animate={{
                    scale: active ? 1.1 : 1,
                    backgroundColor: active ? "#D94B1F" : passed ? "#241E1B" : "#161210",
                    borderColor: active ? "#D94B1F" : passed ? "#D94B1F" : "#3A332E",
                  }}
                  transition={{ type: "spring", damping: 18, stiffness: 220 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border flex items-center justify-center relative"
                >
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      style={{ border: "1px solid #D94B1F" }}
                    />
                  )}
                  <Icon
                    size={18}
                    style={{ color: active ? "#F2EBDD" : passed ? "#D94B1F" : "#8A8073" }}
                  />
                </motion.div>
                <span
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: active ? "#F2EBDD" : "#8A8073" }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title + log */}
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 mt-8">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: "#8A8073" }}>
            stage {String(stage + 1).padStart(2, "0")} / 08
          </p>
          <AnimatePresence mode="wait">
            <motion.h3
              key={stage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: "#F2EBDD",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              {stages[stage].title}
            </motion.h3>
          </AnimatePresence>
          <div className="mt-4 flex items-center gap-3">
            <span
              className="px-2 py-0.5 rounded-full border text-[11px] font-mono"
              style={{
                borderColor: "rgba(122,155,110,0.4)",
                background: "rgba(122,155,110,0.08)",
                color: "#7A9B6E",
              }}
            >
              ● live
            </span>
            <span className="text-[11px] font-mono" style={{ color: "#8A8073" }}>
              hover to pause
            </span>
          </div>
        </div>

        {/* Logs */}
        <div
          className="rounded-2xl border p-4 font-mono text-[12.5px] min-h-[120px]"
          style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#C8BFAE" }}
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: "#3A332E" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#D94B1F" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "#D9A441" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "#7A9B6E" }} />
            <span className="ml-2 text-[11px]" style={{ color: "#8A8073" }}>
              tail -f /var/log/{stages[stage].label}.log
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              {logsByStage[stage].map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.15 }}
                >
                  <span style={{ color: "#D94B1F" }}>{l.split(" ")[0]} </span>
                  {l.replace(/^▸\s/, "")}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="inline-block w-2 h-3 align-middle"
                style={{ background: "#D94B1F" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Cluster fleet */}
      <div className="mt-8">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: "#8A8073" }}>
          ▸ fleet · 10 production clusters
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {clusters.map((c, i) => (
            <ClusterCard
              key={c.name}
              name={c.name}
              region={c.region}
              trigger={rolloutKey}
              delay={i * 140}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
