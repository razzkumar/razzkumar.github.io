import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const xp = [
  {
    company: "Webpoint Solutions, LLC",
    role: "Lead Software Engineer / DevOps",
    range: "Jun 2023 — Present",
    place: "Kathmandu, Nepal",
    bullets: [
      "Architect & maintain highly-available, multi-cluster, multi-region Kubernetes platform serving 3M+ MAU",
      "Design geo-distributed traffic routing and failover strategy across regions",
      "Lead platform engineering org — observability, reliability, deployment velocity",
    ],
    tags: ["Kubernetes", "Multi-Region", "GitHub Actions", "Istio", "Terraform"],
  },
  {
    company: "Webpoint Solutions, LLC",
    role: "Senior Software Engineer / DevOps",
    range: "Jun 2022 — Jun 2023",
    place: "Kathmandu, Nepal",
    bullets: [
      "Deployed & maintained 20+ production applications across AWS",
      "Built React / Next.js / NestJS apps end-to-end",
      "Mentored 10+ interns and junior engineers",
    ],
    tags: ["AWS", "NestJS", "Next.js", "TypeScript"],
  },
  {
    company: "Signetic",
    role: "Software Engineer",
    range: "Jan 2021 — Jul 2021",
    place: "Kathmandu, Nepal",
    bullets: [
      "Built HL7-formatted vaccination submission pipeline to Immunization Information Systems (IIS)",
      "Converted HL7 streams into human-readable reports for clinical staff",
    ],
    tags: ["Node.js", "HL7", "Healthcare"],
  },
  {
    company: "Leapfrog Technology, Inc.",
    role: "Software Engineer / DevOps",
    range: "Jul 2020 — Jul 2021",
    place: "Kathmandu, Nepal",
    bullets: [
      "Deployed multiple projects across AWS / Azure",
      "Set up CI/CD pipelines with GitHub Actions, CircleCI, TravisCI, Azure DevOps",
    ],
    tags: ["AWS", "Azure", "CI/CD"],
  },
  {
    company: "Leapfrog Technology, Inc.",
    role: "Associate Software Engineer",
    range: "Jun 2019 — Jul 2020",
    place: "Kathmandu, Nepal",
    bullets: ["Foundations in full-stack delivery and cloud automation"],
    tags: ["Full-Stack"],
  },
  {
    company: "Yarsha Studio Pvt. Ltd.",
    role: "Front-end Developer",
    range: "Dec 2017 — May 2019",
    place: "Kathmandu, Nepal",
    bullets: [
      "Built multiple React.js production sites",
      "Engineered a real-time GPS-tracking backend over TCP sockets with D3.js visualization",
    ],
    tags: ["React.js", "D3.js", "TCP Sockets"],
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 md:py-32 px-4 md:px-6 relative" style={{ background: "#0E0B09" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-20"
        >
          <p className="font-mono tracking-[0.3em] uppercase text-[11px] mb-4" style={{ color: "#D94B1F" }}>
            03 — experience
          </p>
          <h2
            style={{
              color: "#F2EBDD",
              fontSize: "clamp(36px, 5vw, 76px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
            }}
          >
            Ten+ years.{" "}
            <span style={{ color: "#8A8073", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
              Six teams. One throughline.
            </span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative pl-7 md:pl-10">
          <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "#3A332E" }} />
          <motion.div
            style={{ height: lineH, background: "#D94B1F" }}
            className="absolute left-3 top-0 w-px"
          />

          <div className="space-y-14">
            {xp.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, type: "spring", damping: 22 }}
                className="relative group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", damping: 14, stiffness: 220 }}
                  className="absolute -left-[24px] md:-left-[34px] top-3 w-3 h-3 rounded-full"
                  style={{ background: "#D94B1F", boxShadow: "0 0 0 5px rgba(217,75,31,0.18)" }}
                />
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", damping: 18, stiffness: 240 }}
                  className="rounded-2xl border p-5 md:p-6 transition-colors"
                  style={{ background: "#161210", borderColor: "#3A332E" }}
                  data-hover
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 style={{ color: "#F2EBDD", fontSize: "20px", fontWeight: 600 }}>{j.role}</h3>
                    <span className="text-[12px] font-mono" style={{ color: "#8A8073" }}>{j.range}</span>
                  </div>
                  <p className="text-[14px]" style={{ color: "#D9A441" }}>
                    {j.company} <span style={{ color: "#8A8073" }}>· {j.place}</span>
                  </p>
                  <ul className="mt-4 space-y-1.5 text-[14.5px]" style={{ color: "#C8BFAE" }}>
                    {j.bullets.map((b, k) => (
                      <li key={k} className="flex gap-2">
                        <span style={{ color: "#D94B1F", marginTop: "6px" }}>▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {j.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full border text-[12px] font-mono"
                        style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#8A8073" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
