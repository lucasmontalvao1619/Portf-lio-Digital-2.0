import type { ContactLink, NavigationItem, NavTranslation, SectionId, Tr } from "./types";

export const SCROLL_IDS = ["inicio", "sobre", "habilidades", "servicos", "formacao", "trajetoria", "contato"] as const satisfies readonly SectionId[];
export const FOOTER_SCROLL_IDS = ["sobre", "habilidades", "servicos", "formacao", "trajetoria", "contato"] as const satisfies readonly SectionId[];

export const CONTACT_LINKS = [
  { icon: "github", label: "GitHub", href: "https://github.com/lucasmontalvao1619" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-montalv%C3%A3o-gon%C3%A7alves-de-oliveira-781998342/" },
  { icon: "mail", label: "E-mail", href: "mailto:lucasmontalvao2019@gmail.com" },
] as const satisfies readonly ContactLink[];

export const FOOTER_LINKS = CONTACT_LINKS;

const SECTION_NAV_KEY: Record<SectionId, keyof NavTranslation> = {
  inicio: "home",
  sobre: "about",
  habilidades: "skills",
  servicos: "services",
  formacao: "education",
  trajetoria: "journey",
  contato: "contact",
};

export function sectionNavLabel(id: SectionId, tr: Tr): string {
  return tr.nav[SECTION_NAV_KEY[id]];
}

const TOP_NAV_SECTION_IDS = ["inicio", "habilidades", "servicos", "formacao", "sobre", "contato"] as const satisfies readonly SectionId[];

export function buildNavItems(tr: Tr): NavigationItem[] {
  return TOP_NAV_SECTION_IDS.map((id) => ({ label: sectionNavLabel(id, tr), id }));
}

export function isExternalLink(href: string): boolean {
  return href.startsWith("http");
}
