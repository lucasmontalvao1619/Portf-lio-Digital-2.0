import type { Lang, Translation } from "./types";

export const T = {
  PT: {
    status: "Disponível para novos projetos",
    tagline: "Construindo interfaces e sistemas onde lógica encontra estética.",
    btn_projects: "Ver Projetos",
    btn_contact: "Contato",
    btn_cv: "Baixar CV",

    nav_labels: ["Início", "Sobre", "Habilidades", "Serviços", "Formação", "Trajetória", "Contato", "Projetos"],

    s_about: "Sobre Mim",
    about_text: `Estudante de Ciência da Computação na Universidade Tiradentes, apaixonado por tecnologia e inovação. Desenvolvo sites, sistemas e soluções digitais com foco em desempenho, experiência do usuário e resolução de problemas reais.

Além do desenvolvimento de software, atuo em projetos de pesquisa científica por meio da Iniciação Científica, aplicando tecnologia, análise de dados e pensamento crítico para criar soluções fundamentadas e eficientes. Estou sempre em busca de novos desafios e oportunidades de aprendizado contínuo.`,

    s_skills: "Habilidades Técnicas",
    skills_subtitle: "Stack Utilizada",
    skill_cats: ["Backend", "Frontend", "Database & Cloud", "Ferramentas & Fluxo"],

    s_services: "Serviços",
    services: [
      { title: "Engenharia de Software", desc: "Desenvolvimento de aplicações e sistemas utilizando C#, ASP.NET Core e boas práticas de arquitetura, transformando requisitos em soluções escaláveis, seguras e bem estruturadas." },
      { title: "Desenvolvimento Front-End", desc: "Criação de interfaces modernas com React, Next.js e TypeScript, priorizando experiência do usuário, responsividade, acessibilidade e performance." },
      { title: "Pesquisa Científica & Inovação", desc: "Participação em projetos de Iniciação Científica, produção de artigos acadêmicos, análise de dados e desenvolvimento de soluções tecnológicas orientadas por metodologia científica." },
      { title: "Dados & Automação", desc: "Modelagem de bancos de dados, consultas SQL, construção de dashboards com Power BI e automação de processos para apoiar a tomada de decisão baseada em dados." },
    ],

    s_projects: "Projetos",
    projects_subtitle: "Trabalhos selecionados e produtos digitais.",
    project_filters: {
      all: "Todos",
      fullstack: "Full-stack",
      frontend: "Front-end",
      research: "Pesquisa",
      ui: "UI",
    },
    github_btn: "GitHub",
    live_btn: "Live Demo",
    proj_names: [
      "Sistema de Gestão Imobiliária",
      "Projeto DUBY",
      "Portfólio Tauan",
      "Portfólio Lucas Montalvão",
    ],
    proj_descs: [
      "Projeto em produção para gestão de imóveis, contratos, clientes e rotinas imobiliárias.",
      "Sistema web acadêmico para gestão empresarial, relatórios financeiros e dashboards.",
      "Landing page premium para personal trainer, com galeria, animações e canais de contato.",
      "Portfólio pessoal com design minimalista suíço e foco em performance.",
    ],

    s_education: "Formação",
    education: [
      { title: "Ciência da Computação — Universidade Tiradentes (UNIT)", period: "2024 — 2028", badge: "Graduação", desc: "Graduação em Ciência da Computação com foco em engenharia de software, desenvolvimento de sistemas, banco de dados, infraestrutura, pesquisa científica e resolução de problemas computacionais. Participação em projetos acadêmicos, iniciação científica e desenvolvimento de aplicações.", ongoing: true, featured: true, highlightLabel: "Principal Formação" },
      { title: "Fundamentos de C# e .NET — Balta.io", period: "2025", badge: "Formação Profissional", desc: "Formação voltada aos fundamentos da plataforma .NET, programação orientada a objetos, arquitetura de software, APIs, boas práticas de desenvolvimento e ecossistema C#.", ongoing: false },
      { title: "Lógica de Programação, HTML5, CSS3 e Python — Curso em Vídeo", period: "2023 — 2024", badge: "Base de Desenvolvimento", desc: "Formação responsável pela construção da base lógica e computacional, incluindo algoritmos, desenvolvimento web com HTML5 e CSS3, além dos fundamentos da programação utilizando Python.", ongoing: false },
      { title: "Cultura Inglesa + TOEFL", period: "Concluído", badge: "Idiomas", desc: "Formação em língua inglesa complementada pela certificação TOEFL, permitindo leitura técnica, documentação internacional, produção acadêmica e comunicação em ambientes profissionais globais.", ongoing: false },
    ],

    s_traj: "Trajetória",
    traj_labels: [
      "Início da graduação em Ciência da Computação",
      "Instrutor de Tecnologia",
      "Estágio em TI — FAPITEC",
      "Programa de Pesquisa Científica (PIBIC/CNPq)",
      "Desenvolvendo produtos de software",
    ],
    traj_descs: [
      "Ingresso no curso na Universidade Tiradentes.",
      "Facilitação de cursos de tecnologia para alunos do ensino médio.",
      "Suporte técnico e desenvolvimento de sistemas internos.",
      "Selecionado para o programa de iniciação científica com apoio do CNPq.",
      "Construindo produtos reais e evoluindo como desenvolvedor.",
    ],
    traj_today: "Hoje",

    s_contact: "Contato",
    contact_heading: "Vamos construir algo relevante juntos.",
    contact_address: "Endereço",
    contact_phone_lbl: "Telefone",
    f_name: "Nome",
    f_email: "E-mail",
    f_message: "Mensagem",
    f_send: "Enviar",
    f_sent: "Mensagem enviada",
    f_name_ph: "Seu nome",
    f_email_ph: "seu@email.com",
    f_msg_ph: "Sua mensagem...",

    s_identity: "Minha Essência",

    footer_tagline: "Construindo software e aprendendo todos os dias.",
    footer_site: "Site",
    footer_links: "Links",
    footer_rights: "Todos os direitos reservados.",
    footer_nav: ["Sobre", "Habilidades", "Serviços", "Formação", "Trajetória", "Contato"],
  },

  EN: {
    status: "Available for new projects",
    tagline: "Building interfaces and systems where logic meets aesthetics.",
    btn_projects: "View Projects",
    btn_contact: "Contact",
    btn_cv: "Download CV",

    nav_labels: ["Home", "About", "Skills", "Services", "Education", "Journey", "Contact", "Projects"],

    s_about: "About Me",
    about_text: "Passionate about technology and computing from an early age, I am a Computer Science student at Universidade Tiradentes. My goal is to turn ideas into software and needs into intelligent solutions, combining development, design and analytical thinking. I seek to build functional, well-structured and enjoyable applications, always focused on creating experiences that generate real value. In addition to software development, I work in scientific research through Scientific Initiation, participating in projects focused on applying technology to solve real-world problems. My experience includes scientific article production, bibliographic research, data analysis, research methodologies and the development of computational solutions with academic grounding. This experience strengthens my investigative ability, critical thinking and capacity to develop evidence-oriented projects. I believe in continuous learning as a tool for growth, constantly seeking to improve my technical and personal skills to face increasingly complex challenges, whether in software development, scientific research or the creation of innovative solutions.",

    s_skills: "Expertise",
    skills_subtitle: "Technologies I use to build modern solutions.",
    skill_cats: ["Backend", "Frontend", "Database & Cloud", "Tools & Workflow"],

    s_services: "Services",
    services: [
      { title: "Software Engineering", desc: "Development of applications and systems using C#, ASP.NET Core and solid architecture practices, turning requirements into scalable, secure and well-structured solutions." },
      { title: "Front-End Development", desc: "Creation of modern interfaces with React, Next.js and TypeScript, prioritizing user experience, responsiveness, accessibility and performance." },
      { title: "Scientific Research & Innovation", desc: "Participation in Scientific Initiation projects, academic article production, data analysis and development of technology solutions guided by scientific methodology." },
      { title: "Data & Automation", desc: "Database modeling, SQL queries, Power BI dashboard development and process automation to support data-driven decision-making." },
    ],

    s_projects: "Projects",
    projects_subtitle: "Selected works and digital products.",
    project_filters: {
      all: "All",
      fullstack: "Full-stack",
      frontend: "Front-end",
      research: "Research",
      ui: "UI",
    },
    github_btn: "GitHub",
    live_btn: "Live Demo",
    proj_names: [
      "Real Estate Management System",
      "DUBY Project",
      "Tauan Portfolio",
      "Lucas Montalvão Portfolio",
    ],
    proj_descs: [
      "Production-stage platform for managing properties, contracts, clients, and real estate workflows.",
      "Academic web system for business management, financial reports, and dashboards.",
      "Premium landing page for a personal trainer, with gallery, animations, and contact channels.",
      "Personal portfolio with Swiss minimalist design and focus on performance.",
    ],

    s_education: "Education",
    education: [
      { title: "Computer Science — Universidade Tiradentes (UNIT)", period: "2024 — 2028", badge: "Bachelor's Degree", desc: "Computer Science degree focused on software engineering, systems development, databases, infrastructure, scientific research and computational problem solving. Participation in academic projects, scientific initiation and application development.", ongoing: true, featured: true, highlightLabel: "Main Education" },
      { title: "C# and .NET Fundamentals — Balta.io", period: "2025", badge: "Professional Training", desc: "Training focused on .NET platform fundamentals, object-oriented programming, software architecture, APIs, development best practices and the C# ecosystem.", ongoing: false },
      { title: "Programming Logic, HTML5, CSS3 and Python — Curso em Vídeo", period: "2023 — 2024", badge: "Development Foundation", desc: "Training that built a logical and computational foundation, including algorithms, web development with HTML5 and CSS3, and programming fundamentals using Python.", ongoing: false },
      { title: "Cultura Inglesa + TOEFL", period: "Completed", badge: "Languages", desc: "English language education complemented by TOEFL certification, supporting technical reading, international documentation, academic writing and communication in global professional environments.", ongoing: false },
    ],

    s_traj: "Journey",
    traj_labels: [
      "Started Computer Science degree",
      "Technology Instructor",
      "IT Internship — FAPITEC",
      "Scientific Research Program (PIBIC/CNPq)",
      "Building software products",
    ],
    traj_descs: [
      "Enrolled at Universidade Tiradentes.",
      "Facilitated technology courses for high school students.",
      "Technical support and development of internal systems.",
      "Selected for the scientific initiation program supported by CNPq.",
      "Building real products and growing as a developer.",
    ],
    traj_today: "Now",

    s_contact: "Contact",
    contact_heading: "Let's build something relevant together.",
    contact_address: "Address",
    contact_phone_lbl: "Phone",
    f_name: "Name",
    f_email: "Email",
    f_message: "Message",
    f_send: "Send",
    f_sent: "Message sent",
    f_name_ph: "Your name",
    f_email_ph: "your@email.com",
    f_msg_ph: "Your message...",

    s_identity: "Who I Am",

    footer_tagline: "Building software and learning every day.",
    footer_site: "Site",
    footer_links: "Links",
    footer_rights: "All rights reserved.",
    footer_nav: ["About", "Skills", "Services", "Education", "Journey", "Contact"],
  },
} as const satisfies Record<Lang, Translation>;
