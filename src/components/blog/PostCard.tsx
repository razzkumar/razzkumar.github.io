import { motion } from "motion/react";
import type { CollectionEntry } from "astro:content";

export function PostCard({ post }: { post: CollectionEntry<"blog"> }) {
  const { title, description, pubDate, tags = [], cover, coverAlt } = post.data;
  const visibleTags = tags.slice(0, 3);
  const extraTags = tags.length > 3 ? tags.length - 3 : 0;
  const dateStr = new Date(pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.a
      href={`/blog/${post.slug}/`}
      className="block rounded-3xl border p-6 overflow-hidden"
      style={{ background: "#161210", borderColor: "#3A332E", color: "#F2EBDD", textDecoration: "none" }}
      whileHover={{ y: -2, borderColor: "#D94B1F" }}
      transition={{ duration: 0.2 }}
    >
      {cover && (
        <img
          src={cover}
          alt={coverAlt ?? title}
          loading="lazy"
          className="w-full rounded-xl mb-4 object-cover"
          style={{ maxHeight: "180px" }}
        />
      )}
      <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#F2EBDD", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      <p
        className="mt-2 text-[14.5px]"
        style={{ color: "#C8BFAE", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-4 font-mono text-[11.5px]" style={{ color: "#8A8073" }}>
        <span>{dateStr}</span>
        {visibleTags.length > 0 && <span>·</span>}
        {visibleTags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full border"
            style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#8A8073" }}
          >
            #{t}
          </span>
        ))}
        {extraTags > 0 && <span>+{extraTags}</span>}
      </div>
    </motion.a>
  );
}
