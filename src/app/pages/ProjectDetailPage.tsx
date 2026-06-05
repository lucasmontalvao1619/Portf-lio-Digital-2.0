import { useEffect, useRef } from "react";
import type React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Reveal } from "../components/common/Common";
import { PROJECT_DETAILS, PROJECT_GALLERY, PROJECT_GITHUB, PROJECT_IMAGES, PROJECT_LIVE, PROJECT_SLUGS, PROJECT_TECH } from "../data/content";
import type { OutletCtx } from "../data/content";

export function ProjectDetailPage() {
  const { isDark, lang, tr } = useOutletContext<OutletCtx>();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const scrollStartRef = useRef(0);

  const idx = PROJECT_SLUGS.indexOf(slug ?? "");

  useEffect(() => {
    if (idx === -1) navigate("/projetos", { replace: true });
  }, [idx, navigate]);

  if (idx === -1) return null;

  const details = PROJECT_DETAILS[idx][lang];
  const gallery = PROJECT_GALLERY[idx];
  const name    = tr.proj_names[idx];
  const desc    = tr.proj_descs[idx];
  const tech    = PROJECT_TECH[idx];
  const github  = PROJECT_GITHUB[idx];
  const live    = PROJECT_LIVE[idx];
  const hero    = PROJECT_IMAGES[idx];
  const num     = `0${idx + 1}`;

  const L = {
    back:        lang === "PT" ? "Voltar para Projetos" : "Back to Projects",
    breadcrumb:  lang === "PT" ? "Projetos" : "Projects",
    s01: lang === "PT" ? "Visão Geral"  : "Overview",
    s02: lang === "PT" ? "Problema"     : "Problem",
    s03: lang === "PT" ? "Solução"      : "Solution",
    s04: lang === "PT" ? "Arquitetura"  : "Architecture",
    s05: lang === "PT" ? "Galeria"      : "Gallery",
    s06: lang === "PT" ? "Aprendizados" : "Key Learnings",
    galleryHint: lang === "PT" ? "Arraste para navegar" : "Drag to scroll",
  };

  const SECTIONS: Array<
    { num: string; label: string; type: "text"; content: string } |
    { num: string; label: string; type: "list"; content: string[] } |
    { num: string; label: string; type: "gallery"; content: string[] }
  > = [
    { num: "01", label: L.s01, type: "text",    content: details.overview },
    { num: "02", label: L.s02, type: "text",    content: details.problem },
    { num: "03", label: L.s03, type: "text",    content: details.solution },
    { num: "04", label: L.s04, type: "text",    content: details.architecture },
    { num: "05", label: L.s05, type: "gallery", content: gallery },
    { num: "06", label: L.s06, type: "list",    content: details.learnings },
  ];

  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current  = e.pageX;
    scrollStartRef.current = galleryRef.current?.scrollLeft ?? 0;
    if (galleryRef.current) galleryRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !galleryRef.current) return;
    galleryRef.current.scrollLeft = scrollStartRef.current - (e.pageX - dragStartRef.current);
  };
  const onMouseUp = () => {
    isDraggingRef.current = false;
    if (galleryRef.current) galleryRef.current.style.cursor = "grab";
  };

  const borderMuted = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <div className="pt-14">

      <div className="max-w-6xl mx-auto px-6 pt-14 pb-12">

        <div className="flex items-center gap-2 mb-14"
          style={{ opacity: 0, animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
          <button onClick={() => navigate("/projetos")}
            className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase">
            {L.breadcrumb}
          </button>
          <span className="font-mono text-[10px] text-muted-foreground/25">/</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase truncate max-w-[200px]">{name}</span>
        </div>

        <div style={{ opacity: 0, animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 80ms both" }}>
          <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground/35 uppercase mb-6">{num}</p>
          <h1 className="mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,7vw,6.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--foreground)" }}>
            {name}
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl font-light flex-1">
              {desc}
            </p>
            <div className="flex flex-col gap-5 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5">{t}</span>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href={github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-primary-foreground text-xs font-mono hover:opacity-75 transition-opacity">
                  <Github size={12} strokeWidth={1.75} />
                  GitHub
                </a>
                {live && (
                  <a href={live} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors">
                    <ExternalLink size={12} strokeWidth={1.75} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-0"
        style={{ opacity: 0, animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 180ms both" }}>
        <div className="w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/7" }}>
          <img src={hero} alt={name} className="w-full h-full object-cover" draggable={false} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {SECTIONS.map((section) => (
          <div key={section.num}>
            <div style={{ borderTop: `1px solid ${borderMuted}`, marginTop: 0 }} />
            <Reveal delay={60}>
              <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-24 py-20 md:py-24">

                <div className="flex flex-col gap-1.5 md:pt-1">
                  <p className="font-mono text-[9px] tracking-[0.32em] text-muted-foreground/30 uppercase">
                    Section {section.num}
                  </p>
                  <p className="font-mono text-sm font-medium text-foreground">{section.label}</p>
                </div>

                <div>
                  {section.type === "text" && (
                    <p className="text-base md:text-[1.1rem] text-foreground/75 leading-[1.85] font-light">
                      {section.content}
                    </p>
                  )}

                  {section.type === "list" && (
                    <ul className="flex flex-col gap-5">
                      {section.content.map((item, li) => (
                        <li key={li} className="flex items-start gap-5">
                          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/35 shrink-0 pt-1.5">
                            {String(li + 1).padStart(2, "0")}
                          </span>
                          <p className="text-base text-foreground/75 leading-relaxed font-light">{item}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === "gallery" && (
                    <div className="flex flex-col gap-3">
                      <div
                        ref={galleryRef}
                        className="flex gap-3 overflow-x-auto pb-3 select-none"
                        style={{ cursor: "grab", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}>
                        {section.content.map((imgUrl, gi) => (
                          <div key={gi} className="shrink-0 overflow-hidden bg-muted"
                            style={{ width: "clamp(260px, 44vw, 540px)", aspectRatio: "16/9" }}>
                            <img
                              src={imgUrl}
                              alt={`${name} — ${gi + 1}`}
                              loading="lazy"
                              draggable={false}
                              className="w-full h-full object-cover pointer-events-none"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground/30 uppercase">
                        {L.galleryHint}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div style={{ borderTop: `1px solid ${borderMuted}` }} />
        <div className="pt-16">
          <Reveal>
            <button
              onClick={() => navigate("/projetos")}
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase group">
              <span className="text-base transition-transform duration-200 group-hover:-translate-x-1">←</span>
              {L.back}
            </button>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
