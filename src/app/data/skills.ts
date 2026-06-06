import { BookOpen, Database, FlaskConical, Layers, Monitor, Server, Wrench, Zap } from "lucide-react";
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
import type { BeyondCard, Lang, SkillCard } from "./types";

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

export const BEYOND_CARDS = {
  PT: [
    {
      num: "01",
      Icon: FlaskConical,
      title: "Pesquisa Científica",
      desc: "Pesquisador PIBIC/CNPq com atuação em projetos voltados para automação, monitoramento inteligente e aplicação de Inteligência Artificial.",
      highlights: ["Metodologia Científica", "Inteligência Artificial Aplicada", "Investigação de Problemas", "Validação de Soluções"],
    },
    {
      num: "02",
      Icon: BookOpen,
      title: "Produção Acadêmica",
      desc: "Atuação na construção de artigos e trabalhos científicos, com foco em escrita técnica, organização de ideias, análise de dados e fundamentação teórica.",
      highlights: ["Escrita Científica", "Fundamentação Teórica", "Análise Estatística", "Organização de Referências"],
    },
    {
      num: "03",
      Icon: Layers,
      title: "Pesquisa & Prototipação",
      desc: "Levantamento bibliográfico, análise de requisitos e validação de soluções ao longo de todo o ciclo de desenvolvimento.",
      highlights: ["Revisão Bibliográfica", "Análise de Requisitos", "Prototipação", "Testes e Validação"],
    },
    {
      num: "04",
      Icon: Zap,
      title: "Automação de Processos",
      desc: "Integração de sistemas, otimização de fluxos e desenvolvimento de ferramentas para aumentar eficiência e reduzir tarefas repetitivas.",
      highlights: ["Integração de Sistemas", "Automação", "Otimização de Fluxos", "Ferramentas Personalizadas"],
    },
  ],
  EN: [
    {
      num: "01",
      Icon: FlaskConical,
      title: "Scientific Research",
      desc: "PIBIC/CNPq researcher working on projects focused on automation, intelligent monitoring, and applied Artificial Intelligence.",
      highlights: ["Scientific Methodology", "Applied Artificial Intelligence", "Problem Investigation", "Solution Validation"],
    },
    {
      num: "02",
      Icon: BookOpen,
      title: "Academic Production",
      desc: "Engaged in building articles and scientific papers, with focus on technical writing, idea organization, data analysis, and theoretical grounding.",
      highlights: ["Scientific Writing", "Theoretical Grounding", "Statistical Analysis", "Reference Management"],
    },
    {
      num: "03",
      Icon: Layers,
      title: "Research & Prototyping",
      desc: "Bibliographic surveys, requirements analysis, and solution validation across the full development lifecycle.",
      highlights: ["Literature Review", "Requirements Analysis", "Prototyping", "Testing & Validation"],
    },
    {
      num: "04",
      Icon: Zap,
      title: "Process Automation",
      desc: "System integration, workflow optimization, and custom tool development to increase efficiency and reduce repetitive tasks.",
      highlights: ["System Integration", "Automation", "Workflow Optimization", "Custom Tools"],
    },
  ],
} as const satisfies Record<Lang, readonly BeyondCard[]>;

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
