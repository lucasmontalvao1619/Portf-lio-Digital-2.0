import type React from "react";


export const CSharpIcon = ({ style }: { style?: React.CSSProperties }) => (
  <span style={{ fontSize: "9px", fontWeight: 800, fontFamily: "var(--font-mono)", lineHeight: 1, ...style }}>C#</span>
);
export const AzureIcon = ({ style }: { style?: React.CSSProperties }) => (
  <span style={{ fontSize: "9px", fontWeight: 800, fontFamily: "var(--font-mono)", lineHeight: 1, ...style }}>Az</span>
);
export const SqlServerIcon = ({ style }: { style?: React.CSSProperties }) => (
  <span style={{ fontSize: "8px", fontWeight: 800, fontFamily: "var(--font-mono)", lineHeight: 1, ...style }}>SQL</span>
);
export const PowerBIIcon = ({ style }: { style?: React.CSSProperties }) => (
  <span style={{ fontSize: "8px", fontWeight: 800, fontFamily: "var(--font-mono)", lineHeight: 1, ...style }}>PBI</span>
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
