import { BEYOND_CARDS } from "../../data/content";
import { Reveal, SectionHeader } from "../common/Common";
import type { Lang, Tr } from "../../data/content";

interface BeyondCodeSectionProps {
  lang: Lang;
  tr: Tr;
}

export function BeyondCodeSection({ lang, tr }: BeyondCodeSectionProps) {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={tr.s_beyond} subtitle={tr.beyond_subtitle} />

        <Reveal delay={60} className="-mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BEYOND_CARDS[lang].map((card) => {
              const Icon = card.Icon;

              return (
                <div
                  key={card.num}
                  className="border border-border p-8 md:p-10 flex flex-col gap-6 cursor-default
                    hover:-translate-y-1 hover:border-foreground/20
                    transition-all duration-300 ease-out"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={16} strokeWidth={1.25} className="text-muted-foreground/40" />
                    <span className="font-mono text-[9px] tracking-[0.28em] text-muted-foreground/30 uppercase">
                      {card.num}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3
                      className="font-medium text-foreground leading-snug"
                      style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-border flex flex-col gap-3">
                    <p className="font-mono text-[9px] tracking-[0.24em] text-muted-foreground/35 uppercase">
                      {tr.beyond_highlights_label}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {card.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
                          <span className="text-xs text-muted-foreground/70">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-center text-sm text-muted-foreground/40 mt-16 max-w-xl mx-auto leading-relaxed font-light italic">
            {tr.beyond_footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
