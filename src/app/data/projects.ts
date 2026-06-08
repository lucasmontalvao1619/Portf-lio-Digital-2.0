import type { Lang, ProjectCardData, ProjectStaticData, Tr } from "./types";

export const PROJECTS = [
  {
    slug: "sistema-gestao-imobiliaria",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop&auto=format",
    alt: "Analytics dashboard",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/lucasmontalvao1619",
    live: "",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=700&fit=crop&auto=format",
    ],
    details: {
      PT: {
        overview: "O Sistema de Gestão Imobiliária é uma plataforma web completa voltada para o gerenciamento de imóveis, contratos de locação e clientes. Desenvolvido com foco em usabilidade e robustez, o sistema permite que corretores e imobiliárias centralizem todas as suas operações em um único ambiente digital.",
        problem: "Imobiliárias tradicionais enfrentam dificuldades com processos manuais, dados desatualizados e falta de visibilidade sobre contratos ativos e inadimplências. A ausência de um sistema centralizado gera retrabalho, erros humanos e perda de oportunidades de negócio.",
        solution: "Desenvolvemos uma plataforma fullstack com autenticação segura, CRUD completo para imóveis e clientes, módulo de contratos com alertas de vencimento e dashboard analítico em tempo real. A interface foi projetada para ser intuitiva mesmo para usuários não técnicos.",
        architecture: "Arquitetura REST API com backend em Node.js e Express, banco de dados relacional PostgreSQL com ORM Prisma e frontend em React com TypeScript. Autenticação via JWT e gerenciamento de estado com Context API.",
        learnings: ["Implementação de autenticação JWT com refresh tokens e controle de sessão", "Modelagem de banco de dados relacional para domínio imobiliário complexo", "Dashboard analítico com recharts e atualização de dados em tempo real", "Deploy com Docker e configuração de pipeline de CI/CD básico"],
      },
      EN: {
        overview: "The Real Estate Management System is a complete web platform for managing properties, rental contracts, and clients. Built with a focus on usability and robustness, the system lets brokers and agencies centralize all their operations in a single digital environment.",
        problem: "Traditional real estate agencies struggle with manual processes, outdated data, and lack of visibility into active contracts and overdue accounts. The absence of a centralized system leads to rework, human errors, and missed business opportunities.",
        solution: "We built a fullstack platform with secure authentication, complete CRUD for properties and clients, a contract module with expiry alerts, and a real-time analytics dashboard. The interface was designed to be intuitive even for non-technical users.",
        architecture: "REST API architecture with a Node.js and Express backend, PostgreSQL relational database with Prisma ORM, and a React + TypeScript frontend. Authentication via JWT and state management with Context API.",
        learnings: ["JWT authentication with refresh tokens and session management", "Relational database modeling for a complex real estate domain", "Analytics dashboard with recharts and real-time data polling", "Docker deployment and basic CI/CD pipeline setup"],
      },
    },
  },
  {
    slug: "duby",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=500&fit=crop&auto=format",
    alt: "Financial dashboard interface",
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Lucide Icons"],
    github: "https://github.com/lucasmontalvao1619/Projeto-Duby",
    live: "",
    gallery: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&auto=format",
    ],
    details: {
      PT: {
        overview: "O Projeto DUBY e um site/sistema web academico criado em equipe para organizar processos de gestao empresarial. A interface simula um ambiente financeiro com login, dashboard, relatorios, contas, adquirentes, conciliacao, usuarios e configuracoes.",
        problem: "Empresas que lidam com vendas, taxas, recebimentos e contas precisam visualizar informacoes financeiras em telas claras. O desafio foi transformar esse fluxo de gestao em uma experiencia web organizada, navegavel e compreensivel para o usuario.",
        solution: "Construimos telas estaticas e interativas com HTML, CSS e JavaScript, incluindo autenticacao simulada, sidebar compartilhada, cards de indicadores, tabelas, abas, seletores, notificacoes e graficos para recebimentos, pagamentos, taxas e divergencias.",
        architecture: "Projeto front-end multipagina baseado em HTML, CSS global por modulos e JavaScript puro. O dashboard usa Chart.js e chartjs-plugin-datalabels para visualizacoes, Lucide para icones e scripts compartilhados em Assets para navegacao e comportamento da sidebar.",
        learnings: ["Estruturacao de um sistema web multipagina com HTML, CSS e JavaScript", "Criacao de dashboards financeiros com Chart.js", "Organizacao de componentes visuais reutilizaveis como sidebar, cards, tabelas e abas", "Trabalho em equipe em um projeto academico com foco em gestao empresarial"],
      },
      EN: {
        overview: "The DUBY Project is an academic web system built with teammates to organize business management workflows. The interface simulates a financial environment with login, dashboard, reports, accounts, acquirers, reconciliation, users, and settings.",
        problem: "Businesses that handle sales, fees, receivables, and accounts need clear financial views. The challenge was to turn this management flow into an organized, navigable, and understandable web experience.",
        solution: "We built static and interactive screens with HTML, CSS, and JavaScript, including simulated authentication, shared sidebar navigation, metric cards, tables, tabs, selectors, notifications, and charts for receivables, payments, fees, and discrepancies.",
        architecture: "Multi-page front-end project based on HTML, modular/global CSS, and vanilla JavaScript. The dashboard uses Chart.js and chartjs-plugin-datalabels for visualizations, Lucide for icons, and shared scripts in Assets for sidebar navigation and behavior.",
        learnings: ["Structuring a multi-page web system with HTML, CSS, and JavaScript", "Building financial dashboards with Chart.js", "Organizing reusable visual pieces such as sidebar, cards, tables, and tabs", "Collaborating on an academic project focused on business management"],
      },
    },
  },
  {
    slug: "portfolio-tauan",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=900&h=500&fit=crop&auto=format",
    alt: "Minimal desk setup",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/lucasmontalvao1619",
    live: "",
    gallery: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=700&fit=crop&auto=format",
    ],
    details: {
      PT: {
        overview: "O Portfólio Tauan é um site pessoal desenvolvido para apresentar os trabalhos criativos de um designer. O projeto priorizou uma identidade visual forte, com animações cuidadosas e uma galeria interativa que destaca projetos de forma elegante.",
        problem: "O cliente precisava de um portfólio que se destacasse visualmente e comunicasse seu trabalho criativo de forma profissional, sem depender de plataformas genéricas como Behance ou Dribbble que limitam a expressão visual.",
        solution: "Construímos um site estático de alta performance com Next.js, aproveitando a geração estática para SEO e tempo de carregamento. As animações de entrada foram implementadas com Framer Motion, criando uma experiência de rolagem memorável e fluida.",
        architecture: "Next.js com App Router para SSG, Tailwind CSS para estilização, Framer Motion para animações de scroll e entrada, e deploy automático via Vercel integrado ao GitHub.",
        learnings: ["Estratégias de SSG vs SSR no Next.js App Router para máxima performance", "Orquestração de animações complexas e sequenciais com Framer Motion", "Otimização de imagens com next/image para boas pontuações em Core Web Vitals", "Implementação de scroll-driven animations sem JavaScript adicional"],
      },
      EN: {
        overview: "The Tauan Portfolio is a personal website built to showcase a designer's creative work. The project prioritized a strong visual identity, with careful animations and an interactive gallery that highlights projects elegantly.",
        problem: "The client needed a portfolio that stood out visually and communicated their creative work professionally, without relying on generic platforms like Behance or Dribbble that limit visual expression.",
        solution: "We built a high-performance static site with Next.js, leveraging static generation for SEO and load time. Entry animations were implemented with Framer Motion, creating a memorable and fluid scrolling experience.",
        architecture: "Next.js with App Router for SSG, Tailwind CSS for styling, Framer Motion for scroll and entry animations, and automatic deployment via Vercel integrated with GitHub.",
        learnings: ["SSG vs SSR strategies in Next.js App Router for maximum performance", "Orchestrating complex, sequenced animations with Framer Motion", "Image optimization with next/image for strong Core Web Vitals scores", "Scroll-driven animations without additional JavaScript"],
      },
    },
  },
  {
    slug: "portfolio-lucas",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=500&fit=crop&auto=format",
    alt: "Laptop with code",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/lucasmontalvao1619",
    live: "",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=1200&h=700&fit=crop&auto=format",
    ],
    details: {
      PT: {
        overview: "Este portfólio pessoal — o site que você está visitando — foi desenvolvido com foco em identidade visual coerente, performance e estética minimalista suíça. Cada seção foi pensada para comunicar competência técnica aliada à sensibilidade de design.",
        problem: "Portfólios de desenvolvedores tendem a ser genéricos ou excessivamente técnicos, sem personalidade visual. O desafio foi criar algo que comunicasse tanto habilidade técnica quanto cuidado estético, com experiência fluida em todos os dispositivos.",
        solution: "Design system próprio construído sobre Tailwind CSS v4 com tokens customizados, componentes de animação baseados em IntersectionObserver, roteamento com React Router v7 e tipografia editorial com Bricolage Grotesque.",
        architecture: "React 18 com TypeScript e Vite, React Router v7 no modo Data com Outlet context compartilhado, Tailwind CSS v4 com design tokens customizados, dark mode via CSS class e localStorage, e IntersectionObserver para animações de scroll.",
        learnings: ["Design system escalável com Tailwind CSS v4 e tokens @theme customizados", "React Router v7 com Outlet context para estado compartilhado entre rotas", "Padrão pendingScrollRef para navegação cross-page com scroll suave", "Equilíbrio entre expressão visual, acessibilidade e performance de carregamento"],
      },
      EN: {
        overview: "This personal portfolio — the site you are visiting — was built with a focus on visual coherence, performance, and Swiss minimalist aesthetics. Each section was designed to communicate technical competence alongside design sensibility.",
        problem: "Developer portfolios tend to be generic or overly technical, lacking visual personality. The challenge was to create something that communicated both technical skill and aesthetic care, with a fluid experience on all devices.",
        solution: "A custom design system built on Tailwind CSS v4 with custom tokens, IntersectionObserver-based animation components, React Router v7 routing, and editorial typography with Bricolage Grotesque.",
        architecture: "React 18 with TypeScript and Vite, React Router v7 Data Mode with shared Outlet context, Tailwind CSS v4 with custom @theme tokens, dark mode via CSS class and localStorage, and IntersectionObserver for scroll animations.",
        learnings: ["Scalable design system with Tailwind CSS v4 and custom @theme tokens", "React Router v7 with Outlet context for shared cross-route state", "PendingScrollRef pattern for smooth cross-page scroll navigation", "Balancing visual expression, accessibility, and load performance"],
      },
    },
  },
] as const satisfies readonly ProjectStaticData[];

export const PROJECT_IMAGES = PROJECTS.map((project) => project.image);
export const PROJECT_ALT = PROJECTS.map((project) => project.alt);
export const PROJECT_TECH = PROJECTS.map((project) => project.tech);
export const PROJECT_GITHUB = PROJECTS.map((project) => project.github);
export const PROJECT_LIVE = PROJECTS.map((project) => project.live);
export const PROJECT_SLUGS = PROJECTS.map((project) => project.slug);
export const PROJECT_DETAILS = PROJECTS.map((project) => project.details);
export const PROJECT_GALLERY = PROJECTS.map((project) => project.gallery);

export function getLocalizedProjects(tr: Tr): ProjectCardData[] {
  return PROJECTS.map((project, index) => ({
    ...project,
    index,
    num: `0${index + 1}`,
    name: tr.proj_names[index],
    desc: tr.proj_descs[index],
  }));
}

export function findLocalizedProject(slug: string | undefined, tr: Tr): ProjectCardData | undefined {
  return getLocalizedProjects(tr).find((project) => project.slug === slug);
}

export function getProjectDetails(project: ProjectStaticData, lang: Lang) {
  return project.details[lang];
}
