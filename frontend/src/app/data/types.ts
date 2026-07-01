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

export interface Translation {
  readonly status: string;
  readonly tagline: string;
  readonly btn_projects: string;
  readonly btn_contact: string;
  readonly btn_cv: string;
  readonly nav_labels: readonly string[];
  readonly s_about: string;
  readonly about_text: string;
  readonly s_skills: string;
  readonly skills_subtitle: string;
  readonly skill_cats: readonly string[];
  readonly s_services: string;
  readonly services: readonly ServiceItem[];
  readonly s_projects: string;
  readonly projects_subtitle: string;
  readonly project_filters: Record<ProjectFilter, string>;
  readonly github_btn: string;
  readonly live_btn: string;
  readonly proj_names: readonly string[];
  readonly proj_descs: readonly string[];
  readonly s_education: string;
  readonly education: readonly EducationItem[];
  readonly s_traj: string;
  readonly traj_labels: readonly string[];
  readonly traj_descs: readonly string[];
  readonly traj_today: string;
  readonly s_contact: string;
  readonly contact_heading: string;
  readonly contact_address: string;
  readonly contact_phone_lbl: string;
  readonly f_name: string;
  readonly f_email: string;
  readonly f_message: string;
  readonly f_send: string;
  readonly f_sent: string;
  readonly f_name_ph: string;
  readonly f_email_ph: string;
  readonly f_msg_ph: string;
  readonly s_identity: string;
  readonly footer_tagline: string;
  readonly footer_site: string;
  readonly footer_links: string;
  readonly footer_rights: string;
  readonly footer_nav: readonly string[];
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
