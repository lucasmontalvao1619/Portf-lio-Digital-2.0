import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type StarStyle = CSSProperties & {
  "--star-opacity": number;
  "--twinkle-duration": string;
  "--twinkle-delay": string;
  "--drift-x": string;
  "--drift-y": string;
};

type MeteorStyle = CSSProperties & {
  "--meteor-opacity": number;
  "--meteor-delay": string;
  "--meteor-duration": string;
  "--meteor-length": string;
  "--meteor-angle": string;
  "--meteor-x": string;
  "--meteor-y": string;
  "--meteor-height": string;
};

const STAR_COUNT = 90;
const METEOR_COUNT = 6;
const COSMIC_FADE_MS = 420;
const COSMIC_ENTER_DELAY_MS = 70;

function seededValue(index: number, salt: number) {
  const x = Math.sin(index * 91.7 + salt * 37.3) * 10000;
  return x - Math.floor(x);
}

const stars = Array.from({ length: STAR_COUNT }, (_, index) => {
  const depth = seededValue(index, 1);
  const size =
    depth > 0.92 ? 2.4 : depth > 0.72 ? 1.7 : depth > 0.42 ? 1.15 : 0.75;
  const blur = depth < 0.22 ? 1.35 : depth > 0.88 ? 0.15 : 0;

  return {
    left: `${seededValue(index, 2) * 100}%`,
    top: `${seededValue(index, 3) * 100}%`,
    size,
    opacity: 0.28 + seededValue(index, 4) * 0.62,
    blur,
    duration: `${3.6 + seededValue(index, 5) * 4.8}s`,
    delay: `${seededValue(index, 6) * -7}s`,
    driftX: `${(seededValue(index, 7) - 0.5) * 8}px`,
    driftY: `${(seededValue(index, 8) - 0.5) * 6}px`,
    glow: seededValue(index, 9) > 0.74,
  };
});

const meteors = Array.from({ length: METEOR_COUNT }, (_, index) => {
  const duration = 4 + seededValue(index, 16) * 5;

  return {
    left: `${-20 + seededValue(index, 10) * 120}vw`,
    top: `${-8 + seededValue(index, 11) * 76}%`,
    delay: `${seededValue(index, 12) * duration * -1}s`,
    duration: `${duration.toFixed(1)}s`,
    length: `${Math.round(55 + seededValue(index, 13) * 45)}px`,
    height: `${(0.8 + seededValue(index, 14) * 0.7).toFixed(2)}px`,
    opacity: 0.55 + seededValue(index, 15) * 0.35,
    angle: "35deg",
    x: `${Math.round(500 + seededValue(index, 17) * 600)}px`,
    y: `${Math.round(400 + seededValue(index, 18) * 500)}px`,
  };
});

interface CosmicBackgroundProps {
  isDark: boolean;
}

