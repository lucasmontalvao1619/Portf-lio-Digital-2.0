import { useState } from "react";
import type React from "react";
import type { SkillIcon } from "../../data/content";
import { useInView } from "../../lib/useInView";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface TechIconButtonProps {
  name: string;
  Icon: SkillIcon;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView(0.07);

  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="border-t border-border" />
    </div>
  );
}

export function TechIconButton({ name, Icon }: TechIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className="flex h-14 w-14 cursor-default items-center justify-center rounded-[14px] border transition-all duration-300 ease-out"
        style={{
          borderColor: isHovered ? "var(--skills-icon-hover-border)" : "var(--border)",
          background: isHovered ? "var(--skills-icon-hover-background)" : "var(--skills-icon-background)",
          boxShadow: isHovered ? "var(--skills-icon-hover-shadow)" : "var(--skills-icon-shadow)",
          transform: isHovered ? "scale(1.05) translateY(-1px)" : "scale(1)",
        }}
      >
        <Icon style={{ width: 23, height: 23, color: isHovered ? "var(--foreground)" : "var(--muted-foreground)" }} />
      </div>
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[9px] pointer-events-none"
          style={{
            background: "var(--foreground)",
            color: "var(--primary-foreground)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.14)",
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal className="mb-16 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{title}</p>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">{subtitle}</p>
      )}
    </Reveal>
  );
}
