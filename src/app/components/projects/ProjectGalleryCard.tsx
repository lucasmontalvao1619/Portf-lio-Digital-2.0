import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useInView } from "../../lib/useInView";

export function ProjectGalleryCard({ num, name, desc, tech, image, alt, github, live, githubLabel, liveLabel, delay, slug }: {
  num: string; name: string; desc: string; tech: string[]; image: string; alt: string;
  github: string; live: string; githubLabel: string; liveLabel: string; delay: number; slug: string;
}) {
  const { ref, inView } = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div ref={ref}
      onClick={() => navigate(`/projetos/${slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-border overflow-hidden cursor-pointer"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}>
      <div className="aspect-video overflow-hidden bg-muted">
        <img src={image} alt={alt} loading="lazy" className="w-full h-full object-cover"
          style={{ transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
      </div>
      <div className="p-7 md:p-8 flex flex-col gap-4">
        <div>
          <p className="font-mono text-[9px] tracking-widest text-muted-foreground/40 mb-3">{num}</p>
          <h3 className="font-medium text-foreground leading-snug" style={{ fontSize: "clamp(1rem,1.6vw,1.2rem)" }}>{name}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span key={t} className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-5 pt-1 border-t border-border mt-1">
          <a href={github} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group/g pt-4">
            <Github size={12} strokeWidth={1.75} />
            <span>{githubLabel}</span>
            <ArrowUpRight size={10} className="opacity-0 group-hover/g:opacity-100 transition-opacity" />
          </a>
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group/l pt-4">
              <ExternalLink size={12} strokeWidth={1.75} />
              <span>{liveLabel}</span>
              <ArrowUpRight size={10} className="opacity-0 group-hover/l:opacity-100 transition-opacity" />
            </a>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground/40 pt-4 group-hover:text-muted-foreground transition-colors duration-200">
            Ver projeto <ArrowUpRight size={9} />
          </span>
        </div>
      </div>
    </div>
  );
}
