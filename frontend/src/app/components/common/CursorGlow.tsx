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

const LIGHT_GLOW_STYLE: CursorGlowStyle = {
  "--cursor-glow-core": "rgba(255, 255, 255, 0.22)",
  "--cursor-glow-primary": "rgba(86, 124, 255, 0.16)",
  "--cursor-glow-secondary": "rgba(42, 178, 255, 0.08)",
  "--cursor-glow-blend": "overlay",
};

const DARK_GLOW_STYLE: CursorGlowStyle = {
  "--cursor-glow-core": "rgba(255, 255, 255, 0.10)",
  "--cursor-glow-primary": "rgba(84, 190, 255, 0.16)",
  "--cursor-glow-secondary": "rgba(154, 118, 255, 0.10)",
  "--cursor-glow-blend": "screen",
};

export function CursorGlow({ isDark }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow"
        style={isDark ? DARK_GLOW_STYLE : LIGHT_GLOW_STYLE}
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
            radial-gradient(circle 140px at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-core), transparent 70%),
            radial-gradient(circle 600px at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-primary), transparent 70%),
            radial-gradient(circle 920px at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-secondary), transparent 74%);
          
          contain: paint style;
          transition: opacity 240ms ease;
          will-change: background, opacity;
        }
      `}</style>
    </>
  );
}
