import type React from "react";

export type Lang = "PT" | "EN";

export type SectionId =
  | "inicio"
  | "sobre"
  | "habilidades"
  | "servicos"
  | "formacao"
  | "trajetoria"
  | "contato";

export type NavItemId = SectionId | "projetos";

export interface SectionNavigationItem {
  readonly label: string;
  readonly id: SectionId;
  readonly isRoute?: false;
}

export interface RouteNavigationItem {
  readonly label: string;
  readonly id: "projetos";
  readonly isRoute: true;
}

export type NavigationItem = SectionNavigationItem | RouteNavigationItem;

export interface ServiceItem {
  readonly title: string;
  readonly desc: string;
}

export interface EducationItem {
  readonly title: string;
  readonly period: string;
  readonly badge: string;
  readonly desc: string;
  readonly ongoing: boolean;
  readonly featured?: boolean;
  readonly highlightLabel?: string;
}

export interface NavTranslation {
  readonly home: string;
  readonly about: string;
  readonly skills: string;
  readonly services: string;
  readonly education: string;
  readonly journey: string;
  readonly contact: string;
  readonly projects: string;
}

export interface HeroTranslation {
  readonly status: string;
  readonly tagline: string;
  readonly ctaProjects: string;
  readonly ctaContact: string;
  readonly ctaDownloadCv: string;
}

export interface AboutTranslation {
  readonly title: string;
  readonly text: string;
}

export interface SkillsTranslation {
  readonly title: string;
  readonly subtitle: string;
  readonly categories: readonly string[];
}

export interface ServicesTranslation {
  readonly title: string;
  readonly items: readonly ServiceItem[];
}

export interface ProjectsTranslation {
  readonly title: string;
  readonly subtitle: string;
  readonly filters: Record<ProjectFilter, string>;
  readonly githubLabel: string;
  readonly liveLabel: string;
  readonly names: readonly string[];
  readonly descriptions: readonly string[];
}

export interface EducationTranslation {
  readonly title: string;
  readonly items: readonly EducationItem[];
}

export interface JourneyTranslation {
  readonly title: string;
  readonly labels: readonly string[];
  readonly descriptions: readonly string[];
  readonly today: string;
}

export interface ContactFormTranslation {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly send: string;
  readonly sent: string;
  readonly namePlaceholder: string;
  readonly emailPlaceholder: string;
  readonly messagePlaceholder: string;
}

export interface ContactTranslation {
  readonly title: string;
  readonly heading: string;
  readonly address: string;
  readonly phoneLabel: string;
  readonly form: ContactFormTranslation;
}

export interface GitHubTranslation {
  readonly title: string;
  readonly subtitle: string;
  readonly repos: string;
  readonly followers: string;
  readonly following: string;
  readonly openProfile: string;
  readonly totalRepos: string;
  readonly totalStars: string;
  readonly totalForks: string;
  readonly topLanguages: string;
  readonly topRepos: string;
}

export interface FooterTranslation {
  readonly tagline: string;
  readonly siteLabel: string;
  readonly linksLabel: string;
  readonly rights: string;
}

export interface Translation {
  readonly nav: NavTranslation;
  readonly hero: HeroTranslation;
  readonly about: AboutTranslation;
  readonly skills: SkillsTranslation;
  readonly services: ServicesTranslation;
  readonly projects: ProjectsTranslation;
  readonly education: EducationTranslation;
  readonly journey: JourneyTranslation;
  readonly contact: ContactTranslation;
  readonly github: GitHubTranslation;
  readonly footer: FooterTranslation;
}

export type Tr = Translation;

export type Localized<T> = Record<Lang, T>;
export type ProjectCategory = "fullstack" | "frontend" | "research" | "ui";
export type ProjectFilter = "all" | ProjectCategory;

export interface OutletCtx {
  readonly isDark: boolean;
  readonly lang: Lang;
  readonly tr: Tr;
  readonly scrollToSection: (id: SectionId) => void;
  readonly handleProjectsClick: () => void;
}

export interface ProjectDetails {
  readonly overview: string;
  readonly problem: string;
  readonly solution: string;
  readonly architecture: string;
  readonly learnings: readonly string[];
}

export interface ProjectStaticData {
  readonly slug: string;
  readonly image: string;
  readonly alt: string;
  readonly tech: readonly string[];
  readonly categories: readonly ProjectCategory[];
  readonly github: string;
  readonly repositoryLabel?: string;
  readonly status?: string;
  readonly live: string;
  readonly gallery: readonly string[];
  readonly details: Localized<ProjectDetails>;
}

export interface ProjectCardData extends ProjectStaticData {
  readonly index: number;
  readonly num: string;
  readonly name: string;
  readonly desc: string;
}

export type ProjectSection =
  | { readonly num: string; readonly label: string; readonly type: "text"; readonly content: string }
  | { readonly num: string; readonly label: string; readonly type: "list"; readonly content: readonly string[] }
  | { readonly num: string; readonly label: string; readonly type: "gallery"; readonly content: readonly string[] };

export type SkillIcon = React.ElementType<{ style?: React.CSSProperties }>;
export type CategoryIcon = React.ElementType<{
  size?: string | number;
  strokeWidth?: string | number;
  className?: string;
  color?: string;
}>;

export interface SkillItem {
  readonly name: string;
  readonly Icon: SkillIcon;
}

export interface SkillCard {
  readonly catIcon: CategoryIcon;
  readonly items: readonly SkillItem[];
}

export type ContactIconKey = "github" | "linkedin" | "mail" | "phone";

export interface ContactLink {
  readonly icon: ContactIconKey;
  readonly label: string;
  readonly href: string;
}
