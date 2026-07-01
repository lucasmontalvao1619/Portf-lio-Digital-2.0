import { TRAJ_YEARS } from "../../data/content";
import { SectionHeader } from "../../components/common/Common";
import type { Tr } from "../../data/content";

interface JourneySectionProps {
  isDark: boolean;
  tr: Tr;
}

export function JourneySection({ isDark, tr }: JourneySectionProps) {
  const lineColor = isDark ? "rgba(255,255,255,0.14)" : "#d9d9d9";
  const dotColor = isDark ? "rgba(255,255,255,0.18)" : "#d9d9d9";
  const inactiveYearColor = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";

  return (
    <section id="trajetoria" className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={tr.s_traj} />
        <div className="max-w-2xl mx-auto -mt-8">
          <div className="relative">
            <div className="absolute top-2 bottom-2 w-px" style={{ left: "5.5rem", background: lineColor }} />
            <div className="flex flex-col">
              {TRAJ_YEARS.map((year, index) => {
                const isToday = year === "";

                return (
                  <div
                    key={`${year || "today"}-${index}`}
                    className="relative flex items-start group"
                    style={{ paddingTop: index === 0 ? 0 : "3.5rem", opacity: 0, animation: `fade-up 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 90 + 100}ms both` }}
                  >
                    <div className="shrink-0 text-right pr-5 pt-0.5" style={{ width: "5.5rem" }}>
                      <span className="font-mono text-xs" style={{ color: isToday ? "var(--foreground)" : inactiveYearColor }}>
                        {isToday ? tr.traj_today : year}
                      </span>
                    </div>
                    <div className="relative z-10 shrink-0" style={{ width: 0 }}>
                      <div
                        className="absolute transition-all duration-300 group-hover:scale-125"
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          border: isToday ? "1.5px solid var(--foreground)" : `1.5px solid ${dotColor}`,
                          background: isToday ? "var(--foreground)" : "var(--background)",
                          top: 2,
                          left: -5,
                        }}
                      />
                    </div>
                    <div className="pl-8">
                      <p
                        className="text-sm font-medium leading-snug mb-1.5 transition-colors duration-300 group-hover:text-foreground"
                        style={{ color: "var(--foreground)" }}
                      >
                        {tr.traj_labels[index]}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {tr.traj_descs[index]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
