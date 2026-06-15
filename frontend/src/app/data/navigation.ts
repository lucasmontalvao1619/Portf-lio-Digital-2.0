import type { ContactLink, NavigationItem, SectionId, Tr } from "./types";

export const SCROLL_IDS = ["inicio", "sobre", "habilidades", "servicos", "formacao", "trajetoria", "contato"] as const satisfies readonly SectionId[];
export const FOOTER_SCROLL_IDS = ["sobre", "habilidades", "servicos", "formacao", "trajetoria", "contato"] as const satisfies readonly SectionId[];

export const CONTACT_LINKS = [
  { icon: "github", label: "GitHub", href: "https://github.com/lucasmontalvao1619" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-montalv%C3%A3o-gon%C3%A7alves-de-oliveira-781998342/" },
  { icon: "mail", label: "E-mail", href: "mailto:lucasmontalvao2019@gmail.com" },
] as const satisfies readonly ContactLink[];

export const FOOTER_LINKS = CONTACT_LINKS;

export function buildNavItems(tr: Tr): NavigationItem[] {
  return [
    { label: tr.nav_labels[0], id: "inicio" },
    { label: tr.nav_labels[1], id: "sobre" },
    { label: tr.nav_labels[2], id: "habilidades" },
    { label: tr.nav_labels[3], id: "servicos" },
    { label: tr.nav_labels[4], id: "formacao" },
    { label: tr.nav_labels[5], id: "trajetoria" },
    { label: tr.nav_labels[6], id: "contato" },
    { label: tr.nav_labels[7], id: "projetos", isRoute: true },
  ];
}

export function isExternalLink(href: string): boolean {
  return href.startsWith("http");
}
