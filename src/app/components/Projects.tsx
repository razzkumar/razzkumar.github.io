import { motion } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import { Tilt } from "./Tilt";

const projects = [
  {
    title: "Multi-Region K8s Platform",
    desc: "GitOps-driven multi-cluster Kubernetes deployment with geo-aware traffic routing serving 3M+ users.",
    tags: ["Kubernetes", "ArgoCD", "Istio", "Terraform"],
    accent: "#D94B1F",
  },
  {
    title: "AI Inference Mesh",
    desc: "Auto-scaling LLM inference platform with GPU scheduling, RAG pipelines, and end-to-end observability.",
    tags: ["Triton", "vLLM", "Prometheus", "RAG"],
    accent: "#D9A441",
  },
  {
    title: "HL7 Pipeline (Signetic)",
    desc: "Vaccine record submission to Immunization Information Systems with real-time HL7 ↔ JSON conversion.",
    tags: ["Node.js", "HL7", "TypeScript"],
    accent: "#7A9B6E",
  },
  {
    title: "Real-time GPS Tracker",
    desc: "TCP-socket backend ingesting GPS telemetry with live D3.js visualization for fleet monitoring.",
    tags: ["TCP", "D3.js", "React"],
    accent: "#5B6E7A",
  },
  {
    title: "Internal Developer Platform",
    desc: "Self-service IDP with Backstage-style catalog, environment provisioning, and one-click deploy templates.",
    tags: ["Backstage", "Crossplane", "GitOps"],
    accent: "#D94B1F",
  },
  {
    title: "SRE Observability Stack",
    desc: "Unified Prom + Loki + Tempo stack with SLO automation, alert tiering, and on-call routing.",
    tags: ["Prometheus", "Loki", "OpenTelemetry"],
    accent: "#D9A441",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-6 relative" style={{ background: "#0E0B09" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-20"
        >
          <p className="font-mono tracking-[0.3em] uppercase text-[11px] mb-4" style={{ color: "#D94B1F" }}>
            04 — selected work
          </p>
          <h2
            className="max-w-3xl"
            style={{
              color: "#F2EBDD",
              fontSize: "clamp(36px, 5vw, 76px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
            }}
          >
            Things I’ve built.{" "}
            <span style={{ color: "#8A8073", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
              Things that ship.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.07, type: "spring", damping: 22, stiffness: 140 }}
            >
              <Tilt className="rounded-3xl group">
                <a
                  href="https://github.com/razzkumar"
                  target="_blank"
                  className="relative block overflow-hidden rounded-3xl border p-6 cursor-pointer min-h-[260px] flex flex-col"
                  style={{ background: "#161210", borderColor: "#3A332E" }}
                  data-hover
                >
                  <motion.div
                    className="absolute -top-px -left-px h-px"
                    style={{ background: p.accent }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.07 + 0.4 }}
                  />
                  <div className="flex items-start justify-between relative">
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ background: "#241E1B", borderColor: "#3A332E" }}
                    >
                      <Github size={16} style={{ color: p.accent }} />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 0 }}
                      style={{ rotate: -45 }}
                      className="transition-transform"
                    >
                      <ArrowUpRight size={18} style={{ color: "#8A8073" }} />
                    </motion.div>
                  </div>
                  <h3
                    className="mt-6 relative"
                    style={{ color: "#F2EBDD", fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] flex-1 relative" style={{ color: "#C8BFAE" }}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-5 relative">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full border text-[11.5px] font-mono"
                        style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#8A8073" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
