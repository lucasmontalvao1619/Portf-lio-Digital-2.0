import { Reveal, TechIconButton } from "../../components/common/Common";
import { SKILL_CARDS } from "../../data/content";
import type { Tr } from "../../data/content";

export function SkillsSection({ tr }: { tr: Tr }) {
  return (
    <section id="habilidades" className="py-24 md:py-36">
      <Reveal delay={60}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-[24px] border px-6 py-12 sm:px-8 md:px-12 md:py-16"
            style={{
              background: "var(--skills-shell-background)",
              borderColor: "var(--border)",
              boxShadow: "var(--skills-shell-shadow)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.34]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0, transparent 72px, var(--border) 73px, transparent 74px), linear-gradient(0deg, transparent 0, transparent 72px, var(--border) 73px, transparent 74px)",
                maskImage: "radial-gradient(circle at 22% 8%, black, transparent 58%)",
              }}
            />
            <div
              className="pointer-events-none absolute -right-24 top-12 h-56 w-56 rounded-full border"
              style={{ borderColor: "var(--border)" }}
            />
            <div
              className="pointer-events-none absolute bottom-10 left-8 h-px w-56"
              style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
            />

            <div className="relative">
              <div className="mb-12 text-center md:mb-16">
                <h2 className="font-display text-2xl font-medium text-foreground md:text-3xl">{tr.skills.title}</h2>
                <div className="mx-auto mt-5 h-px w-24 bg-foreground/25" />
                {tr.skills.subtitle && (
                  <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-muted-foreground">{tr.skills.subtitle}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {SKILL_CARDS.map((card, index) => {
                  const CategoryIcon = card.catIcon;

                  return (
                    <div
                      key={tr.skills.categories[index]}
                      className="group rounded-[20px] border p-7 shadow-[var(--skills-card-shadow)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.24)] sm:p-8 md:p-10"
                      style={{
                        background: "var(--skills-card-background)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="mb-9 flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 group-hover:border-foreground/20"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--skills-category-icon-background)",
                          }}
                        >
                          <CategoryIcon size={15} strokeWidth={1.5} className="text-muted-foreground" />
                        </span>
                        <p className="font-mono text-[10px] tracking-[0.26em] text-muted-foreground/75 uppercase">
                          {tr.skills.categories[index]}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {card.items.map((item) => (
                          <TechIconButton key={item.name} name={item.name} Icon={item.Icon} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
