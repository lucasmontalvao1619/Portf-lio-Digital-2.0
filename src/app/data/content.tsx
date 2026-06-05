import type React from "react";
import { BookOpen, Database, FlaskConical, Layers, Monitor, Server, Wrench, Zap } from "lucide-react";
import {
  SiDotnet, SiNodedotjs, SiPython,
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiPostgresql, SiGit, SiGithub, SiDocker, SiPostman, SiFigma,
} from "react-icons/si";
import { AzureIcon, CSharpIcon, PowerBIIcon, SqlServerIcon } from "../components/icons/PortfolioIcons";

export type Lang = "PT" | "EN";

export const T = {
  PT: {
    status:       "Disponível para novos projetos",
    tagline:      "Construindo interfaces e sistemas onde lógica encontra estética.",
    btn_projects: "Ver Projetos",
    btn_contact:  "Contato",
    btn_cv:       "Baixar CV",

    nav_labels: ["Início", "Sobre", "Habilidades", "Trajetória", "Contato", "Projetos"] as string[],

    s_about:    "Sobre Mim",
    about_text: "Desde cedo apaixonado por tecnologia e computação, sou estudante de Ciência da Computação na Universidade Tiradentes. Tenho como objetivo transformar ideias em software e necessidades em soluções inteligentes, unindo desenvolvimento, design e pensamento analítico. Busco construir aplicações funcionais, bem estruturadas e agradáveis de usar, sempre focado em criar experiências que gerem valor real. Acredito no aprendizado contínuo como ferramenta de evolução, buscando constantemente aprimorar minhas habilidades técnicas e pessoais para enfrentar desafios cada vez maiores.",

    s_skills:        "Habilidades Técnicas",
    skills_subtitle: "Tecnologias que utilizo para construir soluções modernas.",
    skill_cats: ["Backend", "Frontend", "Database & Cloud", "Ferramentas & Fluxo"] as string[],

    s_services: "Serviços",
    services: [
      { title: "Desenvolvimento Front-End", desc: "Criação de interfaces web com React, Next.js e TypeScript, focando em interatividade, performance e robustez." },
      { title: "Desenvolvimento Back-End",  desc: "Construção de APIs e sistemas com Node.js, ASP.NET e Python. Realizo requisições e testes utilizando o Postman." },
      { title: "Engenharia de Requisitos",  desc: "Modelagem de requisitos por meio de casos de uso, diagramas UML e elaboração de documentos de especificação de sistemas." },
      { title: "Gestão de Processos",       desc: "Gestão ágil com planejamento estratégico, aplicando técnicas para desenvolver e entregar soluções eficientes." },
    ] as { title: string; desc: string }[],

    s_projects:        "Projetos",
    projects_subtitle: "Trabalhos selecionados e produtos digitais.",
    github_btn:        "GitHub",
    live_btn:          "Live Demo",
    proj_names: [
      "Sistema de Gestão Imobiliária",
      "Projeto DUBY",
      "Portfólio Tauan",
      "Portfólio Lucas Montalvão",
    ] as string[],
    proj_descs: [
      "Plataforma completa para gestão de imóveis, contratos e clientes.",
      "Aplicativo mobile focado em experiência de usuário e fluidez.",
      "Portfólio pessoal desenvolvido para apresentação de trabalhos criativos.",
      "Portfólio pessoal com design minimalista suíço e foco em performance.",
    ] as string[],

    s_education: "Formação",
    education: [
      { title: "Ciência da Computação — UNIT",     period: "Ago 2024 — Jun 2028",       desc: "Na universidade, desenvolvo habilidades fullstack, infraestrutura, engenharia de requisitos, fundamentos de programação e participo de hackathons.", ongoing: false },
      { title: "Desenvolvimento Web — Udemy",       period: "Dez 2024 — Fev 2025",       desc: "Foco em JavaScript moderno, com aprofundamento em Node.js, Express, Vue e recursos avançados do ESNext para aplicações web.", ongoing: false },
      { title: "Curso em Vídeo — CEV",              period: "Jun 2023 — Dez 2024",       desc: "Cursos na plataforma explorando HTML5, CSS3, JavaScript, lógica de programação, Python e outras áreas essenciais.", ongoing: false },
      { title: "Desenvolvimento com React — Udemy", period: "Jun 2025 — Em andamento",   desc: "Desenvolvimento com React, Next, Nest, Tailwind e outras tecnologias, além de criação e consumo de APIs.", ongoing: true },
    ] as { title: string; period: string; desc: string; ongoing: boolean }[],

    s_traj:      "Trajetória",
    traj_labels: [
      "Início da graduação em Ciência da Computação",
      "Instrutor de Tecnologia",
      "Estágio em TI — FAPITEC",
      "Programa de Pesquisa Científica (PIBIC/CNPq)",
      "Desenvolvendo produtos de software",
    ] as string[],
    traj_descs: [
      "Ingresso no curso na Universidade Tiradentes.",
      "Facilitação de cursos de tecnologia para alunos do ensino médio.",
      "Suporte técnico e desenvolvimento de sistemas internos.",
      "Selecionado para o programa de iniciação científica com apoio do CNPq.",
      "Construindo produtos reais e evoluindo como desenvolvedor.",
    ] as string[],
    traj_today: "Hoje",

    s_contact:         "Contato",
    contact_heading:   "Vamos construir algo relevante juntos.",
    contact_address:   "Endereço",
    contact_phone_lbl: "Telefone",
    f_name:    "Nome",    f_email:    "E-mail",         f_message: "Mensagem",
    f_send:    "Enviar",  f_sent:     "Mensagem enviada",
    f_name_ph: "Seu nome", f_email_ph: "seu@email.com", f_msg_ph: "Sua mensagem...",

    s_identity: "Minha Essência",

    s_beyond: "Além do Código",
    beyond_subtitle: "Desenvolvimento, pesquisa, produção acadêmica e aprendizado contínuo além da programação.",
    beyond_footer: "Acredito que bons sistemas nascem da combinação entre código, pesquisa, clareza e entendimento real do problema.",
    beyond_highlights_label: "Destaques",

    footer_tagline: "Construindo software e aprendendo todos os dias.",
    footer_site:    "Site",
    footer_links:   "Links",
    footer_rights:  "Todos os direitos reservados.",
    footer_nav:     ["Sobre", "Habilidades", "Serviços", "Formação", "Trajetória", "Contato"] as string[],
  },

  EN: {
    status:       "Available for new projects",
    tagline:      "Building interfaces and systems where logic meets aesthetics.",
    btn_projects: "View Projects",
    btn_contact:  "Contact",
    btn_cv:       "Download CV",

    nav_labels: ["Home", "About", "Skills", "Journey", "Contact", "Projects"] as string[],

    s_about:    "About Me",
    about_text: "Passionate about technology and computing from an early age, I am a Computer Science student at Universidade Tiradentes. My goal is to turn ideas into software and needs into intelligent solutions, combining development, design and analytical thinking. I seek to build functional, well-structured and enjoyable applications, always focused on creating experiences that generate real value. I believe in continuous learning as a tool for growth, constantly seeking to improve my technical and personal skills to face ever greater challenges.",

    s_skills:        "Expertise",
    skills_subtitle: "Technologies I use to build modern solutions.",
    skill_cats: ["Backend", "Frontend", "Database & Cloud", "Tools & Workflow"] as string[],

    s_services: "Services",
    services: [
      { title: "Front-End Development",    desc: "Building web interfaces with React, Next.js and TypeScript, focused on interactivity, performance and robustness." },
      { title: "Back-End Development",     desc: "Building APIs and systems with Node.js, ASP.NET and Python. Testing and API requests with Postman." },
      { title: "Requirements Engineering", desc: "Requirements modeling through use cases, UML diagrams and structured system specification documents." },
      { title: "Process Management",       desc: "Agile management with strategic planning, applying techniques to efficiently develop and deliver software solutions." },
    ] as { title: string; desc: string }[],

    s_projects:        "Projects",
    projects_subtitle: "Selected works and digital products.",
    github_btn:        "GitHub",
    live_btn:          "Live Demo",
    proj_names: [
      "Real Estate Management System",
      "DUBY Project",
      "Tauan Portfolio",
      "Lucas Montalvão Portfolio",
    ] as string[],
    proj_descs: [
      "Complete platform for managing properties, contracts, and clients.",
      "Mobile application focused on user experience and fluidity.",
      "Personal portfolio developed to showcase creative work.",
      "Personal portfolio with Swiss minimalist design and focus on performance.",
    ] as string[],

    s_education: "Education",
    education: [
      { title: "Computer Science — UNIT",   period: "Aug 2024 — Jun 2028", desc: "Developing fullstack, infrastructure, requirements engineering and programming fundamentals at university, actively participating in hackathons.", ongoing: false },
      { title: "Web Development — Udemy",   period: "Dec 2024 — Feb 2025", desc: "Focus on modern JavaScript, deep dives into Node.js, Express, Vue and advanced ESNext features for web applications.", ongoing: false },
      { title: "Curso em Vídeo — CEV",      period: "Jun 2023 — Dec 2024", desc: "Completed several courses exploring HTML5, CSS3, JavaScript, programming logic, Python and other essential areas.", ongoing: false },
      { title: "React Development — Udemy", period: "Jun 2025 — Ongoing",  desc: "Web development with React, Next, Nest, Tailwind and other technologies, including API creation and consumption.", ongoing: true },
    ] as { title: string; period: string; desc: string; ongoing: boolean }[],

    s_traj:      "Journey",
    traj_labels: [
      "Started Computer Science degree",
      "Technology Instructor",
      "IT Internship — FAPITEC",
      "Scientific Research Program (PIBIC/CNPq)",
      "Building software products",
    ] as string[],
    traj_descs: [
      "Enrolled at Universidade Tiradentes.",
      "Facilitated technology courses for high school students.",
      "Technical support and development of internal systems.",
      "Selected for the scientific initiation program supported by CNPq.",
      "Building real products and growing as a developer.",
    ] as string[],
    traj_today: "Now",

    s_contact:         "Contact",
    contact_heading:   "Let's build something relevant together.",
    contact_address:   "Address",
    contact_phone_lbl: "Phone",
    f_name:    "Name",    f_email:    "Email",           f_message: "Message",
    f_send:    "Send",    f_sent:     "Message sent",
    f_name_ph: "Your name", f_email_ph: "your@email.com", f_msg_ph: "Your message...",

    s_identity: "Who I Am",

    s_beyond: "Beyond the Code",
    beyond_subtitle: "Development, research, academic production, and continuous learning beyond programming.",
    beyond_footer: "I believe great systems are born from the combination of code, research, clarity, and a genuine understanding of the problem.",
    beyond_highlights_label: "Highlights",

    footer_tagline: "Building software and learning every day.",
    footer_site:    "Site",
    footer_links:   "Links",
    footer_rights:  "All rights reserved.",
    footer_nav:     ["About", "Skills", "Services", "Education", "Journey", "Contact"] as string[],
  },
} as const;

