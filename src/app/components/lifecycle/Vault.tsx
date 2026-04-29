import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Lock, KeyRound, RefreshCw, Box } from "lucide-react";

const rotations = [
  { key: "DB_PASSWORD",    val: "pg_a91f2c4…" },
  { key: "JWT_SECRET",     val: "hs256_b27e…" },
  { key: "STRIPE_KEY",     val: "sk_live_4f…" },
  { key: "OPENAI_API_KEY", val: "sk-proj-c8…" },
];

type Phase = "idle" | "rotate" | "detect" | "restart" | "ready";
type PodStatus = "running" | "pending" | "terminating";
type Pod = { id: number; version: number; status: PodStatus };

const initialPods = (v: number): Pod[] => [
  { id: 1, version: v, status: "running" },
  { id: 2, version: v, status: "running" },
  { id: 3, version: v, status: "running" },
];

export function VaultViz() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [pods, setPods] = useState<Pod[]>(initialPods(1));
  const [version, setVersion] = useState(1);
  const [statusText, setStatusText] = useState("steady state · watching kv/prod");
  const [statusColor, setStatusColor] = useState("#8A8073");

  useEffect(() => {
    const cycle = async () => {
      // ROTATE
      setPhase("rotate");
      setStatusText("▸ vault: rotating " + rotations[idx].key);
      setStatusColor("#D9A441");
      await sleep(1100);

      // DETECT
      setPhase("detect");
      setStatusText("▸ reloader: env changed → triggering rolling update");
      setStatusColor("#D9A441");
      await sleep(1200);

      // RESTART (rolling)
      setPhase("restart");
      const newVersion = version + 1;
      setVersion(newVersion);
      let nextId = 100 + idx * 10;

      for (let i = 0; i < 3; i++) {
        // spawn new pod (pending)
        const spawnId = ++nextId;
        setPods((p) => [...p, { id: spawnId, version: newVersion, status: "pending" }]);
        setStatusText(`▸ creating api-${spawnId} (v${newVersion}) · waiting for readiness`);
        setStatusColor("#D9A441");
        await sleep(550);

        // mark new ready
        setPods((p) => p.map((x) => (x.id === spawnId ? { ...x, status: "running" } : x)));
        setStatusText(`▸ api-${spawnId} ready · terminating old pod`);
        setStatusColor("#7A9B6E");
        await sleep(280);

        // mark old terminating
        const oldPod = pods[i] ? pods[i] : null;
        setPods((p) => {
          const oldRunning = p.find((x) => x.version < newVersion && x.status === "running");
          if (!oldRunning) return p;
          return p.map((x) => (x.id === oldRunning.id ? { ...x, status: "terminating" } : x));
        });
        setStatusColor("#D94B1F");
        await sleep(420);

        // remove terminated
        setPods((p) => p.filter((x) => x.status !== "terminating"));
        await sleep(150);
      }

      // READY
      setPhase("ready");
      setStatusText("▸ rollout complete · 3/3 pods · v" + newVersion);
      setStatusColor("#7A9B6E");
      await sleep(1100);

      // IDLE
      setPhase("idle");
      setStatusText("▸ steady state · watching kv/prod");
      setStatusColor("#8A8073");
      await sleep(900);

      // next secret
      setIdx((i) => (i + 1) % rotations.length);
    };
    let cancelled = false;
    (async () => {
      if (!cancelled) await cycle();
    })();
    return () => {
      cancelled = true;
    };
  }, [idx]);

  const sec = rotations[idx];

  return (
    <div
      className="rounded-3xl border p-5 md:p-6 relative overflow-hidden h-full"
      style={{ background: "#161210", borderColor: "#3A332E" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Lock size={14} style={{ color: "#D9A441" }} />
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "#8A8073" }}>
          hashicorp vault
        </span>
      </div>
      <h4 style={{ color: "#F2EBDD", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>
        Auto-restart on env change.
      </h4>
      <p className="text-[13px] mt-1" style={{ color: "#8A8073" }}>
        Vault rotates → Reloader detects → Rolling update: new pods spin up, old pods drain.
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {["vault-agent", "stakater/reloader", "rolling-update"].map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full border font-mono text-[10px]"
            style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#D9A441" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Vault → Deployment */}
      <div className="grid grid-cols-[120px_1fr] gap-3 mt-6">
        {/* Vault */}
        <motion.div
          animate={{
            borderColor: phase === "rotate" ? "#D94B1F" : "#D9A441",
            boxShadow: phase === "rotate" ? "0 0 24px rgba(217,75,31,0.35)" : "none",
          }}
          className="rounded-xl border p-3"
          style={{ background: "#241E1B" }}
        >
          <div className="flex items-center justify-between">
            <KeyRound size={14} style={{ color: "#D9A441" }} />
            {phase === "rotate" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={11} style={{ color: "#D94B1F" }} />
              </motion.div>
            )}
          </div>
          <p className="mt-2 font-mono text-[10.5px]" style={{ color: "#F2EBDD" }}>
            kv/prod
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={sec.key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] truncate"
              style={{ color: "#D9A441" }}
            >
              {sec.key}
            </motion.p>
          </AnimatePresence>
          <p className="font-mono text-[10px]" style={{ color: "#8A8073" }}>
            ttl 15m
          </p>
        </motion.div>

        {/* Deployment */}
        <div
          className="rounded-xl border p-3 relative"
          style={{ background: "#0E0B09", borderColor: "#3A332E" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px]" style={{ color: "#8A8073" }}>
              deploy/api · v{version}
            </span>
            <span className="font-mono text-[10px]" style={{ color: "#8A8073" }}>
              {pods.filter((p) => p.status === "running").length}/3 ready
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[64px]">
            <AnimatePresence mode="popLayout">
              {pods.map((p) => (
                <PodChip key={p.id} pod={p} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status line */}
      <div
        className="mt-4 rounded-lg border px-3 py-2 font-mono text-[11px] min-h-[34px]"
        style={{ background: "#0E0B09", borderColor: "#3A332E" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={statusText}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            style={{ color: statusColor }}
          >
            {statusText}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PodChip({ pod }: { pod: Pod }) {
  const color =
    pod.status === "running"     ? "#7A9B6E" :
    pod.status === "pending"     ? "#D9A441" :
                                   "#D94B1F";
  const label =
    pod.status === "running"     ? "Running" :
    pod.status === "pending"     ? "Pending" :
                                   "Terminating";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -12 }}
      transition={{ type: "spring", damping: 22, stiffness: 240 }}
      className="rounded-lg border p-1.5 w-[78px]"
      style={{ background: "#241E1B", borderColor: color }}
    >
      <div className="flex items-center justify-between">
        <Box size={10} style={{ color }} />
        <motion.div
          animate={{
            scale: pod.status === "running" ? [1, 1.3, 1] : 1,
            opacity: pod.status === "pending" ? [0.4, 1, 0.4] : 1,
          }}
          transition={{
            duration: pod.status === "pending" ? 0.9 : 1.6,
            repeat: pod.status !== "running" || pod.version > 1 ? Infinity : 0,
          }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
        />
      </div>
      <p className="font-mono text-[9px] mt-0.5 truncate" style={{ color: "#F2EBDD" }}>
        api-{pod.id}
      </p>
      <p className="font-mono text-[9px]" style={{ color }}>
        v{pod.version} · {label}
      </p>
    </motion.div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
