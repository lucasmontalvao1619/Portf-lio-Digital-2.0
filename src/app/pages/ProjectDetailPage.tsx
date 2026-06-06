import { useEffect, useMemo } from "react";
import type React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "../components/common/Common";
import { findLocalizedProject, getProjectDetails } from "../data/content";
import { useHorizontalDrag } from "../lib/useHorizontalDrag";
import type { Lang, OutletCtx, ProjectDetails, ProjectSection } from "../data/content";

function getProjectLabels(lang: Lang) {
  return {
    back: lang === "PT" ? "Voltar para Projetos" : "Back to Projects",
    breadcrumb: lang === "PT" ? "Projetos" : "Projects",
    s01: lang === "PT" ? "Visão Geral" : "Overview",
    s02: lang === "PT" ? "Problema" : "Problem",
    s03: lang === "PT" ? "Solução" : "Solution",
    s04: lang === "PT" ? "Arquitetura" : "Architecture",
    s05: lang === "PT" ? "Galeria" : "Gallery",
    s06: lang === "PT" ? "Aprendizados" : "Key Learnings",
    galleryHint: lang === "PT" ? "Arraste para navegar" : "Drag to scroll",
  };
}

function buildProjectSections(
  details: ProjectDetails,
  gallery: readonly string[],
  labels: ReturnType<typeof getProjectLabels>,
): ProjectSection[] {
  return [
    { num: "01", label: labels.s01, type: "text", content: details.overview },
    { num: "02", label: labels.s02, type: "text", content: details.problem },
    { num: "03", label: labels.s03, type: "text", content: details.solution },
    { num: "04", label: labels.s04, type: "text", content: details.architecture },
    { num: "05", label: labels.s05, type: "gallery", content: gallery },
    { num: "06", label: labels.s06, type: "list", content: details.learnings },
  ];
}

export function ProjectDetailPage() {
  const { isDark, lang, tr } = useOutletContext<OutletCtx>();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const galleryDrag = useHorizontalDrag<HTMLDivElement>();

  const project = useMemo(() => findLocalizedProject(slug, tr), [slug, tr]);

  useEffect(() => {
    if (!project) {
      navigate("/projetos", { replace: true });
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const labels = getProjectLabels(lang);
  const details = getProjectDetails(project, lang);
  const sections = buildProjectSections(details, project.gallery, labels);
  const borderMuted = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <div className="pt-14">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-12">
        <div
          className="flex items-center gap-2 mb-14"
          style={{ opacity: 0, animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <button
            type="button"
            onClick={() => navigate("/projetos")}
            className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase"
          >
            {labels.breadcrumb}
          </button>
          <span className="font-mono text-[10px] text-muted-foreground/25">/</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase truncate max-w-[200px]">{project.name}</span>
        </div>

        <div style={{ opacity: 0, animation: "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 80ms both" }}>
          <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground/35 uppercase mb-6">{project.num}</p>
          <h1
            className="mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,7vw,6.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--foreground)" }}
          >
            {project.name}
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl font-light flex-1">
              {project.desc}
            </p>
            <div className="flex flex-col gap-5 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5">{tech}</span>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-primary-foreground text-xs font-mono hover:opacity-75 transition-opacity"
                >
                  <Github size={12} strokeWidth={1.75} />
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    <ExternalLink size={12} strokeWidth={1.75} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-6 mb-0"
        style={{ opacity: 0, animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 180ms both" }}
      >
        <div className="w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/7" }}>
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" draggable={false} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {sections.map((section) => (
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
                      {section.content.map((item, index) => (
                        <li key={item} className="flex items-start gap-5">
                          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/35 shrink-0 pt-1.5">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="text-base text-foreground/75 leading-relaxed font-light">{item}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === "gallery" && (
                    <div className="flex flex-col gap-3">
                      <div
                        ref={galleryDrag.ref}
                        className="flex gap-3 overflow-x-auto pb-3 select-none"
                        style={{ cursor: "grab", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                        onMouseDown={galleryDrag.onMouseDown}
                        onMouseMove={galleryDrag.onMouseMove}
                        onMouseUp={galleryDrag.onMouseUp}
                        onMouseLeave={galleryDrag.onMouseLeave}
                      >
                        {section.content.map((imageUrl, index) => (
                          <div
                            key={imageUrl}
                            className="shrink-0 overflow-hidden bg-muted"
                            style={{ width: "clamp(260px, 44vw, 540px)", aspectRatio: "16/9" }}
                          >
                            <img
                              src={imageUrl}
                              alt={`${project.name} — ${index + 1}`}
                              loading="lazy"
                              draggable={false}
                              className="w-full h-full object-cover pointer-events-none"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground/30 uppercase">
                        {labels.galleryHint}
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
              type="button"
              onClick={() => navigate("/projetos")}
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase group"
            >
              <span className="text-base transition-transform duration-200 group-hover:-translate-x-1">←</span>
              {labels.back}
            </button>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
