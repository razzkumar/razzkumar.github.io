import { motion } from "motion/react";
import { Pipeline } from "./lifecycle/Pipeline";
import { VaultViz } from "./lifecycle/Vault";
import { KarpenterViz } from "./lifecycle/Karpenter";
import { FailoverViz } from "./lifecycle/Failover";

export function Lifecycle() {
  return (
    <section id="lifecycle" className="py-20 md:py-32 px-4 md:px-6 relative" style={{ background: "#0E0B09" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-12"
        >
          <p className="font-mono tracking-[0.3em] uppercase text-[11px] mb-4" style={{ color: "#D94B1F" }}>
            05 — case study
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
            From{" "}
            <span style={{ color: "#D94B1F" }}>git push</span>{" "}
            to{" "}
            <span style={{ color: "#8A8073", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
              ten clusters
            </span>{" "}
            in seconds.
          </h2>
          <p className="mt-5 max-w-2xl text-[16px]" style={{ color: "#C8BFAE" }}>
            A live walkthrough of the platform I lead — GitOps continuous delivery wired through
            ArgoCD Image Updater, with HashiCorp Vault, Karpenter autoscaling, and DNS-level failover
            keeping it reliable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Pipeline />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            <VaultViz />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <KarpenterViz />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <FailoverViz />
          </motion.div>
        </div>

        {/* How it works guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-12 rounded-3xl border p-5 md:p-8"
          style={{ background: "#161210", borderColor: "#3A332E" }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: "#D94B1F" }}>
            ▸ how it works
          </p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-[14px]" style={{ color: "#C8BFAE" }}>
            {[
              ["01", "Developer commits", "git push triggers GitHub Actions on the application repo."],
              ["02", "CI builds image", "Multi-stage Dockerfile produces an immutable image tagged with the commit SHA."],
              ["03", "Push to ECR", "OIDC-auth login to AWS, image pushed to a region-replicated ECR repo."],
              ["04", "Image Updater scans", "ArgoCD Image Updater watches ECR and detects the new tag matching semver/regex policy."],
              ["05", "GitOps bump", "Updater commits a values.yaml change to the gitops repo — single source of truth."],
              ["06", "ArgoCD syncs", "App-of-apps detects drift, runs sync waves with PreSync hooks (db migrations, smoke checks)."],
              ["07", "Fleet rollout", "Progressive delivery across 10 clusters — canary → 25% → 100%, with automatic rollback on SLO burn."],
              ["08", "Observability loop", "Prometheus + Loki feed Grafana SLO dashboards; PagerDuty fires only on error-budget burn."],
            ].map(([n, t, d]) => (
              <div key={n} className="flex gap-4">
                <span className="font-mono text-[11px]" style={{ color: "#D94B1F" }}>{n}</span>
                <div>
                  <p style={{ color: "#F2EBDD", fontWeight: 600 }}>{t}</p>
                  <p style={{ color: "#8A8073" }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
