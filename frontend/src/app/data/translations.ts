import type { Lang, Translation } from "./types";

export const T = {
  PT: {
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Habilidades",
      services: "Serviços",
      education: "Formação",
      journey: "Trajetória",
      contact: "Contato",
      projects: "Projetos",
    },

    hero: {
      status: "Disponível para novos projetos",
      tagline: "Construindo interfaces e sistemas onde lógica encontra estética.",
      ctaProjects: "Ver Projetos",
      ctaContact: "Contato",
      ctaDownloadCv: "Baixar CV",
    },

    about: {
      title: "Sobre Mim",
      text: `Estudante de Ciência da Computação na Universidade Tiradentes, apaixonado por tecnologia e inovação. Desenvolvo sites, sistemas e soluções digitais com foco em desempenho, experiência do usuário e resolução de problemas reais.

Além do desenvolvimento de software, atuo em projetos de pesquisa científica por meio da Iniciação Científica, aplicando tecnologia, análise de dados e pensamento crítico para criar soluções fundamentadas e eficientes. Estou sempre em busca de novos desafios e oportunidades de aprendizado contínuo.`,
    },

    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Stack Utilizada",
      categories: ["Backend", "Frontend", "Database & Cloud", "Ferramentas & Fluxo"],
    },

    services: {
      title: "Serviços",
      items: [
        { title: "Engenharia de Software", desc: "Desenvolvimento de aplicações e sistemas utilizando C#, ASP.NET Core e boas práticas de arquitetura, transformando requisitos em soluções escaláveis, seguras e bem estruturadas." },
        { title: "Desenvolvimento Front-End", desc: "Criação de interfaces modernas com React, Next.js e TypeScript, priorizando experiência do usuário, responsividade, acessibilidade e performance." },
        { title: "Pesquisa Científica & Inovação", desc: "Participação em projetos de Iniciação Científica, produção de artigos acadêmicos, análise de dados e desenvolvimento de soluções tecnológicas orientadas por metodologia científica." },
        { title: "Dados & Automação", desc: "Modelagem de bancos de dados, consultas SQL, construção de dashboards com Power BI e automação de processos para apoiar a tomada de decisão baseada em dados." },
      ],
    },

    projects: {
      title: "Projetos",
      subtitle: "Trabalhos selecionados e produtos digitais.",
      filters: {
        all: "Todos",
        fullstack: "Full-stack",
        frontend: "Front-end",
        research: "Pesquisa",
        ui: "UI",
      },
      githubLabel: "GitHub",
      liveLabel: "Live Demo",
      names: [
        "Sistema de Gestão Imobiliária",
        "Projeto DUBY",
        "Portfólio Tauan",
        "Portfólio Lucas Montalvão",
      ],
      descriptions: [
        "Projeto em produção para gestão de imóveis, contratos, clientes e rotinas imobiliárias.",
        "Sistema web acadêmico para gestão empresarial, relatórios financeiros e dashboards.",
        "Landing page premium para personal trainer, com galeria, animações e canais de contato.",
        "Portfólio fullstack com frontend React na Vercel, contato via Serverless Function e API .NET dedicada.",
      ],
    },

    education: {
      title: "Formação",
      items: [
        { title: "Ciência da Computação — Universidade Tiradentes (UNIT)", period: "2024 — 2028", badge: "Graduação", desc: "Graduação em Ciência da Computação com foco em engenharia de software, desenvolvimento de sistemas, banco de dados, infraestrutura, pesquisa científica e resolução de problemas computacionais. Participação em projetos acadêmicos, iniciação científica e desenvolvimento de aplicações.", ongoing: true, featured: true, highlightLabel: "Principal Formação" },
        { title: "Fundamentos de C# e .NET — Balta.io", period: "2025", badge: "Formação Profissional", desc: "Formação voltada aos fundamentos da plataforma .NET, programação orientada a objetos, arquitetura de software, APIs, boas práticas de desenvolvimento e ecossistema C#.", ongoing: false },
        { title: "Lógica de Programação, HTML5, CSS3 e Python — Curso em Vídeo", period: "2023 — 2024", badge: "Base de Desenvolvimento", desc: "Formação responsável pela construção da base lógica e computacional, incluindo algoritmos, desenvolvimento web com HTML5 e CSS3, além dos fundamentos da programação utilizando Python.", ongoing: false },
        { title: "Cultura Inglesa + TOEFL", period: "Concluído", badge: "Idiomas", desc: "Formação em língua inglesa complementada pela certificação TOEFL, permitindo leitura técnica, documentação internacional, produção acadêmica e comunicação em ambientes profissionais globais.", ongoing: false },
      ],
    },

    journey: {
      title: "Trajetória",
      labels: [
        "Início da graduação em Ciência da Computação",
        "Instrutor de Tecnologia",
        "Estágio em TI — FAPITEC",
        "Programa de Pesquisa Científica (PIBIC/CNPq)",
        "Desenvolvendo produtos de software",
      ],
      descriptions: [
        "Ingresso no curso na Universidade Tiradentes.",
        "Facilitação de cursos de tecnologia para alunos do ensino médio.",
        "Suporte técnico e desenvolvimento de sistemas internos.",
        "Selecionado para o programa de iniciação científica com apoio do CNPq.",
        "Construindo produtos reais e evoluindo como desenvolvedor.",
      ],
      today: "Hoje",
    },

    contact: {
      title: "Contato",
      heading: "Vamos construir algo relevante juntos.",
      address: "Endereço",
      phoneLabel: "Telefone",
      form: {
        name: "Nome",
        email: "E-mail",
        message: "Mensagem",
        send: "Enviar",
        sent: "Mensagem enviada",
        namePlaceholder: "Seu nome",
        emailPlaceholder: "seu@email.com",
        messagePlaceholder: "Sua mensagem...",
      },
    },

    github: {
      title: "Atividade no GitHub",
      subtitle: "Dados ao vivo, cacheados via API .NET.",
      repos: "Repos",
      followers: "Seguidores",
      following: "Seguindo",
      openProfile: "Abrir perfil",
      totalRepos: "Repositórios",
      totalStars: "Estrelas",
      totalForks: "Forks",
      topLanguages: "Linguagens mais usadas",
      topRepos: "Repositórios em destaque",
    },

    footer: {
      tagline: "Construindo software e aprendendo todos os dias.",
      siteLabel: "Site",
      linksLabel: "Links",
      rights: "Todos os direitos reservados.",
    },
  },

  EN: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      services: "Services",
      education: "Education",
      journey: "Journey",
      contact: "Contact",
      projects: "Projects",
    },

    hero: {
      status: "Available for new projects",
      tagline: "Building interfaces and systems where logic meets aesthetics.",
      ctaProjects: "View Projects",
      ctaContact: "Contact",
      ctaDownloadCv: "Download CV",
    },

    about: {
      title: "About Me",
      text: `Computer Science student at Universidade Tiradentes, passionate about technology and innovation. I build websites, systems and digital solutions focused on performance, user experience and solving real problems.

Beyond software development, I work in scientific research through Scientific Initiation, applying technology, data analysis and critical thinking to create well-founded, efficient solutions. I'm always looking for new challenges and opportunities for continuous learning.`,
    },

    skills: {
      title: "Expertise",
      subtitle: "Technologies I use to build modern solutions.",
      categories: ["Backend", "Frontend", "Database & Cloud", "Tools & Workflow"],
    },

    services: {
      title: "Services",
      items: [
        { title: "Software Engineering", desc: "Development of applications and systems using C#, ASP.NET Core and solid architecture practices, turning requirements into scalable, secure and well-structured solutions." },
        { title: "Front-End Development", desc: "Creation of modern interfaces with React, Next.js and TypeScript, prioritizing user experience, responsiveness, accessibility and performance." },
        { title: "Scientific Research & Innovation", desc: "Participation in Scientific Initiation projects, academic article production, data analysis and development of technology solutions guided by scientific methodology." },
        { title: "Data & Automation", desc: "Database modeling, SQL queries, Power BI dashboard development and process automation to support data-driven decision-making." },
      ],
    },

    projects: {
      title: "Projects",
      subtitle: "Selected works and digital products.",
      filters: {
        all: "All",
        fullstack: "Full-stack",
        frontend: "Front-end",
        research: "Research",
        ui: "UI",
      },
      githubLabel: "GitHub",
      liveLabel: "Live Demo",
      names: [
        "Real Estate Management System",
        "DUBY Project",
        "Tauan Portfolio",
        "Lucas Montalvão Portfolio",
      ],
      descriptions: [
        "Production-stage platform for managing properties, contracts, clients, and real estate workflows.",
        "Academic web system for business management, financial reports, and dashboards.",
        "Premium landing page for a personal trainer, with gallery, animations, and contact channels.",
        "Fullstack portfolio: React frontend on Vercel, contact via Serverless Function, and a dedicated .NET API.",
      ],
    },

    education: {
      title: "Education",
      items: [
        { title: "Computer Science — Universidade Tiradentes (UNIT)", period: "2024 — 2028", badge: "Bachelor's Degree", desc: "Computer Science degree focused on software engineering, systems development, databases, infrastructure, scientific research and computational problem solving. Participation in academic projects, scientific initiation and application development.", ongoing: true, featured: true, highlightLabel: "Main Education" },
        { title: "C# and .NET Fundamentals — Balta.io", period: "2025", badge: "Professional Training", desc: "Training focused on .NET platform fundamentals, object-oriented programming, software architecture, APIs, development best practices and the C# ecosystem.", ongoing: false },
        { title: "Programming Logic, HTML5, CSS3 and Python — Curso em Vídeo", period: "2023 — 2024", badge: "Development Foundation", desc: "Training that built a logical and computational foundation, including algorithms, web development with HTML5 and CSS3, and programming fundamentals using Python.", ongoing: false },
        { title: "Cultura Inglesa + TOEFL", period: "Completed", badge: "Languages", desc: "English language education complemented by TOEFL certification, supporting technical reading, international documentation, academic writing and communication in global professional environments.", ongoing: false },
      ],
    },

    journey: {
      title: "Journey",
      labels: [
        "Started Computer Science degree",
        "Technology Instructor",
        "IT Internship — FAPITEC",
        "Scientific Research Program (PIBIC/CNPq)",
        "Building software products",
      ],
      descriptions: [
        "Enrolled at Universidade Tiradentes.",
        "Facilitated technology courses for high school students.",
        "Technical support and development of internal systems.",
        "Selected for the scientific initiation program supported by CNPq.",
        "Building real products and growing as a developer.",
      ],
      today: "Now",
    },

    contact: {
      title: "Contact",
      heading: "Let's build something relevant together.",
      address: "Address",
      phoneLabel: "Phone",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        sent: "Message sent",
        namePlaceholder: "Your name",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Your message...",
      },
    },

    github: {
      title: "GitHub Activity",
      subtitle: "Live data, cached through the .NET API.",
      repos: "Repos",
      followers: "Followers",
      following: "Following",
      openProfile: "Open profile",
      totalRepos: "Repositories",
      totalStars: "Stars",
      totalForks: "Forks",
      topLanguages: "Top languages",
      topRepos: "Featured repositories",
    },

    footer: {
      tagline: "Building software and learning every day.",
      siteLabel: "Site",
      linksLabel: "Links",
      rights: "All rights reserved.",
    },
  },
} as const satisfies Record<Lang, Translation>;
