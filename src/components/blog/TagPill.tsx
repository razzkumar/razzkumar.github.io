export function TagPill({ tag }: { tag: string }) {
  return (
    <a
      href={`/blog/tags/${tag}/`}
      className="px-2 py-0.5 rounded-full border text-[11.5px] font-mono transition-colors"
      style={{ background: "#0E0B09", borderColor: "#3A332E", color: "#8A8073" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#D94B1F")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8A8073")}
    >
      {tag}
    </a>
  );
}