export type Tr = typeof T.PT;

export interface OutletCtx {
  isDark: boolean;
  lang: Lang;
  tr: Tr;
  scrollToSection: (id: string) => void;
  handleProjectsClick: () => void;
}

export const SCROLL_IDS       = ["inicio", "sobre", "habilidades", "trajetoria", "contato"];
export const FOOTER_SCROLL_IDS = ["sobre", "habilidades", "servicos", "formacao", "trajetoria", "contato"];

export const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1695048064952-44b984f2af6d?w=900&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=900&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=500&fit=crop&auto=format",
];
export const PROJECT_ALT    = ["Analytics dashboard", "Mobile app mockup", "Minimal desk setup", "Laptop with code"];
export const PROJECT_TECH   = [
  ["React", "Node.js", "PostgreSQL"],
  ["React Native", "TypeScript", "Firebase"],
  ["Next.js", "Tailwind CSS", "Framer Motion"],
  ["React", "TypeScript", "Tailwind CSS"],
];
export const PROJECT_GITHUB = [
  "https://github.com/lucasmontalvao1619",
  "https://github.com/lucasmontalvao1619",
  "https://github.com/lucasmontalvao1619",
  "https://github.com/lucasmontalvao1619",
];
export const PROJECT_LIVE = ["", "", "", ""];

