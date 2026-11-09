export const translations = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      architecture: "Architecture",
      stack: "Stack",
      api: "API",
      projects: "Projects",
      contact: "Contact",
      search: "Search",
    },
    hero: {
      status: "Open to international opportunities",
      greeting: "Hello, world. I'm",
      firstName: "José",
      lastName: "Otávio",
      roles: [
        "Backend Developer",
        "API Designer",
        "Database Modeler",
        "Problem Solver",
      ],
      subtitle:
        "I design and build reliable backend systems: APIs, integrations, databases and data pipelines that power real products. I turn messy requirements into clean, well-modeled, maintainable code.",
      cta: "View My Work",
      cv: "Download CV",
      scroll: "scroll",
    },
    about: {
      label: "01 // about",
      title: "About",
      titleHighlight: "Me",
      heading: "Backend Developer & Problem Solver",
      paragraph1:
        "I'm a Computer Engineering student at USP with 2+ years of professional experience. I specialize in robust APIs, third-party integrations, data pipelines and well-structured databases. I've shipped to real customers in Brazil, Argentina, Chile and Mexico.",
      paragraph2:
        "I'm passionate about solving complex problems with clean, efficient code, and I'm constantly learning new tools and practices to build systems that are reliable, secure, and easy to maintain.",
      getInTouch: "Get In Touch",
      downloadCv: "Download CV",
      card1Title: "Backend Development",
      card1Desc:
        "Building robust APIs and scalable server-side applications with modern frameworks and best practices.",
      card2Title: "Database Design",
      card2Desc:
        "Designing efficient schemas, optimizing queries, and managing data architecture for performance and reliability.",
      card3Title: "System Architecture",
      card3Desc:
        "Architecting scalable, secure systems and leading projects from design to deployment.",
      stats: {
        years: "years of experience",
        projects: "backend & data projects",
        languages: "backend languages",
        databases: "database engines",
      },
    },
    exp: {
      label: "02 // experience",
      title: "Real-World",
      titleHighlight: "Impact",
      subtitle:
        "Shipping software to real customers: API integrations, performance and data.",
      caseLabel: "Flagship case study",
      ifood: {
        title: "iFood API Integration",
        company: "Visio.ai",
        problemTitle: "The problem",
        problem:
          "Restaurant clients already saw their physical store in Visio, but their delivery business was a blind spot. They couldn't tell what delivery cost, what it earned, or how it related to in-store sales.",
        didTitle: "What I did",
        did: "I proposed pulling data from the iFood API and turning it into inferences about where to invest time and money. I owned it end to end, alone, in my second year of university: partner contact, approval forms and interviews, tests, the frontend, and the backend demo to iFood, through to approval and integration into the platform.",
        resultTitle: "The result",
        result:
          "Clients loved it and the delivery blind spot was closed. The feature helped close large contracts.",
        steps: ["Discovery", "iFood approval", "API ingestion", "Inference", "Dashboard"],
        solo: "100% solo",
      },
      perfTitle: "Performance wins",
      loadLabel: "Page load time",
      loadDesc:
        "The system took 4 s to load a page. I traced it to exhaustive, unnecessary database calls and removed them.",
      loadFaster: "~2000x faster",
      syncLabel: "Daily data sync",
      syncDesc:
        "A daily job copied data from BigQuery into Supabase to keep it consistent and took 3 hours. After reworking it, it takes 5 minutes.",
      syncFaster: "~36x faster",
      before: "before",
      after: "after",
      intlTitle: "International clients",
      intlDesc:
        "Helped close contracts with clients in Argentina, Chile and Mexico, handling conversations in English and Spanish.",
      timelineTitle: "Where I've worked",
      educationTitle: "Education",
      languagesTitle: "Languages",
      jobs: {
        1: {
          role: "Junior Backend Developer",
          org: "Centro de Pesquisas Avançadas Wernher von Braun",
          period: "Jun 2026 – Present",
          bullets: [
            "Build and integrate backend services and AI-powered features in C#/.NET, from feature implementation to system integration.",
          ],
        },
        2: {
          role: "Web Developer & Tool Developer",
          org: "Visio.ai (Growth Team)",
          period: "Nov 2024 – Jun 2026",
          bullets: [
            "Designed and built the iFood API integration end to end (see case study above).",
            "Cut page load from 4 s to 2 ms and a daily data sync from 3 h to 5 min.",
            "Built internal back-office tooling with AI-driven automation and owned the marketing website (performance, SEO, conversion).",
          ],
        },
        3: {
          role: "Systems Development Intern",
          org: "University of São Paulo, School of Management (CODAGE)",
          period: "Nov 2024 – Apr 2026",
          bullets: [
            "Built and maintained the department's website and an interactive dashboard for training data analysis.",
          ],
        },
        5: {
          role: "Founder & Developer",
          org: "TechRamos Solutions",
          period: "Apr 2024 – Present",
          bullets: [
            "Founded a small technology consultancy that builds custom websites and management systems for small businesses, on monthly or one-time plans.",
          ],
        },
        4: {
          role: "Technical Board Member",
          org: "SAEComp, Computer Engineering Student Union (USP São Carlos)",
          period: "Feb 2024 – Nov 2025",
          bullets: [
            "Built attendance-tracking automation for meetings and events and maintained the official website.",
          ],
        },
      },
      education: {
        1: {
          title: "B.Eng. Computer Engineering",
          org: "University of São Paulo (USP)",
          period: "2024 – 2028 (in progress)",
        },
        2: {
          title: "B.Sc. Systems Analysis and Development",
          org: "UNIASSELVI",
          period: "2026 – 2027 (expected)",
        },
      },
      languages: {
        pt: "Portuguese · Native",
        en: "English · Upper-Intermediate (B2)",
        es: "Spanish · Intermediate",
      },
    },
    arch: {
      label: "03 // architecture",
      title: "How I Structure",
      titleHighlight: "Backends",
      subtitle:
        "A typical request flow in the systems I build. Packets are requests (green) and responses (cyan). Hover or tap a node to see what I care about at each layer.",
      hint: "Hover or tap a node",
      nodes: {
        client: {
          title: "Client",
          desc: "Web, mobile or another service. I design contracts first: clear resources, consistent errors, versioned endpoints.",
        },
        api: {
          title: "REST API",
          desc: "Routing, validation, authentication and rate limiting at the edge so bad input never reaches business logic.",
        },
        service: {
          title: "Service Layer",
          desc: "Where the business rules live: small, testable units with clear boundaries and no framework leakage.",
        },
        cache: {
          title: "Cache",
          desc: "Hot reads served from memory with explicit TTLs and invalidation, trading freshness for latency on purpose.",
        },
        db: {
          title: "Database",
          desc: "Normalized schemas, proper indexes, migrations and transactions. Queries are measured, not guessed.",
        },
        queue: {
          title: "Queue / Jobs",
          desc: "Slow or unreliable work goes async: retries, idempotency and dead-letter handling instead of blocking requests.",
        },
      },
    },
    stack: {
      label: "04 // stack",
      title: "Tech",
      titleHighlight: "Stack",
      subtitle:
        "The tools I reach for to design, build and ship backend systems.",
      layers: {
        languages: "Languages",
        backend: "Backend & APIs",
        data: "Data & Storage",
        tooling: "Tooling & DevOps",
        frontend: "Frontend (secondary)",
      },
    },
    api: {
      label: "05 // playground",
      title: "Try My",
      titleHighlight: "API",
      subtitle:
        "A tiny mock API running right in your browser. Pick an endpoint, send a request and inspect the response.",
      note: "Responses are simulated client-side. No data leaves your browser.",
      send: "Send request",
      sending: "Waiting for response...",
      copy: "Copy cURL",
      copied: "Copied!",
      endpoints: "Endpoints",
      response: "Response",
    },
    projects: {
      label: "06 // projects",
      title: "Featured",
      titleHighlight: "Projects",
      subtitle:
        "Backend and data projects, each built with attention to reliability, correctness and clean modeling.",
      viewGithub: "Check My Github",
      rows: "rows returned",
      source: "Source",
      demo: "Live demo",
      items: {
        1: {
          title: "Itaú Backend Challenge",
          description:
            "Solution to Itaú's backend take-home challenge: a REST API that records transactions and computes real-time statistics (sum, average, min, max) with proper validation and error handling.",
        },
        2: {
          title: "TaskMaster",
          description:
            "Full-stack task management app with server-side authentication and per-user task CRUD, built with Flask, Flask-Login and SQLAlchemy.",
        },
        3: {
          title: "Portfolio Selection Models",
          description:
            "Backtests of factor-based stock ranking strategies (ROIC, momentum, volatility) for portfolio selection against the IBOVESPA benchmark.",
        },
        4: {
          title: "Quantitative Investment Strategies",
          description:
            "Machine learning models for monthly asset allocation and technical-indicator trading signals, evaluated with honest backtest reporting.",
        },
        6: {
          title: "Sales Prediction ML",
          description:
            "Machine learning pipeline that compares Linear Regression and Random Forest to predict sales from advertising spend and auto-selects the best model by R².",
        },
        7: {
          title: "PicPay Wallet Transfers",
          description:
            "PicPay's backend challenge: a money-transfer service between users and merchants (POST /transfer) built with hexagonal architecture, PostgreSQL, Redis and queues, fully containerized and documented with ADRs and OpenAPI.",
        },
        8: {
          title: "FlowForge",
          description:
            "Workflow orchestration platform (early stage): NestJS API with JWT auth and a fully designed PostgreSQL schema with workspace-scoped Row Level Security. Live demo available.",
        },
        9: {
          title: "Financial Sentiment Research",
          description:
            "Undergraduate research at ICMC-USP: a recommendation system for ETF trading that combines FinBERT-PT-BR sentiment analysis, a Scrapy + MongoDB news pipeline and reinforcement learning.",
        },
        10: {
          title: "Distributed Kanban",
          description:
            "Real-time collaborative Kanban board in pure C: a TCP server with POSIX sockets and pthreads that broadcasts every change to all connected clients.",
        },
        11: {
          title: "CTF Write-ups",
          description:
            "Documented solutions to web-security CTF challenges: client-side tampering, encodings and ciphers, HTTP fuzzing, source review and log analysis. The lesson: never trust the client.",
        },
      },
    },
    contact: {
      label: "07 // contact",
      title: "Get In",
      titleHighlight: "Touch",
      subtitle:
        "Hiring, or have a project in mind? Send a request. I'm open to international opportunities and always happy to talk.",
      infoTitle: "Contact Information",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
      locationValue: "São Carlos, SP, Brazil",
      connect: "Connect With Me",
      formTitle: "POST /contact",
      nameLabel: "name",
      namePlaceholder: "Ada Lovelace",
      emailFieldLabel: "email",
      emailPlaceholder: "ada@company.com",
      messageLabel: "message",
      messagePlaceholder: "Hi José, we're hiring for...",
      send: "Send Request",
      sending: "Sending...",
      toastTitle: "Opening your email client...",
      toastDesc: "Send the pre-filled message to reach me directly.",
    },
    palette: {
      placeholder: "Type a command or search...",
      empty: "No results.",
      goTo: "Go to",
      actions: "Actions",
      language: "Switch language to Português",
      cv: "Download CV",
      github: "Open GitHub",
      linkedin: "Open LinkedIn",
      email: "Send an email",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with React + Tailwind. API responses are mocked.",
    },
    notFound: {
      title: "404",
      message: "Oops! This page doesn't exist.",
      backHome: "Back to Home",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      architecture: "Arquitetura",
      stack: "Stack",
      api: "API",
      projects: "Projetos",
      contact: "Contato",
      search: "Buscar",
    },
    hero: {
      status: "Aberto a oportunidades internacionais",
      greeting: "Olá, mundo. Eu sou",
      firstName: "José",
      lastName: "Otávio",
      roles: [
        "Desenvolvedor Back-end",
        "Designer de APIs",
        "Modelador de Bancos de Dados",
        "Solucionador de Problemas",
      ],
      subtitle:
        "Eu projeto e construo sistemas de back-end confiáveis: APIs, integrações, bancos de dados e pipelines de dados que sustentam produtos reais. Transformo requisitos bagunçados em código limpo, bem modelado e fácil de manter.",
      cta: "Ver Meus Projetos",
      cv: "Baixar Currículo",
      scroll: "rolar",
    },
    about: {
      label: "01 // sobre",
      title: "Sobre",
      titleHighlight: "Mim",
      heading: "Desenvolvedor Back-end & Solucionador de Problemas",
      paragraph1:
        "Sou estudante de Engenharia de Computação na USP com mais de 2 anos de experiência profissional. Sou especializado em APIs robustas, integrações com sistemas de terceiros, pipelines de dados e bancos de dados bem estruturados. Já entreguei para clientes reais no Brasil, Argentina, Chile e México.",
      paragraph2:
        "Sou apaixonado por resolver problemas complexos com código limpo e eficiente, e estou sempre aprendendo novas ferramentas e práticas para construir sistemas confiáveis, seguros e fáceis de manter.",
      getInTouch: "Entre em Contato",
      downloadCv: "Baixar Currículo",
      card1Title: "Desenvolvimento Back-end",
      card1Desc:
        "Construção de APIs robustas e aplicações server-side escaláveis com frameworks modernos e boas práticas.",
      card2Title: "Modelagem de Banco de Dados",
      card2Desc:
        "Projeto de schemas eficientes, otimização de queries e gerenciamento da arquitetura de dados com foco em performance e confiabilidade.",
      card3Title: "Arquitetura de Sistemas",
      card3Desc:
        "Arquitetura de sistemas escaláveis e seguros, liderando projetos da concepção até a implantação.",
      stats: {
        years: "anos de experiência",
        projects: "projetos back-end e dados",
        languages: "linguagens back-end",
        databases: "bancos de dados",
      },
    },
    exp: {
      label: "02 // experiência",
      title: "Impacto no",
      titleHighlight: "Mundo Real",
      subtitle:
        "Software entregue para clientes reais: integrações de API, performance e dados.",
      caseLabel: "Case principal",
      ifood: {
        title: "Integração com a API do iFood",
        company: "Visio.ai",
        problemTitle: "O problema",
        problem:
          "Os clientes (restaurantes) já viam a loja física no Visio, mas o delivery era um ponto cego. Eles não sabiam quanto o delivery custava, quanto rendia, nem como se encaixava nas vendas da loja.",
        didTitle: "O que eu fiz",
        did: "Propus usar a API do iFood para puxar os dados e gerar inferências sobre onde investir tempo e dinheiro. Conduzi tudo de ponta a ponta, sozinho, no segundo ano da faculdade: contato com o parceiro, formulários de aprovação e entrevistas, testes, o front-end e a apresentação do back-end ao iFood, até a aprovação e a integração com a plataforma.",
        resultTitle: "O resultado",
        result:
          "Os clientes adoraram e o ponto cego do delivery foi resolvido. A funcionalidade ajudou a fechar contratos grandes.",
        steps: ["Descoberta", "Aprovação iFood", "Ingestão da API", "Inferência", "Dashboard"],
        solo: "100% sozinho",
      },
      perfTitle: "Ganhos de performance",
      loadLabel: "Tempo de carregamento",
      loadDesc:
        "O sistema levava 4 s para carregar uma página. Descobri chamadas excessivas e desnecessárias ao banco de dados e as eliminei.",
      loadFaster: "~2000x mais rápido",
      syncLabel: "Sincronização diária de dados",
      syncDesc:
        "Um job diário copiava dados do BigQuery para o Supabase para manter tudo íntegro e levava 3 horas. Depois de reestruturar, leva 5 minutos.",
      syncFaster: "~36x mais rápido",
      before: "antes",
      after: "depois",
      intlTitle: "Clientes internacionais",
      intlDesc:
        "Ajudei a fechar contratos com clientes da Argentina, Chile e México, conduzindo conversas em inglês e espanhol.",
      timelineTitle: "Onde já trabalhei",
      educationTitle: "Formação",
      languagesTitle: "Idiomas",
      jobs: {
        1: {
          role: "Desenvolvedor Back-end Júnior",
          org: "Centro de Pesquisas Avançadas Wernher von Braun",
          period: "Jun 2026 – Presente",
          bullets: [
            "Desenvolvo e integro serviços back-end e funcionalidades com IA em C#/.NET, da implementação à integração entre sistemas.",
          ],
        },
        2: {
          role: "Desenvolvedor Web & de Ferramentas",
          org: "Visio.ai (Time de Growth)",
          period: "Nov 2024 – Jun 2026",
          bullets: [
            "Projetei e construí a integração com a API do iFood de ponta a ponta (veja o case acima).",
            "Reduzi o carregamento de página de 4 s para 2 ms e uma sincronização diária de dados de 3 h para 5 min.",
            "Construí ferramentas internas com automação por IA e cuidei do site institucional (performance, SEO, conversão).",
          ],
        },
        3: {
          role: "Estagiário de Desenvolvimento de Sistemas",
          org: "Universidade de São Paulo, Escola de Administração (CODAGE)",
          period: "Nov 2024 – Abr 2026",
          bullets: [
            "Construí e mantive o site do departamento e um dashboard interativo para análise de dados de treinamento.",
          ],
        },
        5: {
          role: "Fundador & Desenvolvedor",
          org: "TechRamos Solutions",
          period: "Abr 2024 – Presente",
          bullets: [
            "Fundei uma consultoria de tecnologia que desenvolve sites e sistemas de gestão sob medida para pequenas empresas, em planos mensais ou pontuais.",
          ],
        },
        4: {
          role: "Membro da Diretoria Técnica",
          org: "SAEComp, Grêmio da Engenharia de Computação (USP São Carlos)",
          period: "Fev 2024 – Nov 2025",
          bullets: [
            "Construí automação de controle de presença para reuniões e eventos e mantive o site oficial.",
          ],
        },
      },
      education: {
        1: {
          title: "Engenharia de Computação",
          org: "Universidade de São Paulo (USP)",
          period: "2024 – 2028 (em andamento)",
        },
        2: {
          title: "Análise e Desenvolvimento de Sistemas",
          org: "UNIASSELVI",
          period: "2026 – 2027 (previsto)",
        },
      },
      languages: {
        pt: "Português · Nativo",
        en: "Inglês · Intermediário-avançado (B2)",
        es: "Espanhol · Intermediário",
      },
    },
    arch: {
      label: "03 // arquitetura",
      title: "Como Eu Estruturo",
      titleHighlight: "Back-ends",
      subtitle:
        "O fluxo típico de uma requisição nos sistemas que construo. Pacotes verdes são requisições e ciano são respostas. Passe o mouse ou toque em um nó para ver o que me importa em cada camada.",
      hint: "Passe o mouse ou toque em um nó",
      nodes: {
        client: {
          title: "Cliente",
          desc: "Web, mobile ou outro serviço. Eu projeto o contrato primeiro: recursos claros, erros consistentes, endpoints versionados.",
        },
        api: {
          title: "API REST",
          desc: "Roteamento, validação, autenticação e rate limiting na borda para que entradas ruins nunca cheguem à regra de negócio.",
        },
        service: {
          title: "Camada de Serviço",
          desc: "Onde vivem as regras de negócio: unidades pequenas, testáveis, com fronteiras claras e sem vazamento de framework.",
        },
        cache: {
          title: "Cache",
          desc: "Leituras quentes servidas da memória com TTLs e invalidação explícitos, trocando frescor por latência de forma deliberada.",
        },
        db: {
          title: "Banco de Dados",
          desc: "Schemas normalizados, índices adequados, migrations e transações. Queries são medidas, não adivinhadas.",
        },
        queue: {
          title: "Fila / Jobs",
          desc: "Trabalho lento ou instável vai para o assíncrono: retries, idempotência e dead-letter em vez de bloquear requisições.",
        },
      },
    },
    stack: {
      label: "04 // stack",
      title: "Tech",
      titleHighlight: "Stack",
      subtitle:
        "As ferramentas que uso para projetar, construir e entregar sistemas back-end.",
      layers: {
        languages: "Linguagens",
        backend: "Back-end & APIs",
        data: "Dados & Armazenamento",
        tooling: "Ferramentas & DevOps",
        frontend: "Front-end (secundário)",
      },
    },
    api: {
      label: "05 // playground",
      title: "Teste Minha",
      titleHighlight: "API",
      subtitle:
        "Uma mini API simulada rodando no seu navegador. Escolha um endpoint, envie uma requisição e inspecione a resposta.",
      note: "As respostas são simuladas no cliente. Nenhum dado sai do seu navegador.",
      send: "Enviar requisição",
      sending: "Aguardando resposta...",
      copy: "Copiar cURL",
      copied: "Copiado!",
      endpoints: "Endpoints",
      response: "Resposta",
    },
    projects: {
      label: "06 // projetos",
      title: "Projetos em",
      titleHighlight: "Destaque",
      subtitle:
        "Projetos de back-end e dados, cada um construído com atenção a confiabilidade, correção e boa modelagem.",
      viewGithub: "Ver Meu Github",
      rows: "linhas retornadas",
      source: "Código",
      demo: "Demo ao vivo",
      items: {
        1: {
          title: "Itaú Backend Challenge",
          description:
            "Solução do desafio de back-end do Itaú: uma API REST que registra transações e calcula estatísticas em tempo real (soma, média, mínimo, máximo), com validação e tratamento de erros adequados.",
        },
        2: {
          title: "TaskMaster",
          description:
            "Aplicação full-stack de gerenciamento de tarefas com autenticação no servidor e CRUD de tarefas por usuário, construída com Flask, Flask-Login e SQLAlchemy.",
        },
        3: {
          title: "Portfolio Selection Models",
          description:
            "Backtests de estratégias de seleção de carteiras baseadas em fatores (ROIC, momentum, volatilidade) comparadas ao benchmark do IBOVESPA.",
        },
        4: {
          title: "Quantitative Investment Strategies",
          description:
            "Modelos de machine learning para alocação mensal de ativos e sinais de negociação baseados em indicadores técnicos, com relatórios honestos de backtest.",
        },
        6: {
          title: "Sales Prediction ML",
          description:
            "Pipeline de machine learning que compara Regressão Linear e Random Forest para prever vendas a partir de investimento em publicidade, selecionando automaticamente o melhor modelo por R².",
        },
        7: {
          title: "PicPay Wallet Transfers",
          description:
            "Desafio de back-end do PicPay: serviço de transferência de dinheiro entre usuários e lojistas (POST /transfer) com arquitetura hexagonal, PostgreSQL, Redis e filas, totalmente containerizado e documentado com ADRs e OpenAPI.",
        },
        8: {
          title: "FlowForge",
          description:
            "Plataforma de orquestração de workflows (estágio inicial): API NestJS com autenticação JWT e schema PostgreSQL totalmente modelado, com Row Level Security por workspace. Demo no ar.",
        },
        9: {
          title: "Pesquisa em Sentimento Financeiro",
          description:
            "Iniciação científica no ICMC-USP: sistema de recomendação para trading de ETFs que combina análise de sentimentos com FinBERT-PT-BR, pipeline de notícias com Scrapy + MongoDB e aprendizado por reforço.",
        },
        10: {
          title: "Kanban Distribuído",
          description:
            "Quadro Kanban colaborativo em tempo real, em C puro: servidor TCP com sockets POSIX e pthreads que transmite cada alteração para todos os clientes conectados.",
        },
        11: {
          title: "CTF Write-ups",
          description:
            "Soluções documentadas de desafios CTF de segurança web: manipulação client-side, encodings e cifras, fuzzing HTTP, revisão de código e análise de logs. A lição: nunca confie no cliente.",
        },
      },
    },
    contact: {
      label: "07 // contato",
      title: "Entre em",
      titleHighlight: "Contato",
      subtitle:
        "Está contratando ou tem um projeto em mente? Envie uma requisição. Estou aberto a oportunidades internacionais e sempre disposto a conversar.",
      infoTitle: "Informações de Contato",
      emailLabel: "Email",
      phoneLabel: "Telefone",
      locationLabel: "Localização",
      locationValue: "São Carlos, SP, Brasil",
      connect: "Conecte-se Comigo",
      formTitle: "POST /contact",
      nameLabel: "nome",
      namePlaceholder: "Ada Lovelace",
      emailFieldLabel: "email",
      emailPlaceholder: "ada@empresa.com",
      messageLabel: "mensagem",
      messagePlaceholder: "Oi José, estamos contratando para...",
      send: "Enviar Requisição",
      sending: "Enviando...",
      toastTitle: "Abrindo seu cliente de email...",
      toastDesc: "Envie a mensagem pré-preenchida para falar comigo diretamente.",
    },
    palette: {
      placeholder: "Digite um comando ou busque...",
      empty: "Nenhum resultado.",
      goTo: "Ir para",
      actions: "Ações",
      language: "Mudar idioma para English",
      cv: "Baixar currículo",
      github: "Abrir GitHub",
      linkedin: "Abrir LinkedIn",
      email: "Enviar um email",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      built: "Feito com React + Tailwind. Respostas da API são simuladas.",
    },
    notFound: {
      title: "404",
      message: "Ops! Esta página não existe.",
      backHome: "Voltar ao Início",
    },
  },
};
