import { useState } from "react";
import type React from "react";
import { Menu, X } from "lucide-react";
import { GlobeIcon, MoonIcon, SunIcon } from "../components/icons/PortfolioIcons";
import { buildNavItems } from "../data/content";
import type { Lang, NavItemId, SectionId, Tr } from "../data/content";

interface NavBarProps {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
  isDark: boolean;
  onThemeToggle: React.MouseEventHandler<HTMLButtonElement>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: SectionId;
  handleNavClick: (id: SectionId) => void;
  handleProjectsClick: () => void;
  tr: Tr;
  onProjectsPage: boolean;
}

export function NavBar({
  lang, setLang, isDark, onThemeToggle,
  menuOpen, setMenuOpen,
  activeSection, handleNavClick, handleProjectsClick,
  tr, onProjectsPage,
}: NavBarProps) {
  const [logoHov, setLogoHov] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navItems = buildNavItems(tr);

  const isActive = (id: NavItemId, isRoute?: boolean) =>
    isRoute ? onProjectsPage : !onProjectsPage && activeSection === id;

  const navBg        = "var(--nav-bg)";
  const navBorder    = "var(--nav-border)";
  const logoAngle    = "var(--nav-logo-angle)";
  const logoName     = "var(--nav-logo-name)";
  const linkActive   = "var(--nav-link-active)";
  const linkInactive = "var(--nav-link-inactive)";
  const linkHover    = "var(--nav-link-hover)";
  const underline    = "var(--nav-underline)";
  const pillBg       = "var(--nav-pill-bg)";
  const pillBorder   = "var(--nav-pill-border)";
  const pillHoverBg  = "var(--nav-pill-hover-bg)";
  const sepColor     = "var(--nav-separator)";
  const ptActive     = "var(--nav-lang-active)";
  const ptInactive   = "var(--nav-lang-inactive)";
  const menuBg       = "var(--nav-menu-bg)";
  const hamburgClr   = "var(--nav-menu-button)";
  const activeText   = "var(--primary-foreground)";
  const navIcon      = "var(--nav-icon)";
  const projectBorder = onProjectsPage
    ? linkActive
    : "var(--nav-project-border)";
  const projectColor = onProjectsPage
    ? linkActive
    : "var(--nav-project-color)";

  const pill: React.CSSProperties = {
    background: pillBg, border: `1px solid ${pillBorder}`,
    borderRadius: "999px", cursor: "pointer", transition: "background 0.2s ease",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: navBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: `1px solid ${navBorder}`, transition: "background-color 0.3s ease, border-color 0.3s ease" }}>
      <div className="max-w-6xl mx-auto px-6 h-14 relative flex items-center">

        <button
          type="button"
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

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-5">
          {navItems.map(({ label, id, isRoute }) => {
            const active = isActive(id, isRoute);
            if (isRoute) {
              const routeBorder = active
                ? linkActive
                : "var(--nav-project-border)";
              const routeColor = active
                ? linkActive
                : "var(--nav-project-color)";
              return (
                <button key={id}
                  type="button"
                  onClick={handleProjectsClick}
                  className="relative text-[12px] font-mono px-3 py-0.5 shrink-0 transition-all duration-200"
                  style={{ color: routeColor, border: `1px solid ${routeBorder}`, background: active ? linkActive : "transparent" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = linkActive;
                    el.style.color = activeText;
                    el.style.borderColor = linkActive;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = active ? linkActive : "transparent";
                    el.style.color = active ? activeText : routeColor;
                    el.style.borderColor = routeBorder;
                  }}>
                  <span style={{ color: active ? activeText : routeColor }}>{label}</span>
                </button>
              );
            }
            return (
              <button key={id}
                type="button"
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
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={handleProjectsClick}
              className="relative text-[12px] font-mono px-3 py-1.5 shrink-0 transition-all duration-200"
              style={{ color: projectColor, border: `1px solid ${projectBorder}`, background: onProjectsPage ? linkActive : "transparent" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = linkActive;
                el.style.color = activeText;
                el.style.borderColor = linkActive;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = onProjectsPage ? linkActive : "transparent";
                el.style.color = onProjectsPage ? activeText : projectColor;
                el.style.borderColor = projectBorder;
              }}
            >
              {tr.nav_labels[7]}
            </button>
            <button onClick={() => setLang(lang === "PT" ? "EN" : "PT")}
              type="button"
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono" style={pill}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = pillHoverBg)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = pillBg)}>
              <GlobeIcon color={navIcon} />
              <span style={{ color: lang === "PT" ? ptActive : ptInactive, transition: "color 0.2s" }}>PT</span>
              <span style={{ color: sepColor }}>|</span>
              <span style={{ color: lang === "EN" ? ptActive : ptInactive, transition: "color 0.2s" }}>EN</span>
            </button>
            <button onClick={onThemeToggle}
              type="button"
              className="flex items-center justify-center w-8 h-8" style={pill}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = pillHoverBg)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = pillBg)}
              aria-label="Toggle theme">
              {isDark ? <SunIcon color={navIcon} /> : <MoonIcon color={navIcon} />}
            </button>
          </div>

          <button className="lg:hidden flex items-center justify-center w-8 h-8 shrink-0"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: hamburgClr }} aria-label="Toggle menu">
            {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-6 py-6 flex flex-col gap-4"
          style={{ backgroundColor: menuBg, borderTop: `1px solid ${navBorder}` }}>
          {navItems.map(({ label, id, isRoute }) => {
            const active = isActive(id, isRoute);
            if (isRoute) {
              return (
                <button key={id} onClick={handleProjectsClick}
                  type="button"
                  className="text-[13px] font-mono text-left py-1 px-3 w-fit border"
                  style={{
                    color: active ? linkActive : "var(--nav-project-color)",
                    borderColor: active ? linkActive : "var(--nav-project-border)",
                  }}>
                  {label}
                </button>
              );
            }
            return (
              <button key={id} onClick={() => handleNavClick(id)}
                type="button"
                className="text-[13px] font-mono text-left py-1"
                style={{ color: active ? linkActive : linkInactive }}>
                {label}
              </button>
            );
          })}
          <div className="flex items-center gap-3 pt-2"
            style={{ borderTop: `1px solid ${navBorder}`, marginTop: "4px" }}>
            <button
              onClick={handleProjectsClick}
              type="button"
              className="text-[13px] font-mono px-3 py-1.5 border"
              style={{
                color: onProjectsPage ? linkActive : "var(--nav-project-color)",
                borderColor: onProjectsPage ? linkActive : "var(--nav-project-border)",
              }}
            >
              {tr.nav_labels[7]}
            </button>
            <button onClick={() => setLang(lang === "PT" ? "EN" : "PT")}
              type="button"
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono" style={pill}>
              <GlobeIcon color={navIcon} />
              <span style={{ color: lang === "PT" ? ptActive : ptInactive }}>PT</span>
              <span style={{ color: sepColor }}>|</span>
              <span style={{ color: lang === "EN" ? ptActive : ptInactive }}>EN</span>
            </button>
            <button onClick={onThemeToggle}
              type="button"
              className="flex items-center justify-center w-8 h-8" style={pill}
              aria-label="Toggle theme">
              {isDark ? <SunIcon color={navIcon} /> : <MoonIcon color={navIcon} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
