import { useEffect, useRef, type CSSProperties } from "react";

type CursorGlowStyle = CSSProperties & {
  "--cursor-glow-core": string;
  "--cursor-glow-primary": string;
  "--cursor-glow-secondary": string;
  "--cursor-glow-blend": string;
};

interface CursorGlowProps {
  isDark: boolean;
}

const DARK_GLOW_STYLE: CursorGlowStyle = {
  "--cursor-glow-core": "rgba(180, 180, 180, 0.08)",
  "--cursor-glow-primary": "rgba(120, 120, 120, 0.06)",
  "--cursor-glow-secondary": "rgba( 80,  80,  80, 0.04)",
  "--cursor-glow-blend": "screen",
};

export function CursorGlow({ isDark }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDark) return;

    const glow = glowRef.current;
    if (!glow) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const hideGlow = () => {
      glow.style.setProperty("--cursor-glow-opacity", "0");
    };

    const syncEnabledState = () => {
      if (reducedMotionQuery.matches) {
        hideGlow();
        return;
      }

      glow.style.setProperty("--cursor-glow-opacity", "1");
    };

    const handleMouseMove = (event: MouseEvent) => {
      glow.style.setProperty("--cursor-glow-x", `${event.clientX}px`);
      glow.style.setProperty("--cursor-glow-y", `${event.clientY}px`);
      glow.style.setProperty("--cursor-glow-opacity", "1");
    };

    syncEnabledState();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("blur", hideGlow);
    document.documentElement.addEventListener("mouseleave", hideGlow);
    reducedMotionQuery.addEventListener("change", syncEnabledState);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", hideGlow);
      document.documentElement.removeEventListener("mouseleave", hideGlow);
      reducedMotionQuery.removeEventListener("change", syncEnabledState);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow"
        style={DARK_GLOW_STYLE}
        aria-hidden="true"
      />

      <style>{`
        .cursor-glow {
          --cursor-glow-x: 50vw;
          --cursor-glow-y: 50vh;
          --cursor-glow-opacity: 1;

          position: fixed;
          inset: 0;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          opacity: var(--cursor-glow-opacity);
          mix-blend-mode: var(--cursor-glow-blend, screen);
          background:
            radial-gradient(circle 50px  at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-core),      transparent 70%),
            radial-gradient(circle 200px at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-primary),   transparent 70%),
            radial-gradient(circle 380px at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-secondary), transparent 74%);
          
          contain: paint style;
          transition: opacity 240ms ease;
          will-change: background, opacity;
        }
      `}</style>
    </>
  );
}
