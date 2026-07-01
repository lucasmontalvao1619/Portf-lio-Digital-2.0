import { useState } from "react";
import { useOutletContext } from "react-router";
import { Reveal } from "../components/common/Common";
import { ProjectGalleryCard } from "../features/projects/ProjectGalleryCard";
import { getLocalizedProjects } from "../data/content";
import type { OutletCtx, ProjectFilter } from "../data/content";

const PROJECT_FILTERS: readonly ProjectFilter[] = ["all", "fullstack", "frontend", "research", "ui"];

export function ProjectsPage() {
  const { tr } = useOutletContext<OutletCtx>();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const projects = getLocalizedProjects(tr);
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <div className="pt-28 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-20">
          <h1 className="text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,8vw,7rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {tr.s_projects}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mt-5">{tr.projects_subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {PROJECT_FILTERS.map((filter) => {
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter)}
                  className="border px-3 py-1.5 font-mono text-[11px] transition-colors"
                  style={{
                    borderColor: active ? "var(--foreground)" : "var(--border)",
                    color: active ? "var(--background)" : "var(--muted-foreground)",
                    background: active ? "var(--foreground)" : "transparent",
                  }}
                >
                  {tr.project_filters[filter]}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {filteredProjects.map((project) => (
            <ProjectGalleryCard
              key={project.slug}
              num={project.num}
              name={project.name}
              desc={project.desc}
              tech={project.tech}
              image={project.image}
              alt={project.alt}
              github={project.github}
              repositoryLabel={project.repositoryLabel}
              status={project.status}
              live={project.live}
              githubLabel={tr.github_btn}
              liveLabel={tr.live_btn}
              delay={project.index * 80}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
