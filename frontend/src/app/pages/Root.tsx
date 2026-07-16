import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { CosmicBackground } from "../features/home/CosmicBackground";
import { IntroOverlay } from "../features/intro/IntroOverlay";
import { Footer } from "../layout/Footer";
import { NavBar } from "../layout/NavBar";
import { SCROLL_IDS, T } from "../data/content";
import type { Lang, OutletCtx, SectionId } from "../data/content";
import { readStorageValue, writeStorageValue } from "../lib/storage";

const isLang = (value: string): value is Lang => value === "PT" || value === "EN";
const isThemeMode = (value: string): value is "light" | "dark" => value === "light" || value === "dark";

// Duração do crossfade de cores ao trocar o tema (ms):
const THEME_CROSSFADE_MS = 320;

function applyDocumentTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#0c0c0c" : "#fafafa");
  writeStorageValue("theme", isDark ? "dark" : "light");
}

export function Root() {
  const [lang, setLang] = useState<Lang>(() => readStorageValue("lang", "PT", isLang));
  const [isDark, setIsDark] = useState(() => readStorageValue("theme", "light", isThemeMode) === "dark");
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const pendingScrollRef                  = useRef<string | null>(null);
  const didApplyInitialTheme              = useRef(false);
  const themeCrossfadeTimeoutRef          = useRef<number | null>(null);
  const navigate                          = useNavigate();
  const location                          = useLocation();

  const tr = T[lang];

  const handleThemeToggle = useCallback(() => {
    const nextTheme = !document.documentElement.classList.contains("dark");

    if (themeCrossfadeTimeoutRef.current !== null) {
      window.clearTimeout(themeCrossfadeTimeoutRef.current);
      themeCrossfadeTimeoutRef.current = null;
    }

    document.documentElement.classList.add("theme-crossfade");
    themeCrossfadeTimeoutRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-crossfade");
      themeCrossfadeTimeoutRef.current = null;
    }, THEME_CROSSFADE_MS + 60);

    applyDocumentTheme(nextTheme);
    setIsDark(nextTheme);
  }, []);

  useLayoutEffect(() => {
    if (didApplyInitialTheme.current) {
      applyDocumentTheme(isDark);
    } else {
      didApplyInitialTheme.current = true;
      applyDocumentTheme(isDark);
    }
  }, [isDark]);

  useEffect(() => () => {
    if (themeCrossfadeTimeoutRef.current !== null) {
      window.clearTimeout(themeCrossfadeTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    writeStorageValue("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const update = () => {
      const y = window.scrollY + 80;
      let currentSection: SectionId = "inicio";
      for (const id of SCROLL_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) currentSection = id;
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/" && pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      setTimeout(() => {
        if (target === "inicio") window.scrollTo({ top: 0, behavior: "smooth" });
        else document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  const scrollToSection = (id: SectionId) => {
    setMenuOpen(false);
    if (id === "inicio") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (id: SectionId) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      pendingScrollRef.current = id;
      navigate("/");
    } else {
      scrollToSection(id);
    }
  };

  const handleProjectsClick = () => {
    setMenuOpen(false);
    navigate("/projetos");
  };

  const ctx: OutletCtx = { isDark, lang, tr, scrollToSection, handleProjectsClick };

  return (
    <div className="relative isolate bg-background text-foreground font-sans antialiased min-h-screen overflow-x-hidden"
      style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}>
      <CosmicBackground isDark={isDark} />
      <IntroOverlay />

      <style>{`
        @keyframes fade-up { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes infinite-bar { from { transform:translate3d(0,0,0); } to { transform:translate3d(-12.5%,0,0); } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.35;transform:scale(0.65);} }
        .theme-crossfade,
        .theme-crossfade *,
        .theme-crossfade *::before,
        .theme-crossfade *::after{
          transition:
            background-color ${THEME_CROSSFADE_MS}ms ease,
            color ${THEME_CROSSFADE_MS}ms ease,
            border-color ${THEME_CROSSFADE_MS}ms ease !important;
          transition-delay: 0s !important;
        }
        .afu{animation:fade-up 0.95s cubic-bezier(0.16,1,0.3,1) both;}
        .d100{animation-delay:100ms;} .d200{animation-delay:200ms;}
        .d300{animation-delay:300ms;} .d450{animation-delay:450ms;}
        .infinite-bar-track{width:max-content;animation:infinite-bar var(--infinite-bar-duration,35s) linear infinite;will-change:transform;}
        *{scrollbar-width:none;} *::-webkit-scrollbar{display:none;}
      `}</style>

      <NavBar
        lang={lang} setLang={setLang}
        isDark={isDark} onThemeToggle={handleThemeToggle}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        handleProjectsClick={handleProjectsClick}
        tr={tr}
        onProjectsPage={location.pathname.startsWith("/projetos")}
      />

      <main className="relative z-10">
        <Outlet context={ctx} />
      </main>

      <Footer isDark={isDark} tr={tr} handleNavClick={handleNavClick} handleProjectsClick={handleProjectsClick} />
    </div>
  );
}
