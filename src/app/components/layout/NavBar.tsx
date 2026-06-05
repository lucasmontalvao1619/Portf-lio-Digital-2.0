import { useState } from "react";
import type React from "react";
import { Menu, X } from "lucide-react";
import { GlobeIcon, MoonIcon, SunIcon } from "../icons/PortfolioIcons";
import type { Lang, Tr } from "../../data/content";

export function NavBar({
  lang, setLang, isDark, setIsDark,
  menuOpen, setMenuOpen,
  activeSection, handleNavClick, handleProjectsClick,
  tr, onProjectsPage,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  isDark: boolean;
  setIsDark: (fn: (p: boolean) => boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  activeSection: string;
  handleNavClick: (id: string) => void;
  handleProjectsClick: () => void;
  tr: Tr;
  onProjectsPage: boolean;
}) {
  const [logoHov, setLogoHov] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const NAV_ITEMS = [
    { label: tr.nav_labels[0], id: "inicio" },
    { label: tr.nav_labels[1], id: "sobre" },
    { label: tr.nav_labels[2], id: "habilidades" },
    { label: tr.nav_labels[3], id: "trajetoria" },
    { label: tr.nav_labels[4], id: "contato" },
    { label: tr.nav_labels[5], id: "projetos", isRoute: true },
  ];

  const isActive = (id: string, isRoute?: boolean) =>
    isRoute ? onProjectsPage : !onProjectsPage && activeSection === id;

  const navBg        = isDark ? "rgba(6,6,6,0.9)"        : "rgba(255,255,255,0.92)";
  const navBorder    = isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.07)";
  const logoAngle    = isDark ? "rgba(255,255,255,0.28)"  : "rgba(0,0,0,0.28)";
  const logoName     = isDark ? "rgba(255,255,255,0.92)"  : "rgba(0,0,0,0.88)";
  const linkActive   = isDark ? "rgba(255,255,255,0.92)"  : "rgba(0,0,0,0.88)";
  const linkInactive = isDark ? "rgba(255,255,255,0.42)"  : "rgba(0,0,0,0.48)";
  const linkHover    = isDark ? "rgba(255,255,255,0.75)"  : "rgba(0,0,0,0.72)";
  const underline    = isDark ? "rgba(255,255,255,0.55)"  : "rgba(0,0,0,0.75)";
  const pillBg       = isDark ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.04)";
  const pillBorder   = isDark ? "rgba(255,255,255,0.09)"  : "rgba(0,0,0,0.1)";
  const pillHoverBg  = isDark ? "rgba(255,255,255,0.09)"  : "rgba(0,0,0,0.07)";
  const sepColor     = isDark ? "rgba(255,255,255,0.16)"  : "rgba(0,0,0,0.16)";
  const ptActive     = isDark ? "rgba(255,255,255,0.92)"  : "rgba(0,0,0,0.88)";
  const ptInactive   = isDark ? "rgba(255,255,255,0.28)"  : "rgba(0,0,0,0.3)";
  const menuBg       = isDark ? "rgba(6,6,6,0.97)"        : "rgba(255,255,255,0.97)";
  const hamburgClr   = isDark ? "rgba(255,255,255,0.65)"  : "rgba(0,0,0,0.6)";

  const pill: React.CSSProperties = {
    background: pillBg, border: `1px solid ${pillBorder}`,
    borderRadius: "999px", cursor: "pointer", transition: "background 0.2s ease",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: navBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${navBorder}`, transition: "background-color 0.3s ease, border-color 0.3s ease" }}>
      <div className="max-w-6xl mx-auto px-6 h-14 relative flex items-center">

        <button
          onClick={() => handleNavClick("inicio")}
          onMouseEnter={() => setLogoHov(true)}
          onMouseLeave={() => setLogoHov(false)}
          className="font-mono text-[13px] shrink-0 select-none z-10 relative"
          style={{ letterSpacing: "0.01em" }}>
          <span style={{ color: logoHov ? logoName : logoAngle, transition: "color 0.22s ease" }}>&lt;</span>
          <span className="relative inline-block" style={{ color: logoName, fontWeight: 500 }}>
            {" "}Lucas Montalvão{" "}
            <span className="absolute left-0 bottom-0 h-px pointer-events-none"
              style={{
                width: logoHov ? "100%" : "0%",
                background: logoName,
                opacity: 0.45,
                transition: "width 0.32s cubic-bezier(0.16,1,0.3,1)",
              }} />
          </span>
          <span style={{ color: logoHov ? logoName : logoAngle, transition: "color 0.22s ease" }}>/&gt;</span>
        </button>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-5">
          {NAV_ITEMS.map(({ label, id, isRoute }) => {
            const active = isActive(id, isRoute);
            if (isRoute) {
              const routeBorder = active
                ? linkActive
                : isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.28)";
              const routeColor = active
                ? linkActive
                : isDark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.72)";
              return (
                <button key={id}
                  onClick={handleProjectsClick}
                  className="relative text-[12px] font-mono px-3 py-0.5 shrink-0 transition-all duration-200"
                  style={{ color: routeColor, border: `1px solid ${routeBorder}`, background: active ? linkActive : "transparent" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = linkActive;
                    el.style.color = isDark ? "#0c0c0c" : "#fafafa";
                    el.style.borderColor = linkActive;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = active ? linkActive : "transparent";
                    el.style.color = active ? (isDark ? "#0c0c0c" : "#fafafa") : routeColor;
                    el.style.borderColor = routeBorder;
                  }}>
                  <span style={{ color: active ? (isDark ? "#0c0c0c" : "#fafafa") : routeColor }}>{label}</span>
                </button>
              );
            }
            return (
              <button key={id}
                onClick={() => handleNavClick(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative text-[12px] font-mono py-1 shrink-0"
                style={{ color: active ? linkActive : hoveredId === id ? linkHover : linkInactive, transition: "color 0.22s ease" }}>
                {label}
                <span className="absolute left-0 bottom-0 h-px pointer-events-none"
                  style={{
                    width: active || hoveredId === id ? "100%" : "0%",
                    background: underline,
                    opacity: active ? 0.75 : 0.45,
                    transition: "width 0.32s cubic-bezier(0.16,1,0.3,1)",
                    bottom: active ? "-1px" : "0px",
                  }} />
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setLang(lang === "PT" ? "EN" : "PT")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono" style={pill}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = pillHoverBg)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = pillBg)}>
              <GlobeIcon color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"} />
              <span style={{ color: lang === "PT" ? ptActive : ptInactive, transition: "color 0.2s" }}>PT</span>
              <span style={{ color: sepColor }}>|</span>
              <span style={{ color: lang === "EN" ? ptActive : ptInactive, transition: "color 0.2s" }}>EN</span>
            </button>
            <button onClick={() => setIsDark((d) => !d)}
              className="flex items-center justify-center w-8 h-8" style={pill}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = pillHoverBg)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = pillBg)}
              aria-label="Toggle theme">
              {isDark ? <SunIcon color="rgba(255,255,255,0.6)" /> : <MoonIcon color="rgba(0,0,0,0.5)" />}
            </button>
          </div>

          <button className="md:hidden flex items-center justify-center w-8 h-8 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: hamburgClr }} aria-label="Toggle menu">
            {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-6 flex flex-col gap-4"
          style={{ backgroundColor: menuBg, borderTop: `1px solid ${navBorder}` }}>
          {NAV_ITEMS.map(({ label, id, isRoute }) => {
            const active = isActive(id, isRoute);
            if (isRoute) {
              return (
                <button key={id} onClick={handleProjectsClick}
                  className="text-[13px] font-mono text-left py-1 px-3 w-fit border"
                  style={{
                    color: active ? linkActive : isDark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.72)",
                    borderColor: active ? linkActive : isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.28)",
                  }}>
                  {label}
                </button>
              );
            }
            return (
              <button key={id} onClick={() => handleNavClick(id)}
                className="text-[13px] font-mono text-left py-1"
                style={{ color: active ? linkActive : linkInactive }}>
                {label}
              </button>
            );
          })}
          <div className="flex items-center gap-3 pt-2"
            style={{ borderTop: `1px solid ${navBorder}`, marginTop: "4px" }}>
            <button onClick={() => setLang(lang === "PT" ? "EN" : "PT")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono" style={pill}>
              <GlobeIcon color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"} />
              <span style={{ color: lang === "PT" ? ptActive : ptInactive }}>PT</span>
              <span style={{ color: sepColor }}>|</span>
              <span style={{ color: lang === "EN" ? ptActive : ptInactive }}>EN</span>
            </button>
            <button onClick={() => setIsDark((d) => !d)}
              className="flex items-center justify-center w-8 h-8" style={pill}
              aria-label="Toggle theme">
              {isDark ? <SunIcon color="rgba(255,255,255,0.6)" /> : <MoonIcon color="rgba(0,0,0,0.5)" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
