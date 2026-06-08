import { Reveal, SectionHeader } from "../common/Common";
import type { Tr } from "../../data/content";

export function EducationSection({ tr }: { tr: Tr }) {
  return (
    <section id="formacao" className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={tr.s_education} />
        <Reveal delay={60} className="-mt-8">
          <div className="relative">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-border/80 lg:block" />
            <div className="pointer-events-none absolute bottom-0 left-4 top-5 w-px bg-border/70 sm:hidden" />
            <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {tr.education.map((education, index) => (
                <div
                  key={education.title}
                  className="relative flex h-full min-h-[21rem] flex-col border bg-card p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-card hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:min-h-[23rem]"
                  style={{
                    opacity: 0,
                    animation: `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80 + 80}ms both`,
                    borderColor: education.featured ? "color-mix(in srgb, var(--foreground) 28%, transparent)" : "var(--border)",
                  }}
                >
                  <div
                    className="absolute left-4 top-4 z-10 h-2 w-2 rounded-full border bg-background lg:left-1/2 lg:-translate-x-1/2"
                    style={{
                      borderColor: education.featured ? "var(--foreground)" : "var(--border)",
                      boxShadow: "0 0 0 5px var(--background)",
                    }}
                  />
                  <div className="mb-7 flex min-h-8 flex-wrap items-start justify-between gap-3 pl-6 lg:pl-0 lg:pt-7">
                    <span className="inline-flex w-fit items-center whitespace-nowrap border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {education.badge}
                    </span>
                    {education.highlightLabel && (
                      <span className="inline-flex w-fit items-center whitespace-nowrap border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground">
                        {education.highlightLabel}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col pl-6 lg:pl-0">
                    <div className="space-y-3">
                      <h3 className="text-base font-medium leading-snug text-foreground">{education.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/75">{education.period}</p>
                        {education.ongoing && (
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/40"
                            style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
                          />
                        )}
                      </div>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{education.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