export const PROJECT_SLUGS = [
  "sistema-gestao-imobiliaria",
  "duby",
  "portfolio-tauan",
  "portfolio-lucas",
];

export const PROJECT_DETAILS = [
  {
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
  {
    PT: {
      overview: "O Projeto DUBY é um aplicativo mobile de experiência social desenvolvido com React Native. Com foco em fluidez de animações e interações, o app oferece uma experiência de usuário refinada, com onboarding intuitivo e navegação gestual fluida.",
      problem: "Aplicativos sociais frequentemente negligenciam a qualidade das transições de tela e micro-interações, resultando em uma experiência de usuário fragmentada. O desafio era criar um app que parecesse nativo e responsivo em ambas as plataformas iOS e Android.",
      solution: "Utilizamos React Native com Expo, aproveitando o Reanimated 2 para animações performáticas na thread nativa. A integração com Firebase provê autenticação social, armazenamento em tempo real e push notifications, enquanto o design foi prototipado previamente no Figma.",
      architecture: "Stack mobile-first com React Native e Expo, TypeScript para type safety, Firebase como BaaS com Firestore, Auth e Storage, Reanimated 2 para animações e React Navigation para roteamento.",
      learnings: ["Animações performáticas com React Native Reanimated 2 na thread nativa", "Integração com Firebase Auth e Firestore para dados em tempo real", "Otimização de listas longas com FlatList virtualizada", "Arquitetura de componentes reutilizáveis para projetos mobile"],
    },
    EN: {
      overview: "The DUBY Project is a social experience mobile app built with React Native. Focused on animation fluidity and interactions, the app delivers a refined user experience with intuitive onboarding and smooth gesture navigation.",
      problem: "Social apps often neglect the quality of screen transitions and micro-interactions, resulting in a fragmented user experience. The challenge was to build an app that felt native and responsive on both iOS and Android platforms.",
      solution: "We used React Native with Expo, leveraging Reanimated 2 for performant native-thread animations. Firebase integration provides social authentication, real-time storage, and push notifications, with the design prototyped in Figma beforehand.",
      architecture: "Mobile-first stack with React Native and Expo, TypeScript for type safety, Firebase as BaaS (Firestore, Auth, Storage), Reanimated 2 for animations, and React Navigation for routing.",
      learnings: ["Performant animations with React Native Reanimated 2 on the native thread", "Firebase Auth and Firestore integration for real-time data", "Long list optimization with virtualized FlatList", "Reusable component architecture for mobile projects"],
    },
  },
  {
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
  {
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
];

export const PROJECT_GALLERY = [
  [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=700&fit=crop&auto=format",
  ],
  [
    "https://images.unsplash.com/photo-1695048064952-44b984f2af6d?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=700&fit=crop&auto=format",
  ],
  [
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=700&fit=crop&auto=format",
  ],
  [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=1200&h=700&fit=crop&auto=format",
  ],
];

type SkillItem = { name: string; Icon: React.ElementType };
export const SKILL_CARDS: { catIcon: React.ElementType; items: SkillItem[] }[] = [
  { catIcon: Server, items: [
    { name: "C#", Icon: CSharpIcon }, { name: "ASP.NET", Icon: SiDotnet },
    { name: "Node.js", Icon: SiNodedotjs }, { name: "Python", Icon: SiPython },
  ]},
  { catIcon: Monitor, items: [
    { name: "React", Icon: SiReact }, { name: "Next.js", Icon: SiNextdotjs },
    { name: "TypeScript", Icon: SiTypescript }, { name: "JavaScript", Icon: SiJavascript },
    { name: "Tailwind CSS", Icon: SiTailwindcss },
  ]},
  { catIcon: Database, items: [
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "SQL Server", Icon: SqlServerIcon },
    { name: "Azure",      Icon: AzureIcon },
  ]},
  { catIcon: Wrench, items: [
    { name: "Git", Icon: SiGit }, { name: "GitHub", Icon: SiGithub },
    { name: "Docker", Icon: SiDocker }, { name: "Postman", Icon: SiPostman },
    { name: "Power BI", Icon: PowerBIIcon }, { name: "Figma", Icon: SiFigma },
  ]},
];

export const IDENTITY = [
  "Pesquisador PIBIC/CNPq",
  "Desenvolvedor Full Stack",
  "Apaixonado por Automação",
  "Construindo Soluções Digitais",
  "Aprendizado Contínuo",
  "Resolução de Problemas",
];

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
};

export const MARQUEE = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "PostgreSQL", "SQL Server", "React Native",
  "Git", "Docker", "Tailwind CSS", "ASP.NET", "Azure", "Figma",
];

export const INFINITE_BAR_REPEATS = 8;

export const TRAJ_YEARS = ["2024", "2025", "2025", "2026", ""];

export const CONTACT_LINKS = [
  { icon: "github", label: "GitHub", href: "https://github.com/lucasmontalvao1619" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-montalv%C3%A3o-gon%C3%A7alves-de-oliveira-781998342/" },
  { icon: "mail", label: "E-mail", href: "mailto:lucasmontalvao2019@gmail.com" },
  { icon: "phone", label: "(79) 9 9609-1102", href: "tel:+5579996091102" },
] as const;

export const FOOTER_LINKS = CONTACT_LINKS.slice(0, 3);
