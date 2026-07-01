import type React from "react";
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

interface HeroSectionProps {
  isDark: boolean;
  tr: Tr;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export function HeroSection({ isDark, tr, onProjectsClick, onContactClick }: HeroSectionProps) {
  const gridLine = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <section id="inicio" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right,${gridLine} 1px,transparent 1px),linear-gradient(to bottom,${gridLine} 1px,transparent 1px)`,
          backgroundSize: "155px 110px",
          opacity: isDark ? 0.72 : 1,
        }}
      />
      {CORNER_CLASSES.map((className) => (
        <div key={className} className={`absolute z-[2] w-5 h-5 border-foreground/10 pointer-events-none ${className}`} />
      ))}

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2.5 mb-10 afu">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "var(--foreground)", opacity: 0.45, animation: "pulse-dot 2.5s ease-in-out infinite" }}
          />
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{tr.status}</p>
        </div>

        <h1
          className="leading-none mb-8 afu d100"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem,9vw,9rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          Lucas Montalvão
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-xs mx-auto mb-14 leading-relaxed font-light afu d200">
          {tr.tagline}
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap afu d300">
          <button
            type="button"
            onClick={onProjectsClick}
            className="px-6 py-2.5 bg-foreground text-primary-foreground text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {tr.btn_projects}
          </button>
          <a
            href={cvUrl}
            download="Curriculo_LucasMontalvao.pdf"
            className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-2"
          >
            <Download size={14} strokeWidth={1.75} />
            {tr.btn_cv}
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            {tr.btn_contact}
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
    </section>
  );
}
