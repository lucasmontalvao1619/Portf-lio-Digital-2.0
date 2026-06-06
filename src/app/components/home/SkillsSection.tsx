import { Reveal, SectionHeader, TechIconButton } from "../common/Common";
import { SKILL_CARDS } from "../../data/content";
import type { Tr } from "../../data/content";

export function SkillsSection({ tr }: { tr: Tr }) {
  return (
    <section id="habilidades" className="py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title={tr.s_skills} subtitle={tr.skills_subtitle} />
      </div>
      <Reveal delay={60}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: "1px solid var(--border)" }}>
            {SKILL_CARDS.map((card, index) => {
              const CategoryIcon = card.catIcon;

              return (
                <div
                  key={tr.skill_cats[index]}
                  className="p-10 md:p-12 transition-colors duration-300 hover:bg-muted/30"
                  style={{
                    borderRight: index % 2 === 0 ? "1px solid var(--border)" : undefined,
                    borderBottom: index < 2 ? "1px solid var(--border)" : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-8">
                    <CategoryIcon size={14} strokeWidth={1.5} className="text-muted-foreground" />
                    <p className="font-mono text-[9px] tracking-[0.28em] text-muted-foreground/60 uppercase">
                      {tr.skill_cats[index]}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <TechIconButton key={item.name} name={item.name} Icon={item.Icon} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
