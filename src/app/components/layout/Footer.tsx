import { ArrowUpRight } from "lucide-react";
import { FOOTER_LINKS, FOOTER_SCROLL_IDS } from "../../data/content";
import type { Tr } from "../../data/content";

export function Footer({ tr, handleNavClick, handleProjectsClick }: {
  tr: Tr;
  handleNavClick: (id: string) => void;
  handleProjectsClick: () => void;
}) {
  return (
    <footer style={{ backgroundColor: "#070707" }}>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="flex flex-col md:flex-row gap-12 pb-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex-1">
            <p className="text-xl font-medium tracking-tight mb-3" style={{ color: "rgba(255,255,255,0.92)" }}>
              Lucas Montalvão
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
              {tr.footer_tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
              {tr.footer_site}
            </p>
            {FOOTER_SCROLL_IDS.map((id, i) => (
              <button key={id} onClick={() => handleNavClick(id)}
                className="text-sm text-left hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.42)" }}>
                {tr.footer_nav[i]}
              </button>
            ))}
            <button onClick={handleProjectsClick}
              className="text-sm text-left hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.42)" }}>
              {tr.nav_labels[5]}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
              {tr.footer_links}
            </p>
            {FOOTER_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm transition-colors group inline-flex items-center gap-1 hover:text-white"
                style={{ color: "rgba(255,255,255,0.42)" }}>
                {label}
                <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 flex items-center justify-between">
          <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.16)" }}>
            © {new Date().getFullYear()} Lucas Montalvão
          </span>
          <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.16)" }}>
            {tr.footer_rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
