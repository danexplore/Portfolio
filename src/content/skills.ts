export type SkillGroup = {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Dados",
    skills: ["SQL", "PostgreSQL", "MySQL", "Modelagem e Data Warehouse", "ETL/ELT", "Power BI", "Pandas", "Excel"],
  },
  {
    title: "Backend e APIs",
    skills: ["Python", "FastAPI", "APIs REST", "Route Handlers (Next.js)", "Redis", "Elasticsearch"],
  },
  {
    title: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "IA e agentes",
    skills: ["Claude Code", "Codex", "MCP", "LLMs", "Whisper", "Embeddings e NLP", "Lovable", "v0.dev"],
  },
  {
    title: "Integrações",
    skills: ["Meta Graph API", "WhatsApp Cloud API", "Instagram API", "Marketing API (Ads)", "App Review", "n8n", "Pipefy", "Kommo CRM", "Jira"],
  },
  {
    title: "Infra e entrega",
    skills: ["Supabase (Auth, RLS, migrations)", "Vercel", "Git", "GitHub Actions", "CI/CD"],
  },
]
