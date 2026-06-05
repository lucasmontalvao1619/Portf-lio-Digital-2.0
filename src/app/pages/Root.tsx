import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Footer } from "../components/layout/Footer";
import { NavBar } from "../components/layout/NavBar";
import { SCROLL_IDS, T } from "../data/content";
import type { Lang, OutletCtx } from "../data/content";

export function Root() {
  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem("lang") as Lang) || "PT"; } catch { return "PT"; }
  });
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("theme") === "dark"; } catch { return false; }
  });
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const pendingScrollRef                  = useRef<string | null>(null);
  const navigate                          = useNavigate();
  const location                          = useLocation();

  const tr = T[lang] as Tr;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const update = () => {
      const y = window.scrollY + 80; let cur = "inicio";
      for (const id of SCROLL_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActiveSection(cur);
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

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (id === "inicio") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
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
    <div className="bg-background text-foreground font-sans antialiased min-h-screen overflow-x-hidden"
      style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}>
      <style>{`
        @keyframes fade-up { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes infinite-bar { from { transform:translate3d(0,0,0); } to { transform:translate3d(-12.5%,0,0); } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.35;transform:scale(0.65);} }
        .afu{animation:fade-up 0.95s cubic-bezier(0.16,1,0.3,1) both;}
        .d100{animation-delay:100ms;} .d200{animation-delay:200ms;}
        .d300{animation-delay:300ms;} .d450{animation-delay:450ms;}
        .infinite-bar-track{width:max-content;animation:infinite-bar var(--infinite-bar-duration,35s) linear infinite;will-change:transform;}
        .infinite-bar:hover .infinite-bar-track{animation-play-state:paused;}
        *{scrollbar-width:none;} *::-webkit-scrollbar{display:none;}
      `}</style>

      <NavBar
        lang={lang} setLang={setLang}
        isDark={isDark} setIsDark={setIsDark}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        handleProjectsClick={handleProjectsClick}
        tr={tr}
        onProjectsPage={location.pathname.startsWith("/projetos")}
      />

      <Outlet context={ctx} />

      <Footer tr={tr} handleNavClick={handleNavClick} handleProjectsClick={handleProjectsClick} />
    </div>
  );
}
