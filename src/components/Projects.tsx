"use client"

import { ArrowUpRight, Code2, ExternalLink, Lock } from "lucide-react"
import { useState } from "react"
import { GithubIcon } from "./BrandIcons"
import { repositories } from "@/content/projects"
import { site } from "@/content/site"
import { Section } from "./Section"
import { Tag } from "./Tag"

const filters = [
  { label: "Todos", tags: [] as string[] },
  { label: "Frontend", tags: ["React", "TypeScript"] },
  { label: "Backend & dados", tags: ["FastAPI", "SQL", "ETL"] },
  { label: "Inteligência artificial", tags: ["IA", "LLMs", "NLP", "Elasticsearch"] },
]

export function Projects() {
  const [filter, setFilter] = useState(0)
  const visible = repositories.filter(repo => filter === 0 || repo.tags.some(tag => filters[filter].tags.includes(tag)))
  return (
    <Section id="projetos" eyebrow="Por dentro do código" title="Mais coisas que construí." description="APIs, experimentos e interfaces. Um pouco do meu trabalho, direto do repositório.">
      <div className="repository-toolbar"><div className="project-filters" role="group" aria-label="Filtrar projetos por área">{filters.map((item, index) => <button key={item.label} type="button" aria-pressed={filter === index} onClick={() => setFilter(index)}>{item.label}</button>)}</div><span className="repository-count" aria-live="polite" aria-atomic="true">{visible.length} projetos</span></div>
      <div className="repository-grid">
        {visible.map(repo => <article key={repo.title} className="repository-card">
          <div className="repository-top"><Code2 size={22} strokeWidth={1.4} /><div>{repo.demo ? <a href={repo.demo} target="_blank" rel="noreferrer" aria-label={`Demo de ${repo.title}`}><ExternalLink size={17} /></a> : null}{repo.github ? <a href={repo.github} target="_blank" rel="noreferrer" aria-label={`Repositório ${repo.title}`}><GithubIcon className="h-5 w-5" /></a> : <span title="Projeto privado"><Lock size={16} aria-label="Projeto privado" /></span>}</div></div>
          <h3>{repo.github ? <a href={repo.github} target="_blank" rel="noreferrer">{repo.title}</a> : repo.title}</h3>
          <p>{repo.description}</p><div className="repository-tags">{repo.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
        </article>)}
      </div>
      <a className="all-repositories" href={site.github} target="_blank" rel="noreferrer">Continuar no GitHub <ArrowUpRight size={17} /></a>
    </Section>
  )
}
