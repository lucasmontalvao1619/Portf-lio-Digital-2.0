import type { Lang, ProjectCardData, ProjectStaticData, Tr } from "./types";
import dubyDashboardUrl from "../../../assets/dashboard_duby.png?url";
import dubyDarkModeUrl from "../../../assets/darkmode_duby.png?url";
import dubyLoginUrl from "../../../assets/login_page_duby.png?url";
import dubyPlanoUrl from "../../../assets/plano_duby.png?url";
import tauanContatosUrl from "../../../assets/contatos.tauan.png?url";
import tauanGalleryUrl from "../../../assets/gallery.tauan.png?url";
import tauanHeroUrl from "../../../assets/herophoto_tauan.png?url";
import tauanHistoriaUrl from "../../../assets/historia.tauan.png?url";
import lucasContatoUrl from "../../../assets/portfolio_lucas_contato.png?url";
import lucasHeroUrl from "../../../assets/portfolio_lucas_hero.png?url";
import lucasMobileUrl from "../../../assets/portfolio_lucas_mobile.png?url";
import lucasPesquisaUrl from "../../../assets/portfolio_lucas_pesquisa.png?url";
import lucasProjetosUrl from "../../../assets/portfolio_lucas_projetos.png?url";
import lucasSobreUrl from "../../../assets/portfolio_lucas_sobre.png?url";
import lucasTecnologiasUrl from "../../../assets/portfolio_lucas_tecnologias.png?url";

