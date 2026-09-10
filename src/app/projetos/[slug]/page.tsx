import { ArrowLeft } from "lucide-react"
import { GithubIcon } from "@/components/BrandIcons"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArchitectureFlow } from "@/components/ArchitectureFlow"
import { Footer } from "@/components/Footer"
import { Gallery } from "@/components/Gallery"
import { Header } from "@/components/Header"
import { Reveal } from "@/components/Reveal"
import { Tag } from "@/components/Tag"
import { featuredProjects, getFeaturedProject } from "@/content/projects"
import { site } from "@/content/site"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = getFeaturedProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `${site.url}/projetos/${project.slug}`,
      type: "article",
    },
  }
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-line pt-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
        <div className="mt-4">{children}</div>
      </section>
    </Reveal>
  )
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = getFeaturedProject(slug)
  if (!project) notFound()

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/projetos/${project.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: project.tags.join(", "),
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }} />
        <article className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Link href="/#destaques" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg">
              <ArrowLeft className="h-4 w-4" />
              voltar aos destaques
            </Link>
            <p className="mt-8 font-mono text-xs text-muted">
              {project.company} · {project.period}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag} accent>
                  {tag}
                </Tag>
              ))}
            </div>
          </Reveal>

          <div className="mt-14 space-y-12">
            <Block title="Problema">
              <p className="text-base leading-relaxed text-muted sm:text-lg">{project.problem}</p>
            </Block>

            <Block title="Solução">
              <ul className="space-y-3 text-base leading-relaxed text-muted">
                {project.solution.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Arquitetura">
              <ArchitectureFlow steps={project.architecture} />
            </Block>

            <Block title="Resultados">
              <dl className="grid gap-4 sm:grid-cols-3">
                {project.results.map((metric) => (
                  <div key={metric.label} className="card flex flex-col p-5">
                    <dt className="order-2 mt-2 text-sm text-muted">{metric.label}</dt>
                    <dd className="order-1 font-mono text-2xl font-semibold text-fg">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block title="Stack">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Block>

            {project.links.length > 0 ? (
              <Block title="Código">
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 font-mono text-sm text-fg transition-colors hover:border-accent/60"
                    >
                      <GithubIcon className="h-4 w-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </Block>
            ) : null}

            {project.images.length > 0 ? (
              <Block title="Telas">
                <Gallery images={project.images} />
              </Block>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
