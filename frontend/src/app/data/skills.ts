import { Database, Monitor, Server, Wrench } from "lucide-react";
import {
  SiDocker,
  SiDotnet,
  SiFigma,
  SiGit,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { AzureIcon, CSharpIcon, PowerBIIcon, SqlServerIcon } from "../components/icons/PortfolioIcons";
import type { SkillCard } from "./types";

export const SKILL_CARDS = [
  {
    catIcon: Server,
    items: [
      { name: "C#", Icon: CSharpIcon },
      { name: "ASP.NET", Icon: SiDotnet },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Python", Icon: SiPython },
    ],
  },
  {
    catIcon: Monitor,
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    catIcon: Database,
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "SQL Server", Icon: SqlServerIcon },
      { name: "Azure", Icon: AzureIcon },
    ],
  },
  {
    catIcon: Wrench,
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Docker", Icon: SiDocker },
      { name: "Postman", Icon: SiPostman },
      { name: "Power BI", Icon: PowerBIIcon },
      { name: "Figma", Icon: SiFigma },
    ],
  },
] as const satisfies readonly SkillCard[];

export const IDENTITY = [
  "Pesquisador PIBIC/CNPq",
  "Desenvolvedor Full Stack",
  "Apaixonado por Automação",
  "Construindo Soluções Digitais",
  "Aprendizado Contínuo",
  "Resolução de Problemas",
] as const;

export const MARQUEE = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "SQL Server",
  "React Native",
  "Git",
  "Docker",
  "Tailwind CSS",
  "ASP.NET",
  "Azure",
  "Figma",
] as const;

export const INFINITE_BAR_REPEATS = 8;

export const TRAJ_YEARS = ["2024", "2025", "2025", "2026", ""] as const;
