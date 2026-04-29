import { useEffect, useRef } from "react";

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  const repo = import.meta.env.PUBLIC_GISCUS_REPO;
  const repoId = import.meta.env.PUBLIC_GISCUS_REPO_ID;
  const category = import.meta.env.PUBLIC_GISCUS_CATEGORY;
  const categoryId = import.meta.env.PUBLIC_GISCUS_CATEGORY_ID;

  const configured = repo && repoId && category && categoryId;

  useEffect(() => {
    if (!configured || !ref.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "https://razzkumar.github.io/giscus-theme.css");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [configured]);

  if (!configured) {
    return (
      <div className="mt-12" style={{ color: "#8A8073", fontSize: "13px", fontFamily: "monospace" }}>
        {/* Giscus comments not configured — set PUBLIC_GISCUS_* env vars to enable */}
      </div>
    );
  }

  return <div ref={ref} className="giscus mt-12" />;
}
