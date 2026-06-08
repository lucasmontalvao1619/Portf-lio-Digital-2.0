import type React from "react";

type PortfolioIconProps = {
  style?: React.CSSProperties;
};

export const CSharpIcon = ({ style }: PortfolioIconProps) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" style={style}>
    <path
      d="M16 3.25 27.05 9.6v12.8L16 28.75 4.95 22.4V9.6L16 3.25Z"
      fill="currentColor"
      opacity="0.1"
    />
    <path
      d="M16 3.25 27.05 9.6v12.8L16 28.75 4.95 22.4V9.6L16 3.25Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <text
      x="16"
      y="18.8"
      fill="currentColor"
      fontFamily="var(--font-mono)"
      fontSize="8.2"
      fontWeight="800"
      letterSpacing="-0.45"
      textAnchor="middle"
    >
      C#
    </text>
  </svg>
);

export const AzureIcon = ({ style }: PortfolioIconProps) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" style={style}>
    <path d="M13.25 4.75 5.5 25.1h6.85L25.9 4.75H13.25Z" fill="currentColor" opacity="0.32" />
    <path d="M18.2 12.6 11.95 25.1h14.7L18.2 12.6Z" fill="currentColor" />
    <path d="M13.25 4.75 18.2 12.6 11.95 25.1H5.5L13.25 4.75Z" fill="currentColor" opacity="0.72" />
  </svg>
);

export const SqlServerIcon = ({ style }: PortfolioIconProps) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" style={style}>
    <ellipse cx="16" cy="7.8" rx="9.5" ry="4.35" fill="currentColor" opacity="0.16" />
    <path
      d="M6.5 7.8v14.4c0 2.4 4.25 4.35 9.5 4.35s9.5-1.95 9.5-4.35V7.8"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse cx="16" cy="7.8" rx="9.5" ry="4.35" stroke="currentColor" strokeWidth="1.9" />
    <path
      d="M6.5 14.95c0 2.4 4.25 4.35 9.5 4.35s9.5-1.95 9.5-4.35"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

export const PowerBIIcon = ({ style }: PortfolioIconProps) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" style={style}>
    <rect x="5.4" y="15.5" width="5.6" height="10.8" rx="2" fill="currentColor" opacity="0.38" />
    <rect x="13.2" y="9.2" width="5.6" height="17.1" rx="2" fill="currentColor" opacity="0.68" />
    <rect x="21" y="5.7" width="5.6" height="20.6" rx="2" fill="currentColor" />
    <path
      d="M6.6 26.3h18.7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.32"
    />
  </svg>
);

export function GlobeIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
export function SunIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
export function MoonIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
