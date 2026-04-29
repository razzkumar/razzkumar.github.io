import { useEffect } from "react";

export function Search() {
  useEffect(() => {
    (async () => {
      try {
        const { PagefindUI } = await import("@pagefind/default-ui");
        new PagefindUI({ element: "#search", showSubResults: true, resetStyles: false });
      } catch {
        // pagefind index not available (e.g. dev mode) — placeholder shown via DOM
        const el = document.getElementById("search");
        if (el) {
          el.innerHTML = '<p class="font-mono text-[#8A8073]">Search available after build.</p>';
        }
      }
    })();
  }, []);

  return (
    <div
      id="search"
      className="rounded-2xl border border-[#3A332E] bg-[#161210] p-2"
    />
  );
}
