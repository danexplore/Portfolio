export type Experience = {
  company: string
  role: string
  period: string
  current?: boolean
  bullets: string[]
  stack: string[]
}

export const experiences: Experience[] = [
  {
    company: "Octalab",
    role: "Desenvolvedor com IA",
    period: "mar 2026 · atual",
    current: true,
    bullets: [
      "Implemento funcionalidades de ponta a ponta em produtos SaaS: modelagem no Postgres com RLS, migrations, APIs e interfaces em React.",
      "Lidero a integração com a plataforma Meta: WhatsApp Cloud API, Instagram e Marketing API, incluindo webhooks, permissões e o processo de App Review para aprovação dos apps em produção.",
      "Uso agentes de IA como parte do processo de desenvolvimento, com revisão de código, testes e type-check como gates de qualidade antes de cada PR.",
      "Integro o produto a ferramentas de gestão, CRM e comunicação via MCP e automações.",
      "Atuo com kanban, CI/CD via GitHub Actions e deploy contínuo na Vercel.",
    ],
    stack: ["TypeScript", "Next.js", "React", "Supabase", "Meta Graph API", "Vercel", "GitHub Actions", "Claude Code", "MCP"],
  },
  {
    company: "ecosys AUTO",
    role: "Analista de Dados",
    period: "jul 2025 · mar 2026",
    bullets: [
      "Planejei e estruturei o Data Warehouse da empresa, centralizando dados de ERP, CRM, financeiro e operações para consumo analítico.",
      "Desenvolvi pipelines de ETL com SQL, Python e n8n e APIs REST com IA, garantindo dados estruturados e confiáveis para as áreas.",
      "Defini KPIs operacionais, financeiros, comerciais e de CS (Churn, Growth, LTV, MRR, NPS, Conversão) usados em reuniões executivas.",
      "Criei o Health Score de clientes, adaptando o modelo RFM ao SaaS para orientar retenção, ativação e uso de funcionalidades.",
      "Desenvolvi um ERP interno que substituiu planilhas manuais por dados em tempo real, melhorando a eficiência operacional em 70%.",
    ],
    stack: ["SQL", "Python", "n8n", "PostgreSQL", "MySQL", "Power BI", "Lovable", "LLMs"],
  },
  {
    company: "Unyleya Educacional",
    role: "Assistente Administrativo e Analista de Dados",
    period: "set 2024 · jul 2025",
    bullets: [
      "Construí webapp em Python, com frontend gerado no v0.dev, para gestão de propostas de novos cursos, reduzindo erros e retrabalho manual.",
      "Construí webapp de detecção de cursos similares por tema e resumo com Elasticsearch, reduzindo erros manuais em 80% e elevando a eficiência operacional em 70%.",
      "Automatizei tarefas, criei dashboards e relatórios mensais e reestruturei processos administrativos no Pipefy.",
    ],
    stack: ["Python", "FastAPI", "Elasticsearch", "Redis", "Pipefy", "v0.dev"],
  },
  {
    company: "Unyleya Educacional",
    role: "Jovem Aprendiz",
    period: "ago 2022 · jun 2024",
    bullets: [
      "Automatizei e-mails marketing via VBA, web scraping para prospecção de leads e relatórios em Excel com Python, além do apoio administrativo.",
    ],
    stack: ["Python", "VBA", "Excel"],
  },
]
