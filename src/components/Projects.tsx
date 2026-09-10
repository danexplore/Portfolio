import { ExternalLink, Lock } from "lucide-react"
import { GithubIcon } from "./BrandIcons"
import { repositories } from "@/content/projects"
import { site } from "@/content/site"
import { Reveal } from "./Reveal"
import { Section } from "./Section"
import { Tag } from "./Tag"

export function Projects() {
  return (
    <Section
      id="projetos"
      eyebrow="Projetos"
      title="Repositórios públicos."
      description={`Código aberto no GitHub em ${site.githubHandle}. APIs, integrações e interfaces construídas nas empresas por onde passei.`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo, index) => (
          <Reveal key={repo.title} delay={(index % 3) * 0.06} className="h-full">
            <article className="card flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-sm font-semibold text-fg">{repo.title}</h3>
                <div className="flex shrink-0 items-center gap-2 text-muted">
                  {repo.demo ? (
                    <a href={repo.demo} target="_blank" rel="noreferrer" aria-label={`Demo de ${repo.title}`} className="hover:text-accent">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                  {repo.github ? (
                    <a href={repo.github} target="_blank" rel="noreferrer" aria-label={`Repositório ${repo.title}`} className="hover:text-accent">
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  ) : (
                    <Lock className="h-4 w-4" aria-label="Projeto privado" />
                  )}
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{repo.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {repo.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
