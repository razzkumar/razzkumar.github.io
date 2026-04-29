import { motion } from "motion/react";
import { Cpu, Battery, Waves, Sparkles, Shield, Zap } from "lucide-react";

const features = [
  { icon: Cpu, title: "L2 Bionic", desc: "Up to 40% faster neural engine for on-device intelligence." },
  { icon: Battery, title: "All Day", desc: "Up to 36 hours of immersive listening on a single charge." },
  { icon: Waves, title: "Spatial Audio", desc: "Dynamic head tracking that puts you inside the moment." },
  { icon: Sparkles, title: "Adaptive EQ", desc: "Tunes music in real time to the shape of your ear." },
  { icon: Shield, title: "Private", desc: "End-to-end encryption. Your data never leaves the device." },
  { icon: Zap, title: "MagFlash", desc: "10 minutes of charge for a full day of playback." },
];

export function FeatureGrid() {
  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}
          className="max-w-3xl mb-20"
        >
          Built different. <span className="text-white/40">Down to the atom.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-8 backdrop-blur-xl"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-all" />
              <f.icon className="w-7 h-7 mb-6 text-white" strokeWidth={1.4} />
              <h3 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p className="mt-2 text-white/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
