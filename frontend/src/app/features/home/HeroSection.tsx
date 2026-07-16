import type React from "react";
import type { CSSProperties } from "react";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import cvUrl from "../../../../assets/Curriculo_LucasMontalvao_2-1.pdf?url";
import { CONTACT_LINKS, isExternalLink } from "../../data/content";
import type { ContactIconKey, Tr } from "../../data/content";

const CORNER_CLASSES = [
  "top-[88px] left-8 md:left-14 border-l border-t",
  "top-[88px] right-8 md:right-14 border-r border-t",
  "bottom-14 left-8 md:left-14 border-l border-b",
  "bottom-14 right-8 md:right-14 border-r border-b",
] as const;

const SOCIAL_ICONS: Record<ContactIconKey, React.ReactNode> = {
  github: <Github size={15} strokeWidth={1.7} />,
  linkedin: <Linkedin size={15} strokeWidth={1.7} />,
  mail: <Mail size={15} strokeWidth={1.7} />,
  phone: <Phone size={15} strokeWidth={1.7} />,
};

type HeroStarStyle = CSSProperties & {
  "--hero-star-opacity": number;
  "--hero-star-duration": string;
  "--hero-star-delay": string;
};

type HeroSectionStyle = CSSProperties & {
  "--locke-hero-opacity": number;
};

const HERO_STAR_COUNT = 36;
const HERO_THEME_FADE_MS = 420;

function seededHeroValue(index: number, salt: number) {
  const x = Math.sin(index * 83.3 + salt * 29.9) * 10000;
  return x - Math.floor(x);
}

const heroStars = Array.from({ length: HERO_STAR_COUNT }, (_, index) => {
  const depth = seededHeroValue(index, 1);
  const size = depth > 0.82 ? 2 : depth > 0.52 ? 1.35 : 0.8;

  return {
    left: `${seededHeroValue(index, 2) * 100}%`,
    top: `${8 + seededHeroValue(index, 3) * 64}%`,
    size,
    opacity: 0.22 + seededHeroValue(index, 4) * 0.48,
    duration: `${4 + seededHeroValue(index, 5) * 5}s`,
    delay: `${seededHeroValue(index, 6) * -7}s`,
  };
});

interface HeroSectionProps {
  isDark: boolean;
  tr: Tr;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export function HeroSection({ isDark, tr, onProjectsClick, onContactClick }: HeroSectionProps) {
  const gridLine = isDark ? "rgba(255,255,255,0.085)" : "rgba(0,0,0,0.07)";
  const sectionStyle: HeroSectionStyle = {
    "--locke-hero-opacity": isDark ? 1 : 0,
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden locke-hero-bg"
      style={sectionStyle}
    >
      <div
        className={`absolute inset-0 ${isDark ? "z-[3]" : "z-[1]"} pointer-events-none`}
        style={{
          backgroundImage: `linear-gradient(to right,${gridLine} 1px,transparent 1px),linear-gradient(to bottom,${gridLine} 1px,transparent 1px)`,
          backgroundSize: "155px 110px",
          opacity: isDark ? 0.72 : 1,
          transition: `opacity ${HERO_THEME_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      />
      {CORNER_CLASSES.map((className) => (
        <div key={className} className={`absolute z-[2] w-5 h-5 border-foreground/10 pointer-events-none ${className}`} />
      ))}

      <div
        className={`hero-star-field absolute inset-0 z-[4] pointer-events-none${isDark ? "" : " hero-stars-paused"}`}
        style={{
          opacity: isDark ? 1 : 0,
          transition: `opacity ${HERO_THEME_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
        aria-hidden="true"
      >
        {heroStars.map((star, index) => {
          const style: HeroStarStyle = {
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--hero-star-opacity": star.opacity,
            "--hero-star-duration": star.duration,
            "--hero-star-delay": star.delay,
          };

          return <span key={`hero-star-${index}`} className="hero-star" style={style} />;
        })}
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2.5 mb-10 afu">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "var(--foreground)", opacity: 0.45, animation: "pulse-dot 2.5s ease-in-out infinite" }}
          />
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{tr.hero.status}</p>
        </div>

        <h1
          className="leading-none mb-8 afu d100"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem,9vw,9rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          Lucas Montalvão
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-xs mx-auto mb-14 leading-relaxed font-light afu d200">
          {tr.hero.tagline}
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap afu d300">
          <button
            type="button"
            onClick={onProjectsClick}
            className="px-6 py-2.5 bg-foreground text-primary-foreground text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {tr.hero.ctaProjects}
          </button>
          <a
            href={cvUrl}
            download="Curriculo_LucasMontalvao.pdf"
            className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-2"
          >
            <Download size={14} strokeWidth={1.75} />
            {tr.hero.ctaDownloadCv}
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            {tr.hero.ctaContact}
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 afu d450">
          {CONTACT_LINKS.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={isExternalLink(href) ? "_blank" : undefined}
              rel={isExternalLink(href) ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {SOCIAL_ICONS[icon]}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 afu d450">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-border mx-auto" />
      </div>

      <style>{`
        .locke-hero-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image: url("/assets/locke-bg.jpg");
          background-size: auto 126%;
          background-position: right 45%;
          background-repeat: no-repeat;
          opacity: calc(var(--locke-hero-opacity) * 0.48);
          transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .locke-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(5, 7, 13, 0.88) 0%, rgba(5, 7, 13, 0.5) 48%, rgba(5, 7, 13, 0.7) 100%),
            linear-gradient(180deg, rgba(5, 7, 13, 0.62) 0%, rgba(5, 7, 13, 0.22) 42%, rgba(5, 7, 13, 0.8) 100%);
          opacity: var(--locke-hero-opacity);
          transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-star {
          position: absolute;
          display: block;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.24);
          opacity: var(--hero-star-opacity);
          animation: hero-star-twinkle var(--hero-star-duration) ease-in-out var(--hero-star-delay) infinite alternate;
        }

        @keyframes hero-star-twinkle {
          from { opacity: calc(var(--hero-star-opacity) * 0.42); }
          to { opacity: var(--hero-star-opacity); }
        }

        .hero-stars-paused .hero-star {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .hero-star-field .hero-star:nth-child(2n) {
            display: none;
          }

          .locke-hero-bg::before {
            background-size: auto 118%;
            background-position: 74% center;
            opacity: calc(var(--locke-hero-opacity) * 0.4);
          }

          .locke-hero-bg::after {
            background:
              linear-gradient(90deg, rgba(5, 7, 13, 0.94) 0%, rgba(5, 7, 13, 0.64) 58%, rgba(5, 7, 13, 0.9) 100%),
              linear-gradient(180deg, rgba(5, 7, 13, 0.74) 0%, rgba(5, 7, 13, 0.36) 42%, rgba(5, 7, 13, 0.88) 100%);
          }
        }
      `}</style>
    </section>
  );
}
