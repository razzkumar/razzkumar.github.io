import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users } from "lucide-react";

type User = { public_repos: number; followers: number; following: number; avatar_url: string; name: string; bio: string };
type Repo = { id: number; name: string; description: string; stargazers_count: number; forks_count: number; language: string; html_url: string };

const USERNAME = "razzkumar";

export function GithubStats() {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`).then((r) =>
        r.ok ? r.json() : Promise.reject()
      ),
    ])
      .then(([u, rs]: [User, Repo[]]) => {
        if (cancelled) return;
        setUser(u);
        const top = [...rs].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4);
        setRepos(top);
      })
      .catch(() => !cancelled && setErr(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);

  return (
    <section
      id="github"
      className="py-20 md:py-32 px-4 md:px-6 relative"
      style={{ background: "#0E0B09" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-10 md:mb-16 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="font-mono tracking-[0.3em] uppercase text-[11px] mb-4" style={{ color: "#D94B1F" }}>
              06 — open source
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
              Live from GitHub.{" "}
              <span style={{ color: "#8A8073", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
                Updated as I push.
              </span>
            </h2>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            data-hover
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-[12px] transition-colors"
            style={{ borderColor: "#3A332E", color: "#F2EBDD", background: "#161210" }}
          >
            <Github size={14} /> @{USERNAME}
          </a>
        </motion.div>

        {err ? (
          <div
            className="rounded-2xl border p-6 font-mono text-[13px]"
            style={{ borderColor: "#3A332E", background: "#161210", color: "#8A8073" }}
          >
            ▸ GitHub API rate-limited or offline. Visit{" "}
            <a href={`https://github.com/${USERNAME}`} className="underline" style={{ color: "#D94B1F" }}>
              github.com/{USERNAME}
            </a>{" "}
            directly.
          </div>
        ) : (
          <>
            {/* summary tiles */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { v: user?.public_repos ?? "—", l: "public repos", icon: Github },
                { v: user?.followers ?? "—", l: "followers", icon: Users },
                { v: totalStars || "—", l: "stars (top 4)", icon: Star },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, type: "spring", damping: 22 }}
                  className="rounded-2xl border p-4 md:p-5"
                  style={{ background: "#161210", borderColor: "#3A332E" }}
                >
                  <s.icon size={14} style={{ color: "#D94B1F" }} />
                  <div
                    className="mt-2"
                    style={{
                      color: "#F2EBDD",
                      fontSize: "clamp(28px, 4vw, 48px)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.v}
                  </div>
                  <p className="mt-1.5 font-mono text-[11px]" style={{ color: "#8A8073" }}>
                    ▸ {s.l}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* top repos */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4 mt-4">
              {(repos.length ? repos : Array.from({ length: 4 }).map((_, i) => null)).map((r, i) => (
                <motion.a
                  key={r?.id ?? i}
                  href={r?.html_url ?? `https://github.com/${USERNAME}`}
                  target="_blank"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.06, type: "spring", damping: 22 }}
                  whileHover={{ y: -4 }}
                  data-hover
                  className="block rounded-2xl border p-5 transition-colors"
                  style={{ background: "#161210", borderColor: "#3A332E" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[14px]" style={{ color: "#F2EBDD" }}>
                      {r?.name ?? "loading…"}
                    </span>
                    {r?.language && (
                      <span className="font-mono text-[10px]" style={{ color: "#D9A441" }}>
                        {r.language}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] min-h-[36px]" style={{ color: "#C8BFAE" }}>
                    {r?.description ?? "—"}
                  </p>
                  <div className="mt-3 flex items-center gap-4 font-mono text-[11px]" style={{ color: "#8A8073" }}>
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} /> {r?.stargazers_count ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={11} /> {r?.forks_count ?? 0}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
