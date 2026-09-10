export type Metric = { value: string; label: string }

export type FeaturedProject = {
  slug: string
  title: string
  company: string
  period: string
  summary: string
  tags: string[]
  problem: string
  solution: string[]
  architecture: string[]
  results: Metric[]
  stack: string[]
  links: { label: string; href: string }[]
  images: { src: string; alt: string }[]
}

export type Repository = {
  title: string
  description: string
  tags: string[]
  github: string | null
  demo?: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "integracao-meta-octalab",
    title: "Integração com a plataforma Meta",
    company: "Octalab",
    period: "2026 · atual",
    summary:
      "WhatsApp Cloud API, Instagram e Marketing API dentro de um produto SaaS, com webhooks, permissões e apps aprovados no App Review.",
    tags: ["Meta Graph API", "WhatsApp Cloud API", "Next.js", "Supabase"],
    problem:
      "O produto precisava conversar com clientes e leads pelos canais da Meta, WhatsApp e Instagram, e acompanhar campanhas de Ads sem depender de ferramentas externas. Isso exige apps Meta com permissões avançadas, webhooks confiáveis e aprovação formal no App Review, um processo com regras estritas de uso de dados e demonstração de cada caso de uso.",
    solution: [
      "Integração com a WhatsApp Cloud API para envio e recebimento de mensagens, templates aprovados e status de entrega via webhooks.",
      "Conexão com o Instagram pela Graph API para mensagens e interações de contas profissionais ligadas ao Business Manager.",
      "Leitura de campanhas, conjuntos e anúncios pela Marketing API, trazendo métricas de Ads para dentro do produto.",
      "Endpoint de webhooks com verificação de assinatura, tokens de sistema por Business e persistência no Supabase com RLS por tenant.",
      "Condução do App Review: mapeamento de permissões, vídeos de demonstração de cada caso de uso, políticas e verificação do negócio até a aprovação em produção.",
    ],
    architecture: [
      "Meta Graph API",
      "Webhooks (Route Handlers)",
      "Validação e fila",
      "Supabase (Postgres + RLS)",
      "Interface Next.js",
    ],
    results: [
      { value: "3", label: "produtos Meta integrados" },
      { value: "Aprovado", label: "App Review em produção" },
      { value: "Multi-tenant", label: "isolamento por RLS" },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "Meta Graph API",
      "WhatsApp Cloud API",
      "Marketing API",
      "Vercel",
    ],
    links: [],
    images: [],
  },
  {
    slug: "health-score-rfm",
    title: "Health Score de clientes com RFM",
    company: "ecosys AUTO",
    period: "2025 · 2026",
    summary:
      "Segmentação de clientes SaaS em Campeões, Saudáveis, Normais e Críticos para orientar retenção, ativação e uso de funcionalidades.",
    tags: ["RFM", "Churn", "SQL", "Python", "Power BI"],
    problem:
      "Uma startup em crescimento precisava saber quais clientes usavam o sistema de verdade e quais estavam prestes a cancelar. O acompanhamento era manual, espalhado em planilhas e no CRM, e o time de CS não tinha um critério único para priorizar quem atender.",
    solution: [
      "Adaptação do modelo RFM ao contexto de SaaS: recência de acesso, frequência de uso e profundidade das funcionalidades utilizadas por cliente.",
      "Classificação automática em quatro segmentos, Campeões, Saudáveis, Normais e Críticos, recalculada a partir do Data Warehouse.",
      "API em Python consultando PostgreSQL e MySQL para servir os scores, KPIs e métricas de negócio.",
      "Dashboards em Power BI e uma interface web para CS e diretoria, com a lista de clientes críticos e as funcionalidades subutilizadas por segmento.",
    ],
    architecture: [
      "CRM e sistema (PostgreSQL, MySQL)",
      "ETL (n8n + Python)",
      "Data Warehouse",
      "API de scores",
      "Power BI e interface web",
    ],
    results: [
      { value: "4", label: "segmentos de clientes" },
      { value: "6", label: "KPIs executivos (Churn, Growth, LTV, MRR, NPS, Conversão)" },
      { value: "CS ao C-level", label: "com a mesma visão em tempo real" },
    ],
    stack: ["SQL", "Python", "n8n", "PostgreSQL", "MySQL", "Power BI", "React"],
    links: [
      { label: "ecosysMS-Back", href: "https://github.com/danexplore/ecosysMS-Back" },
      { label: "ecosys-dash-hub", href: "https://github.com/danexplore/ecosys-dash-hub" },
    ],
    images: [
      { src: "/images/projetos/ecosys/Gestor_Clientes.png", alt: "Gestor de clientes com Health Score" },
      { src: "/images/projetos/ecosys/Clientes.png", alt: "Lista de clientes por segmento" },
    ],
  },
  {
    slug: "erp-data-warehouse",
    title: "ERP interno e Data Warehouse",
    company: "ecosys AUTO",
    period: "2025 · 2026",
    summary:
      "Planilhas manuais substituídas por um sistema interno com dados em tempo real, alimentado por ETL de dois bancos e do CRM.",
    tags: ["ETL", "Data Warehouse", "n8n", "Python", "React"],
    problem:
      "Operação, financeiro e comercial dependiam de planilhas atualizadas à mão, com informação divergente entre áreas e atraso para a diretoria. Cada reunião começava conferindo qual número estava certo.",
    solution: [
      "Modelagem de um Data Warehouse centralizando ERP, CRM, financeiro e operações para consumo analítico.",
      "Pipelines de ETL com SQL, Python e n8n, incluindo integração com o Kommo CRM e carga contínua de dois bancos, PostgreSQL e MySQL.",
      "Sistema de gestão interno com backend em Python e frontend em React, servindo métricas, estoque e clientes em tempo real.",
      "Estruturação do funil de vendas e dos KPIs operacionais e financeiros usados nas reuniões executivas.",
    ],
    architecture: [
      "Fontes (ERP, CRM, PostgreSQL, MySQL)",
      "ETL (n8n + Python)",
      "Data Warehouse",
      "API Python",
      "Dashboard React e Power BI",
    ],
    results: [
      { value: "70%", label: "ganho de eficiência operacional" },
      { value: "0", label: "planilhas com atualização manual" },
      { value: "2", label: "bancos integrados em tempo real" },
    ],
    stack: ["Python", "SQL", "n8n", "PostgreSQL", "MySQL", "React", "TypeScript", "Power BI"],
    links: [
      { label: "ecosysMS-Back", href: "https://github.com/danexplore/ecosysMS-Back" },
      { label: "ecosys-dash-hub", href: "https://github.com/danexplore/ecosys-dash-hub" },
      { label: "Kommo-Back", href: "https://github.com/danexplore/Kommo-Back" },
    ],
    images: [
      { src: "/images/projetos/ecosys/Dashboard_Gestor.png", alt: "Dashboard do gestor" },
      { src: "/images/projetos/ecosys/Estoque_dash.png", alt: "Dashboard de estoque" },
    ],
  },
]

