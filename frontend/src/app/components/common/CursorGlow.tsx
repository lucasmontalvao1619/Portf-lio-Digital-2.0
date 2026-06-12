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
  "--cursor-glow-core": "rgba(255, 255, 255, 0.36)",
  "--cursor-glow-primary": "rgba(120, 150, 255, 0.14)",
  "--cursor-glow-secondary": "rgba(92, 184, 255, 0.075)",
};

const DARK_GLOW_STYLE: CursorGlowStyle = {
  "--cursor-glow-core": "rgba(255, 255, 255, 0.105)",
  "--cursor-glow-primary": "rgba(80, 180, 255, 0.145)",
  "--cursor-glow-secondary": "rgba(150, 106, 255, 0.085)",
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
    let visible = false;

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
      visible = false;
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
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        setGlowPosition();
        glow.style.setProperty("--cursor-glow-opacity", "1");
        visible = true;
      }
    };

    const handleResize = () => {
      if (!visible) {
        currentX = window.innerWidth / 2;
        currentY = window.innerHeight / 2;
        targetX = currentX;
        targetY = currentY;
        setGlowPosition();
      }
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
          --cursor-glow-opacity: 0;
          --cursor-glow-size: clamp(30rem, 54vw, 52rem);

          position: fixed;
          left: 0;
          top: 0;
          z-index: 1;
          width: var(--cursor-glow-size);
          height: var(--cursor-glow-size);
          pointer-events: none;
          border-radius: 9999px;
          opacity: var(--cursor-glow-opacity);
          transform: translate3d(
            calc(var(--cursor-glow-x) - 50%),
            calc(var(--cursor-glow-y) - 50%),
            0
          );
          background:
            radial-gradient(circle at center, var(--cursor-glow-core) 0%, var(--cursor-glow-primary) 22%, transparent 58%),
            radial-gradient(circle at center, var(--cursor-glow-secondary) 0%, transparent 72%);
          filter: blur(22px);
          contain: layout paint style;
          transition: opacity 240ms ease;
          will-change: transform, opacity;
        }

        @media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
          .cursor-glow {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
