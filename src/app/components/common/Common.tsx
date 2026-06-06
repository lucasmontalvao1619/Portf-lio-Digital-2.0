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
        className="w-12 h-12 flex items-center justify-center border transition-all duration-200 cursor-default"
        style={{
          borderColor: isHovered ? "var(--foreground)" : "var(--border)",
          backgroundColor: isHovered ? "var(--foreground)" : "transparent",
        }}
      >
        <Icon style={{ width: 20, height: 20, color: isHovered ? "var(--primary-foreground)" : "var(--muted-foreground)" }} />
      </div>
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 font-mono text-[9px] whitespace-nowrap pointer-events-none z-30"
          style={{ background: "var(--foreground)", color: "var(--primary-foreground)" }}
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
