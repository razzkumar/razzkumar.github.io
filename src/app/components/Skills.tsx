import { motion } from "motion/react";
import {
  Cloud, Container, GitBranch, Server, Database, Code2, Brain, Activity,
} from "lucide-react";
import { Tilt } from "./Tilt";

const groups = [
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    items: ["AWS", "Azure", "GCP", "Terraform", "Ansible", "Pulumi", "CloudFormation"],
  },
  {
    name: "Kubernetes & Containers",
    icon: Container,
    items: ["Kubernetes", "Helm", "ArgoCD", "Istio", "Docker", "Kustomize", "Crossplane"],
  },
  {
    name: "CI/CD & GitOps",
    icon: GitBranch,
    items: ["GitHub Actions", "CircleCI", "TravisCI", "Azure DevOps", "FluxCD", "Jenkins"],
  },
  {
    name: "SRE & Observability",
    icon: Activity,
    items: ["Prometheus", "Grafana", "Loki", "Datadog", "OpenTelemetry", "PagerDuty", "SLO/SLI"],
  },
  {
    name: "AI / ML Infra",
    icon: Brain,
    items: ["LangChain", "OpenAI", "Vector DBs", "GPU Scheduling", "RAG", "MLflow", "Triton"],
  },
  {
    name: "Backend",
    icon: Server,
    items: ["Node.js", "NestJS", "Go", "Python", "GraphQL", "gRPC", "HL7"],
  },
  {
    name: "Frontend",
    icon: Code2,
    items: ["React", "Next.js", "TypeScript", "D3.js", "Tailwind", "Redux"],
  },
  {
    name: "Data & Storage",
    icon: Database,
    items: ["PostgreSQL", "Redis", "MongoDB", "Kafka", "RabbitMQ", "S3"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden" style={{ background: "#0E0B09" }}>
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mb-12 md:mb-20 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="font-mono tracking-[0.3em] uppercase text-[11px] mb-4" style={{ color: "#D94B1F" }}>
              02 — stack
            </p>
            <h2
              style={{
                color: "#F2EBDD",
                fontSize: "clamp(36px, 5vw, 76px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
              }}
              className="max-w-3xl"
            >
              The toolbox.{" "}
              <span style={{ color: "#8A8073", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
                From bare metal to LLMs.
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.06, type: "spring", damping: 22, stiffness: 140 }}
              className="group"
            >
              <Tilt className="rounded-3xl">
                <div
                  className="rounded-3xl border p-5 md:p-7 transition-colors"
                  style={{ background: "#161210", borderColor: "#3A332E" }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 220 }}
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ background: "#241E1B", borderColor: "#3A332E" }}
                    >
                      <g.icon size={18} style={{ color: "#D94B1F" }} strokeWidth={1.5} />
                    </motion.div>
                    <h3 style={{ color: "#F2EBDD", fontSize: "20px", fontWeight: 600 }}>{g.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((t, j) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 + j * 0.04 }}
                        whileHover={{ y: -3, backgroundColor: "rgba(217,75,31,0.15)", color: "#F2EBDD" }}
                        className="px-3 py-1.5 rounded-full border text-[13px] cursor-default font-mono"
                        style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#C8BFAE" }}
                        data-hover
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