export const repositories: Repository[] = [
  {
    title: "ecosysMS-Back",
    description:
      "API REST em Python para gestão de clientes: calcula Health Scores, KPIs e métricas de negócio consultando PostgreSQL e MySQL.",
    tags: ["Python", "FastAPI", "PostgreSQL", "MySQL", "ETL"],
    github: "https://github.com/danexplore/ecosysMS-Back",
  },
  {
    title: "ecosys-dash-hub",
    description: "Dashboard interativo em React e TypeScript para métricas de clientes, integrado ao ecosysMS-Back.",
    tags: ["React", "TypeScript", "Dashboard"],
    github: "https://github.com/danexplore/ecosys-dash-hub",
  },
  {
    title: "Kommo-Back",
    description:
      "Integração com o CRM Kommo: sincroniza dados entre sistemas e gera relatórios do pipeline comercial em tempo real.",
    tags: ["Python", "FastAPI", "CRM", "API"],
    github: "https://github.com/danexplore/Kommo-Back",
  },
  {
    title: "JiraSQL",
    description: "Extrai dados do Jira e carrega em SQL para análises de produtividade, sprints e ciclos de desenvolvimento.",
    tags: ["Python", "SQL", "Jira", "ETL"],
    github: "https://github.com/danexplore/JiraSQL",
  },
  {
    title: "NPI-backend",
    description:
      "API FastAPI do setor de Novos Projetos da Unyleya, com cache em Redis, autenticação e integração com o Pipefy.",
    tags: ["Python", "FastAPI", "Redis", "Pipefy"],
    github: "https://github.com/danexplore/NPI-backend",
  },
  {
    title: "Novos-Projetos",
    description: "Interface para análise de propostas de novos cursos, integrada ao banco de dados do setor.",
    tags: ["React", "TypeScript", "v0.dev"],
    github: "https://github.com/alexicm/Novos-Projetos",
  },
  {
    title: "API Verificadora de Similaridade",
    description: "API REST com Elasticsearch para encontrar cursos similares por similaridade textual de tema e resumo.",
    tags: ["Python", "FastAPI", "Elasticsearch"],
    github: "https://github.com/danexplore/API-Verificadora-de-Similaridade",
  },
  {
    title: "Pesquisa-Similaridade-Uny",
    description: "Interface do sistema de recomendação de cursos por similaridade, com avaliação assistida por IA.",
    tags: ["Python", "Elasticsearch", "IA"],
    github: "https://github.com/alexicm/Pesquisa-Similaridade-Uny",
  },
  {
    title: "ecosys-lp",
    description: "Landing page institucional da ecosys AUTO em React, TypeScript e Tailwind, com deploy na Vercel.",
    tags: ["TypeScript", "React", "Tailwind", "Vercel"],
    github: "https://github.com/danexplore/ecosys-lp",
    demo: "https://ecosys-lp.vercel.app",
  },
  {
    title: "Smart Transcription Plan",
    description:
      "Transcrição automática de áudio e vídeo com Whisper e sumarização com LLMs. Projeto privado.",
    tags: ["Python", "Whisper", "LLMs", "NLP"],
    github: null,
  },
]

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug)
}
