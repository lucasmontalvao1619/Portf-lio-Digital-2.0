import type { Lang, Translation } from "./types";

export const T = {
  PT: {
    status: "Disponível para novos projetos",
    tagline: "Construindo interfaces e sistemas onde lógica encontra estética.",
    btn_projects: "Ver Projetos",
    btn_contact: "Contato",
    btn_cv: "Baixar CV",

    nav_labels: ["Início", "Sobre", "Habilidades", "Trajetória", "Contato", "Projetos"],

    s_about: "Sobre Mim",
    about_text: "Desde cedo apaixonado por tecnologia e computação, sou estudante de Ciência da Computação na Universidade Tiradentes. Tenho como objetivo transformar ideias em software e necessidades em soluções inteligentes, unindo desenvolvimento, design e pensamento analítico. Busco construir aplicações funcionais, bem estruturadas e agradáveis de usar, sempre focado em criar experiências que gerem valor real. Acredito no aprendizado contínuo como ferramenta de evolução, buscando constantemente aprimorar minhas habilidades técnicas e pessoais para enfrentar desafios cada vez maiores.",

    s_skills: "Habilidades Técnicas",
    skills_subtitle: "Tecnologias que utilizo para construir soluções modernas.",
    skill_cats: ["Backend", "Frontend", "Database & Cloud", "Ferramentas & Fluxo"],

    s_services: "Serviços",
    services: [
      { title: "Desenvolvimento Front-End", desc: "Criação de interfaces web com React, Next.js e TypeScript, focando em interatividade, performance e robustez." },
      { title: "Desenvolvimento Back-End", desc: "Construção de APIs e sistemas com Node.js, ASP.NET e Python. Realizo requisições e testes utilizando o Postman." },
      { title: "Engenharia de Requisitos", desc: "Modelagem de requisitos por meio de casos de uso, diagramas UML e elaboração de documentos de especificação de sistemas." },
      { title: "Gestão de Processos", desc: "Gestão ágil com planejamento estratégico, aplicando técnicas para desenvolver e entregar soluções eficientes." },
    ],

    s_projects: "Projetos",
    projects_subtitle: "Trabalhos selecionados e produtos digitais.",
    github_btn: "GitHub",
    live_btn: "Live Demo",
    proj_names: [
      "Sistema de Gestão Imobiliária",
      "Projeto DUBY",
      "Portfólio Tauan",
      "Portfólio Lucas Montalvão",
    ],
    proj_descs: [
      "Plataforma completa para gestão de imóveis, contratos e clientes.",
      "Aplicativo mobile focado em experiência de usuário e fluidez.",
      "Portfólio pessoal desenvolvido para apresentação de trabalhos criativos.",
      "Portfólio pessoal com design minimalista suíço e foco em performance.",
    ],

    s_education: "Formação",
    education: [
      { title: "Ciência da Computação — UNIT", period: "Ago 2024 — Jun 2028", desc: "Na universidade, desenvolvo habilidades fullstack, infraestrutura, engenharia de requisitos, fundamentos de programação e participo de hackathons.", ongoing: false },
      { title: "Desenvolvimento Web — Udemy", period: "Dez 2024 — Fev 2025", desc: "Foco em JavaScript moderno, com aprofundamento em Node.js, Express, Vue e recursos avançados do ESNext para aplicações web.", ongoing: false },
      { title: "Curso em Vídeo — CEV", period: "Jun 2023 — Dez 2024", desc: "Cursos na plataforma explorando HTML5, CSS3, JavaScript, lógica de programação, Python e outras áreas essenciais.", ongoing: false },
      { title: "Desenvolvimento com React — Udemy", period: "Jun 2025 — Em andamento", desc: "Desenvolvimento com React, Next, Nest, Tailwind e outras tecnologias, além de criação e consumo de APIs.", ongoing: true },
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

    s_beyond: "Além do Código",
    beyond_subtitle: "Desenvolvimento, pesquisa, produção acadêmica e aprendizado contínuo além da programação.",
    beyond_footer: "Acredito que bons sistemas nascem da combinação entre código, pesquisa, clareza e entendimento real do problema.",
    beyond_highlights_label: "Destaques",

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

    nav_labels: ["Home", "About", "Skills", "Journey", "Contact", "Projects"],

    s_about: "About Me",
    about_text: "Passionate about technology and computing from an early age, I am a Computer Science student at Universidade Tiradentes. My goal is to turn ideas into software and needs into intelligent solutions, combining development, design and analytical thinking. I seek to build functional, well-structured and enjoyable applications, always focused on creating experiences that generate real value. I believe in continuous learning as a tool for growth, constantly seeking to improve my technical and personal skills to face ever greater challenges.",

    s_skills: "Expertise",
    skills_subtitle: "Technologies I use to build modern solutions.",
    skill_cats: ["Backend", "Frontend", "Database & Cloud", "Tools & Workflow"],

    s_services: "Services",
    services: [
      { title: "Front-End Development", desc: "Building web interfaces with React, Next.js and TypeScript, focused on interactivity, performance and robustness." },
      { title: "Back-End Development", desc: "Building APIs and systems with Node.js, ASP.NET and Python. Testing and API requests with Postman." },
      { title: "Requirements Engineering", desc: "Requirements modeling through use cases, UML diagrams and structured system specification documents." },
      { title: "Process Management", desc: "Agile management with strategic planning, applying techniques to efficiently develop and deliver software solutions." },
    ],

    s_projects: "Projects",
    projects_subtitle: "Selected works and digital products.",
    github_btn: "GitHub",
    live_btn: "Live Demo",
    proj_names: [
      "Real Estate Management System",
      "DUBY Project",
      "Tauan Portfolio",
      "Lucas Montalvão Portfolio",
    ],
    proj_descs: [
      "Complete platform for managing properties, contracts, and clients.",
      "Mobile application focused on user experience and fluidity.",
      "Personal portfolio developed to showcase creative work.",
      "Personal portfolio with Swiss minimalist design and focus on performance.",
    ],

    s_education: "Education",
    education: [
      { title: "Computer Science — UNIT", period: "Aug 2024 — Jun 2028", desc: "Developing fullstack, infrastructure, requirements engineering and programming fundamentals at university, actively participating in hackathons.", ongoing: false },
      { title: "Web Development — Udemy", period: "Dec 2024 — Feb 2025", desc: "Focus on modern JavaScript, deep dives into Node.js, Express, Vue and advanced ESNext features for web applications.", ongoing: false },
      { title: "Curso em Vídeo — CEV", period: "Jun 2023 — Dec 2024", desc: "Completed several courses exploring HTML5, CSS3, JavaScript, programming logic, Python and other essential areas.", ongoing: false },
      { title: "React Development — Udemy", period: "Jun 2025 — Ongoing", desc: "Web development with React, Next, Nest, Tailwind and other technologies, including API creation and consumption.", ongoing: true },
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

    s_beyond: "Beyond the Code",
    beyond_subtitle: "Development, research, academic production, and continuous learning beyond programming.",
    beyond_footer: "I believe great systems are born from the combination of code, research, clarity, and a genuine understanding of the problem.",
    beyond_highlights_label: "Highlights",

    footer_tagline: "Building software and learning every day.",
    footer_site: "Site",
    footer_links: "Links",
    footer_rights: "All rights reserved.",
    footer_nav: ["About", "Skills", "Services", "Education", "Journey", "Contact"],
  },
} as const satisfies Record<Lang, Translation>;
