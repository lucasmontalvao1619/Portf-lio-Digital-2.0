import { useOutletContext } from "react-router";
import { ProjectGalleryCard } from "../components/projects/ProjectGalleryCard";
import { Reveal } from "../components/common/Common";
import { PROJECT_ALT, PROJECT_GITHUB, PROJECT_IMAGES, PROJECT_LIVE, PROJECT_SLUGS, PROJECT_TECH } from "../data/content";
import type { OutletCtx } from "../data/content";

export function ProjectsPage() {
  const { tr } = useOutletContext<OutletCtx>();

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
          {[0, 1, 2, 3].map((i) => (
            <ProjectGalleryCard
              key={i}
              num={`0${i + 1}`}
              name={tr.proj_names[i]}
              desc={tr.proj_descs[i]}
              tech={PROJECT_TECH[i]}
              image={PROJECT_IMAGES[i]}
              alt={PROJECT_ALT[i]}
              github={PROJECT_GITHUB[i]}
              live={PROJECT_LIVE[i]}
              githubLabel={tr.github_btn}
              liveLabel={tr.live_btn}
              delay={i * 80}
              slug={PROJECT_SLUGS[i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
