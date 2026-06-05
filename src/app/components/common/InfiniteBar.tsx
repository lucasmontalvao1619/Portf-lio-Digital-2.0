import type React from "react";
import { INFINITE_BAR_REPEATS } from "../../data/content";

export function InfiniteBar({ items, duration }: { items: readonly string[]; duration: string }) {
  return (
    <div className="infinite-bar border-y border-border overflow-hidden select-none" aria-hidden="true">
      <div
        className="infinite-bar-track flex w-max whitespace-nowrap py-4"
        style={{ "--infinite-bar-duration": duration } as React.CSSProperties}
      >
        {Array.from({ length: INFINITE_BAR_REPEATS }, (_, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0">
            {items.map((item, itemIndex) => (
              <span key={`${groupIndex}-${itemIndex}`} className="inline-flex items-center">
                <span className="font-mono text-xs text-muted-foreground px-5">{item}</span>
                <span className="text-[10px]" style={{ color: "var(--border)" }}>Â·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
