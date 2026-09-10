import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { featuredProjects } from "@/content/projects"
import { Reveal } from "./Reveal"
import { Section } from "./Section"
import { Tag } from "./Tag"

export function Featured() {
  return (
    <Section
      id="destaques"
      eyebrow="Destaques"
      title="Três projetos que explicam o que eu faço."
      description="Cada um tem página própria com problema, solução, arquitetura e resultados."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08} className="h-full">
            <Link href={`/projetos/${project.slug}`} className="card group flex h-full flex-col p-6">
              <p className="font-mono text-xs text-muted">
                {project.company} · {project.period}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-snug text-fg">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Ler estudo de caso
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
