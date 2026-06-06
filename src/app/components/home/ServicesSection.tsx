import { Reveal, SectionHeader } from "../common/Common";
import type { Tr } from "../../data/content";

export function ServicesSection({ tr }: { tr: Tr }) {
  return (
    <section id="servicos" className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={tr.s_services} />
        <Reveal delay={60} className="-mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {tr.services.map((service) => (
              <div key={service.title}>
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="font-mono text-muted-foreground/40 text-sm leading-snug shrink-0 mt-0.5">✦</span>
                  <p className="text-sm font-medium text-foreground leading-snug">{service.title}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-[1.35rem]">{service.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
