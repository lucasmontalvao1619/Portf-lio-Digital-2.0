import { Reveal, SectionHeader } from "../common/Common";
import type { Tr } from "../../data/content";

export function ServicesSection({ tr }: { tr: Tr }) {
  return (
    <section id="servicos" className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={tr.s_services} />
        <Reveal delay={60} className="-mt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {tr.services.map((service, index) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-[20px] border p-7 shadow-[0_10px_32px_rgba(0,0,0,0.025)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.055)] dark:shadow-[0_10px_32px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.22)] md:p-8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.12)), var(--background)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="absolute left-0 top-7 h-12 w-px opacity-20 transition-all duration-500 group-hover:h-16 group-hover:opacity-35"
                  style={{ background: "linear-gradient(180deg, transparent, var(--foreground), transparent)" }}
                />
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-[10px] leading-none text-muted-foreground/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-medium leading-snug text-foreground">{service.title}</p>
                </div>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
