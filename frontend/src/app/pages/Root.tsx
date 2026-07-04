import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { flushSync } from "react-dom";
import { Outlet, useLocation, useNavigate } from "react-router";
import { CosmicBackground } from "../features/home/CosmicBackground";
import { Footer } from "../layout/Footer";
import { NavBar } from "../layout/NavBar";
import { SCROLL_IDS, T } from "../data/content";
import type { Lang, OutletCtx, SectionId } from "../data/content";
import { readStorageValue, writeStorageValue } from "../lib/storage";

const isLang = (value: string): value is Lang => value === "PT" || value === "EN";
const isThemeMode = (value: string): value is "light" | "dark" => value === "light" || value === "dark";
const THEME_REVEAL_MS = 720;
const THEME_REVEAL_REDUCED_MS = 280;

type ThemeReveal = {
  id: number;
  x: number;
  y: number;
  radius: number;
  duration: number;
  background: string;
};

type ThemeRevealStyle = CSSProperties & {
  "--theme-reveal-x": string;
  "--theme-reveal-y": string;
  "--theme-reveal-radius": string;
};

type ViewTransitionHandle = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

type ViewTransitionAnimationOptions = KeyframeAnimationOptions & {
  pseudoElement?: string;
};

function applyDocumentTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#0c0c0c" : "#fafafa");
  writeStorageValue("theme", isDark ? "dark" : "light");
}

export function Root() {
  const [lang, setLang] = useState<Lang>(() => readStorageValue("lang", "PT", isLang));
  const [isDark, setIsDark] = useState(() => readStorageValue("theme", "light", isThemeMode) === "dark");
  const [themeReveal, setThemeReveal] = useState<ThemeReveal | null>(null);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const pendingScrollRef                  = useRef<string | null>(null);
  const didApplyInitialTheme              = useRef(false);
  const themeRevealTimeoutRef             = useRef<number | null>(null);
  const navigate                          = useNavigate();
  const location                          = useLocation();

  const tr = T[lang];

  const handleThemeToggle = useCallback((event: ReactMouseEvent<HTMLButtonElement>) => {
    const nextTheme = !document.documentElement.classList.contains("dark");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? THEME_REVEAL_REDUCED_MS : THEME_REVEAL_MS;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const commitTheme = () => {
      applyDocumentTheme(nextTheme);
      setIsDark(nextTheme);
    };

    if (themeRevealTimeoutRef.current !== null) {
      window.clearTimeout(themeRevealTimeoutRef.current);
      themeRevealTimeoutRef.current = null;
    }
    setThemeReveal(null);
    document.documentElement.classList.add("theme-switching");

    if ("startViewTransition" in document) {
      const transition = (document as ViewTransitionDocument).startViewTransition?.(() => {
        flushSync(commitTheme);
      });

      if (transition) {
        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration,
              easing: "cubic-bezier(0.2, 0.9, 0.18, 1)",
              pseudoElement: "::view-transition-new(root)",
            } as ViewTransitionAnimationOptions
          );
        }).catch(() => undefined);

        transition.finished.finally(() => {
          document.documentElement.classList.remove("theme-switching");
        });
        return;
      }
    }

    setThemeReveal({
      id: Date.now(),
      x,
      y,
      radius,
      duration,
      background: nextTheme ? "#0c0c0c" : "#fafafa",
    });

    themeRevealTimeoutRef.current = window.setTimeout(() => {
      flushSync(commitTheme);
      setThemeReveal(null);
      document.documentElement.classList.remove("theme-switching");
      themeRevealTimeoutRef.current = null;
    }, duration);
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
    if (themeRevealTimeoutRef.current !== null) {
      window.clearTimeout(themeRevealTimeoutRef.current);
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
      {themeReveal && (
        <div
          key={themeReveal.id}
          className="theme-reveal-fallback"
          style={{
            background: themeReveal.background,
            animationDuration: `${themeReveal.duration}ms`,
            "--theme-reveal-x": `${themeReveal.x}px`,
            "--theme-reveal-y": `${themeReveal.y}px`,
            "--theme-reveal-radius": `${themeReveal.radius}px`,
          } as ThemeRevealStyle}
          aria-hidden="true"
        />
      )}

      <style>{`
        @keyframes fade-up { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes infinite-bar { from { transform:translate3d(0,0,0); } to { transform:translate3d(-12.5%,0,0); } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.35;transform:scale(0.65);} }
        @keyframes theme-fallback-reveal {
          from { clip-path:circle(0px at var(--theme-reveal-x) var(--theme-reveal-y)); }
          to { clip-path:circle(var(--theme-reveal-radius) at var(--theme-reveal-x) var(--theme-reveal-y)); }
        }
        ::view-transition-old(root),
        ::view-transition-new(root){
          animation:none;
          mix-blend-mode:normal;
        }
        ::view-transition-old(root){ z-index:1; }
        ::view-transition-new(root){ z-index:2; }
        .theme-switching *,
        .theme-switching *::before,
        .theme-switching *::after{
          transition:none !important;
        }
        .theme-reveal-fallback{
          position:fixed;
          inset:0;
          z-index:9999;
          pointer-events:none;
          animation:theme-fallback-reveal ${THEME_REVEAL_MS}ms cubic-bezier(0.2,0.9,0.18,1) both;
          will-change:clip-path;
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
