import { useOutletContext } from "react-router";
import { ProjectGalleryCard } from "../components/projects/ProjectGalleryCard";
import { Reveal } from "../components/common/Common";
import { getLocalizedProjects } from "../data/content";
import type { OutletCtx } from "../data/content";

export function ProjectsPage() {
  const { tr } = useOutletContext<OutletCtx>();
  const projects = getLocalizedProjects(tr);

  return (
    <div className="pt-28 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-20">
          <h1 className="text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,8vw,7rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {tr.s_projects}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mt-5">{tr.projects_subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project) => (
            <ProjectGalleryCard
              key={project.slug}
              num={project.num}
              name={project.name}
              desc={project.desc}
              tech={project.tech}
              image={project.image}
              alt={project.alt}
              github={project.github}
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