export function CosmicBackground({ isDark }: CosmicBackgroundProps) {
  const [shouldRender, setShouldRender] = useState(isDark);
  const [isVisible, setIsVisible] = useState(isDark);

  useEffect(() => {
    if (isDark) {
      const timeout = window.setTimeout(() => {
        setShouldRender(true);
        window.requestAnimationFrame(() => setIsVisible(true));
      }, shouldRender ? 0 : COSMIC_ENTER_DELAY_MS);

      return () => window.clearTimeout(timeout);
    }

    setIsVisible(false);
    const timeout = window.setTimeout(() => setShouldRender(false), COSMIC_FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [isDark]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden${isVisible ? "" : " cosmic-paused"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${COSMIC_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 cosmic-base" />
        <div className="absolute inset-0 cosmic-nebula" />
        <div className="absolute inset-0 cosmic-vignette" />

        <div className="absolute inset-0 cosmic-star-field">
          {stars.map((star, index) => {
            const style: StarStyle = {
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              filter: star.blur > 0 ? `blur(${star.blur}px)` : undefined,
              "--star-opacity": star.opacity,
              "--twinkle-duration": star.duration,
              "--twinkle-delay": star.delay,
              "--drift-x": star.driftX,
              "--drift-y": star.driftY,
            };

            return (
              <span
                key={`star-${index}`}
                className={`cosmic-star${star.glow ? " cosmic-star-glow" : ""}`}
                style={style}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden cosmic-meteor-layer">
        {meteors.map((meteor, index) => {
          const style: MeteorStyle = {
            left: meteor.left,
            top: meteor.top,
            "--meteor-opacity": meteor.opacity,
            "--meteor-delay": meteor.delay,
            "--meteor-duration": meteor.duration,
            "--meteor-length": meteor.length,
            "--meteor-angle": meteor.angle,
            "--meteor-x": meteor.x,
            "--meteor-y": meteor.y,
            "--meteor-height": meteor.height,
          };

          return (
            <span
              key={`meteor-${index}`}
              className="cosmic-meteor"
              style={style}
            />
          );
        })}
      </div>

      <style>{`
        .cosmic-base {
          background:
            radial-gradient(ellipse at 50% 42%, rgba(53, 64, 104, 0.2) 0%, rgba(20, 24, 45, 0.14) 30%, transparent 62%),
            radial-gradient(circle at 16% 30%, rgba(255, 255, 255, 0.045) 0%, transparent 22rem),
            radial-gradient(circle at 82% 18%, rgba(149, 162, 255, 0.075) 0%, transparent 18rem),
            linear-gradient(180deg, #05070d 0%, #070913 54%, #05070d 100%);
        }

        .cosmic-nebula {
          background:
            radial-gradient(ellipse at 72% 68%, rgba(117, 128, 183, 0.12), transparent 34%),
            radial-gradient(ellipse at 28% 72%, rgba(255, 255, 255, 0.035), transparent 30%);
          mix-blend-mode: screen;
          opacity: 0.65;
        }

        .cosmic-vignette {
          background:
            linear-gradient(180deg, rgba(5, 7, 13, 0.2), transparent 22%, rgba(5, 7, 13, 0.5) 100%),
            radial-gradient(ellipse at center, transparent 32%, rgba(2, 3, 7, 0.74) 100%);
        }

        .cosmic-star-field {
          z-index: 2;
        }

        .cosmic-star {
          position: absolute;
          display: block;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 7px rgba(255, 255, 255, 0.24);
          animation:
            cosmic-twinkle var(--twinkle-duration) ease-in-out var(--twinkle-delay) infinite alternate,
            cosmic-drift 22s ease-in-out var(--twinkle-delay) infinite alternate;
          will-change: opacity, transform;
        }

        .cosmic-star-glow {
          box-shadow:
            0 0 7px rgba(255, 255, 255, 0.42),
            0 0 16px rgba(180, 190, 255, 0.2);
        }

        .cosmic-meteor-layer {
          pointer-events: none;
        }

        .cosmic-meteor {
          position: absolute;
          width: var(--meteor-length);
          height: var(--meteor-height);
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0),
            rgba(255,255,255,0.7),
            rgba(255,255,255,1)
          );
          filter: blur(0.12px);
          box-shadow:
            0 0 12px rgba(255,255,255,0.92),
            0 0 28px rgba(255,255,255,0.58),
            0 0 48px rgba(255,255,255,0.34);
          opacity: 0;
          transform: translate3d(0, 0, 0) rotate(var(--meteor-angle));
          transform-origin: left center;
          animation: cosmic-meteor var(--meteor-duration) ease-in-out var(--meteor-delay) infinite;
          will-change: transform, opacity;
        }

        .cosmic-meteor::before {
          content: "";
          position: absolute;
          right: -1px;
          top: 50%;
          width: 5px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 1);
          box-shadow:
            0 0 10px rgba(255, 255, 255, 0.95),
            0 0 22px rgba(255, 255, 255, 0.6),
            0 0 38px rgba(231, 236, 255, 0.36);
          transform: translateY(-50%);
        }

        .cosmic-paused .cosmic-star,
        .cosmic-paused .cosmic-meteor {
          animation-play-state: paused;
        }

        @keyframes cosmic-twinkle {
          0% { opacity: calc(var(--star-opacity) * 0.36); }
          45% { opacity: var(--star-opacity); }
          100% { opacity: calc(var(--star-opacity) * 0.62); }
        }

        @keyframes cosmic-drift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(var(--drift-x), var(--drift-y), 0); }
        }

        @keyframes cosmic-meteor {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(var(--meteor-angle));
          }
          12% {
            opacity: calc(var(--meteor-opacity) * 0.58);
          }
          28% {
            opacity: var(--meteor-opacity);
          }
          68% {
            opacity: calc(var(--meteor-opacity) * 0.82);
          }
          84% {
            opacity: 0;
            transform: translate3d(var(--meteor-x), var(--meteor-y), 0) rotate(var(--meteor-angle));
          }
          84.01%, 100% {
            opacity: 0;
            transform: translate3d(var(--meteor-x), var(--meteor-y), 0) rotate(var(--meteor-angle));
          }
        }

       @media (max-width: 640px) {
  .cosmic-star:nth-child(3n) {
    display: none;
  }
}
      `}</style>
    </div>
  );
}
