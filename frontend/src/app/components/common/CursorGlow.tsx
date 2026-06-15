import { useEffect, useRef, type CSSProperties } from "react";

type CursorGlowStyle = CSSProperties & {
  "--cursor-glow-core": string;
  "--cursor-glow-primary": string;
  "--cursor-glow-secondary": string;
};

interface CursorGlowProps {
  isDark: boolean;
}

const LIGHT_GLOW_STYLE: CursorGlowStyle = {
  "--cursor-glow-core": "rgba(255, 255, 255, 0.22)",
  "--cursor-glow-primary": "rgba(86, 124, 255, 0.16)",
  "--cursor-glow-secondary": "rgba(42, 178, 255, 0.08)",
};

const DARK_GLOW_STYLE: CursorGlowStyle = {
  "--cursor-glow-core": "rgba(255, 255, 255, 0.10)",
  "--cursor-glow-primary": "rgba(84, 190, 255, 0.16)",
  "--cursor-glow-secondary": "rgba(154, 118, 255, 0.10)",
};

export function CursorGlow({ isDark }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrame = 0;
    let enabled = false;

    const setGlowPosition = () => {
      glow.style.setProperty("--cursor-glow-x", `${currentX.toFixed(2)}px`);
      glow.style.setProperty("--cursor-glow-y", `${currentY.toFixed(2)}px`);
    };

    const animate = () => {
      if (!enabled) return;

      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      setGlowPosition();

      animationFrame = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const hideGlow = () => {
      glow.style.setProperty("--cursor-glow-opacity", "0");
    };

    const syncEnabledState = () => {
      enabled = finePointerQuery.matches && !reducedMotionQuery.matches;

      if (!enabled) {
        hideGlow();
        stopAnimation();
        return;
      }

      setGlowPosition();
      glow.style.setProperty("--cursor-glow-opacity", "1");
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.setProperty("--cursor-glow-opacity", "1");
    };

    const handleResize = () => {
      currentX = window.innerWidth / 2;
      currentY = window.innerHeight / 2;
      targetX = currentX;
      targetY = currentY;
      setGlowPosition();
    };

    syncEnabledState();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("blur", hideGlow);
    document.documentElement.addEventListener("mouseleave", hideGlow);
    finePointerQuery.addEventListener("change", syncEnabledState);
    reducedMotionQuery.addEventListener("change", syncEnabledState);

    return () => {
      stopAnimation();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", hideGlow);
      document.documentElement.removeEventListener("mouseleave", hideGlow);
      finePointerQuery.removeEventListener("change", syncEnabledState);
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
          z-index: 2;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          opacity: var(--cursor-glow-opacity);
          background:
            radial-gradient(140px circle at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-core), transparent 70%),
            radial-gradient(600px circle at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-primary), transparent 70%),
            radial-gradient(920px circle at var(--cursor-glow-x) var(--cursor-glow-y), var(--cursor-glow-secondary), transparent 74%);
          mix-blend-mode: screen;
          contain: paint style;
          transition: opacity 240ms ease;
          will-change: background, opacity;
        }
      `}</style>
    </>
  );
}
