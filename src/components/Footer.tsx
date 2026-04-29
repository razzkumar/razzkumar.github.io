export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t py-10 px-6"
      style={{ background: "#0E0B09", borderColor: "#3A332E" }}
    >
      <div
        className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3 text-[12px] font-mono"
        style={{ color: "#8A8073" }}
      >
        <span>
          © {year} razzkumar · by a{" "}
          <span style={{ color: "#F2EBDD" }}>human</span>, with thoughtful AI in the loop.
        </span>
        <span style={{ color: "#D94B1F" }}>~/end-of-file</span>
      </div>
    </footer>
  );
}