export const PROJECTS = [
  {
    slug: "sistema-gestao-imobiliaria",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop&auto=format&q=85",
    alt: "Corretora apresentando um imovel para clientes",
    tech: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "React"],
    github: "",
    repositoryLabel: "Em produção",
    status: "PRODUÇÃO",
    live: "",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=788&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&h=788&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1400&h=788&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=788&fit=crop&auto=format&q=85",
    ],
    details: {
      PT: {
        overview: "O Sistema de Gestão Imobiliária é uma plataforma web em produção voltada ao gerenciamento de imóveis, contratos de locação, clientes e rotinas operacionais de uma imobiliária. Desenvolvido com foco em organização, usabilidade e robustez, o sistema permite centralizar operações em um ambiente digital consistente.",
        problem: "Imobiliárias tradicionais enfrentam dificuldades com processos manuais, dados desatualizados e falta de visibilidade sobre contratos ativos e inadimplências. A ausência de um sistema centralizado gera retrabalho, erros humanos e perda de oportunidades de negócio.",
        solution: "A solução foi estruturada como uma aplicação fullstack com autenticação, cadastros de imóveis e clientes, controle de contratos, organização de dados e telas pensadas para consulta rápida. A interface prioriza clareza para uso diário, enquanto o backend concentra as regras de negócio e a persistência dos dados.",
        architecture: "Arquitetura baseada em API REST com backend em C# e ASP.NET Core, persistência com Entity Framework Core e banco relacional SQL Server. O frontend em React consome os endpoints da API e organiza a experiência em fluxos objetivos para cadastro, consulta e acompanhamento das informações imobiliárias.",
        learnings: ["Estruturação de uma API em C# com ASP.NET Core", "Modelagem relacional para imóveis, clientes, contratos e operações imobiliárias", "Separação clara entre regras de negócio, persistência e interface", "Preparação do projeto para uso em produção e apresentação técnica"],
      },
      EN: {
        overview: "The Real Estate Management System is a production-stage web platform for managing properties, rental contracts, clients, and daily real estate workflows. Built with a focus on organization, usability, and robustness, it centralizes operations in a consistent digital environment.",
        problem: "Traditional real estate agencies struggle with manual processes, outdated data, and lack of visibility into active contracts and overdue accounts. The absence of a centralized system leads to rework, human errors, and missed business opportunities.",
        solution: "The solution was structured as a fullstack application with authentication, property and client records, contract control, organized data, and screens designed for quick consultation. The interface favors daily usability, while the backend concentrates business rules and data persistence.",
        architecture: "REST API architecture with a C# and ASP.NET Core backend, persistence through Entity Framework Core, and SQL Server as the relational database. The React frontend consumes the API endpoints and organizes the experience into focused flows for creating, consulting, and tracking real estate information.",
        learnings: ["Structuring an API with C# and ASP.NET Core", "Relational modeling for properties, clients, contracts, and real estate operations", "Clear separation between business rules, persistence, and interface", "Preparing a project for production use and technical presentation"],
      },
    },
  },
  {
    slug: "duby",
    image: dubyLoginUrl,
    alt: "DUBY login page",
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Lucide Icons"],
    github: "https://github.com/lucasmontalvao1619/Projeto-Duby",
    live: "",
    gallery: [
      dubyLoginUrl,
      dubyDashboardUrl,
      dubyDarkModeUrl,
      dubyPlanoUrl,
    ],
    details: {
      PT: {
        overview: "O Projeto DUBY é um site/sistema web acadêmico criado em equipe para organizar processos de gestão empresarial. A interface simula um ambiente financeiro com login, dashboard, relatórios, contas, adquirentes, conciliação, usuários e configurações.",
        problem: "Empresas que lidam com vendas, taxas, recebimentos e contas precisam visualizar informações financeiras em telas claras. O desafio foi transformar esse fluxo de gestão em uma experiência web organizada, navegável e compreensível para o usuário.",
        solution: "Construímos telas estáticas e interativas com HTML, CSS e JavaScript, incluindo autenticação simulada, sidebar compartilhada, cards de indicadores, tabelas, abas, seletores, notificações e gráficos para recebimentos, pagamentos, taxas e divergências.",
        architecture: "Projeto front-end multipágina baseado em HTML, CSS global por módulos e JavaScript puro. O dashboard usa Chart.js e chartjs-plugin-datalabels para visualizações, Lucide para ícones e scripts compartilhados em Assets para navegação e comportamento da sidebar.",
        learnings: ["Estruturação de um sistema web multipágina com HTML, CSS e JavaScript", "Criação de dashboards financeiros com Chart.js", "Organização de componentes visuais reutilizáveis como sidebar, cards, tabelas e abas", "Trabalho em equipe em um projeto acadêmico com foco em gestão empresarial"],
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
    image: tauanHeroUrl,
    alt: "Portfolio Tauan hero section",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Motion"],
    github: "https://github.com/lucasmontalvao1619/Portf-lio-Tauan",
    live: "",
    gallery: [
      tauanHeroUrl,
      tauanGalleryUrl,
      tauanHistoriaUrl,
      tauanContatosUrl,
    ],
    details: {
      PT: {
        overview: "O Portfólio Tauan é uma landing page premium desenvolvida para Rafael Tauan, personal trainer, com foco em apresentação profissional, estética moderna e conversão para canais de contato. A página combina hero visual, galeria, qualificações, história profissional, diplomas e links sociais para comunicar autoridade e aproximar novos alunos.",
        problem: "Profissionais de treinamento físico precisam transmitir confiança antes do primeiro contato, mas perfis em redes sociais nem sempre organizam trajetória, certificações, imagens e canais de atendimento em uma experiência clara. O desafio foi criar uma presença digital própria, responsiva e visualmente refinada.",
        solution: "Desenvolvemos uma página de alta performance com identidade escura e detalhes dourados, animações suaves, carrossel premium de imagens e chamadas diretas para WhatsApp, Instagram, TikTok e e-mail. O conteúdo foi estruturado para guiar o visitante da apresentação inicial até o contato, reforçando transformação física, qualificação e experiência real.",
        architecture: "Aplicação front-end em React 18 com Vite e TypeScript, estilização com Tailwind CSS, Motion para animações, Embla Carousel para a galeria e Lucide React para ícones. Os dados de marca, links sociais, imagens, certificações e textos ficam centralizados em arquivos de configuração, facilitando manutenção e expansão.",
        learnings: ["Criação de landing page responsiva com foco em conversão e apresentação profissional", "Organização modular de seções como hero, galeria, qualificações, sobre, diplomas, contato e footer", "Uso de Motion e Embla Carousel para uma experiência visual fluida sem perder performance", "Centralização de dados de marca, imagens e links sociais para facilitar futuras atualizações"],
      },
      EN: {
        overview: "Tauan Portfolio is a premium landing page built for Rafael Tauan, a personal trainer, focused on professional presentation, modern aesthetics, and conversion through contact channels. The page combines a visual hero, gallery, qualifications, professional story, diplomas, and social links to communicate authority and bring new students closer.",
        problem: "Fitness professionals need to build trust before the first contact, but social media profiles do not always organize background, certifications, images, and service channels into a clear experience. The challenge was to create a responsive, polished, and owned digital presence.",
        solution: "We developed a high-performance page with a dark visual identity, gold accents, smooth animations, a premium image carousel, and direct calls to WhatsApp, Instagram, TikTok, and email. The content guides visitors from the first presentation to contact while reinforcing physical transformation, qualifications, and real experience.",
        architecture: "Front-end application built with React 18, Vite, and TypeScript, styled with Tailwind CSS, animated with Motion, using Embla Carousel for the gallery and Lucide React for icons. Brand data, social links, images, certifications, and text content are centralized in configuration files, making maintenance and future expansion easier.",
        learnings: ["Building a responsive landing page focused on conversion and professional presentation", "Organizing modular sections such as hero, gallery, qualifications, about, diplomas, contact, and footer", "Using Motion and Embla Carousel to create a fluid visual experience without sacrificing performance", "Centralizing brand data, images, and social links to simplify future updates"],
      },
    },
  },
  {
    slug: "portfolio-lucas",
    image: lucasHeroUrl,
    alt: "Portfolio Lucas Montalvao hero section",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/lucasmontalvao1619/Portf-lio-Digital-2.0",
    live: "",
    gallery: [
      lucasHeroUrl,
      lucasSobreUrl,
      lucasTecnologiasUrl,
      lucasProjetosUrl,
      lucasPesquisaUrl,
      lucasContatoUrl,
      lucasMobileUrl,
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
