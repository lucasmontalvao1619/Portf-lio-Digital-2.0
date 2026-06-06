import { Reveal, SectionHeader } from "../common/Common";
import type { Tr } from "../../data/content";

export function EducationSection({ tr }: { tr: Tr }) {
  return (
    <section id="formacao" className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={tr.s_education} />
        <Reveal delay={60} className="-mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tr.education.map((education, index) => (
              <div
                key={education.title}
                className="border border-border p-7 flex flex-col gap-3 transition-colors duration-300 hover:bg-muted/30"
                style={{ opacity: 0, animation: `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 80 + 80}ms both` }}
              >
                <p className="text-sm font-medium text-foreground leading-snug">{education.title}</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60">{education.period}</p>
                  {education.ongoing && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/40"
                      style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{education.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
