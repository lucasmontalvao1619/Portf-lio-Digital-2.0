import { Reveal, SectionHeader } from "../common/Common";
import type { Tr } from "../../data/content";

export function AboutSection({ tr }: { tr: Tr }) {
  return (
    <section id="sobre" className="py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader title={tr.s_about} />
        <Reveal delay={80}>
          <div className="space-y-6">
            {tr.about_text.split(/\n\s*\n/).map((paragraph) => (
              <p
                key={paragraph}
                className="font-sans font-light text-foreground leading-[1.72]"
                style={{ fontSize: "clamp(1.15rem,2.4vw,1.45rem)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
