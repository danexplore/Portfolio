import { ArrowUpRight, Camera, Check, Database, MessageCircle, Radio, Workflow } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { featuredProjects } from "@/content/projects"
import { InteractiveSurface } from "./InteractiveSurface"
import { Section } from "./Section"
import { Tag } from "./Tag"

function MetaVisual() {
  return <div className="meta-visual" aria-hidden="true">
    <div className="meta-visual-grid" />
    <svg className="meta-connections" viewBox="0 0 640 350" fill="none"><path d="M145 110 C260 110 220 175 320 175 S395 90 490 90 M145 250 C250 250 220 175 320 175 S390 260 490 260" /><path className="flow-signal" d="M145 110 C260 110 220 175 320 175 S395 90 490 90 M145 250 C250 250 220 175 320 175 S390 260 490 260" /></svg>
    <div className="meta-node node-whatsapp"><MessageCircle /><span>WhatsApp</span></div>
    <div className="meta-node node-instagram"><Camera /><span>Instagram</span></div>
    <div className="meta-hub"><Workflow size={36} /><span>produto SaaS</span></div>
    <div className="meta-node node-ads"><Radio /><span>Marketing API</span></div>
    <div className="meta-node node-database"><Database /><span>Supabase</span></div>
    <span className="meta-approved"><Check size={12} /> App Review aprovado</span>
  </div>
}

export function Featured() {
  return (
    <Section id="destaques" eyebrow="Trabalhos selecionados" title="Ideias que viraram entrega." description="Integrações, produtos e dados. Um olhar por dentro do que construí e dos problemas que resolvi.">
      <div className="featured-grid">
        {featuredProjects.map((project, index) => (
          <InteractiveSurface key={project.slug} className={`featured-card featured-card-${index}`}>
            <Link href={`/projetos/${project.slug}`} className="featured-link">
              <div className={`project-preview preview-${index}`}>
                {index === 0 ? <MetaVisual /> : <div className="project-browser"><div className="browser-chrome"><i /><i /><i /><span>{project.company} / {index === 1 ? "Health Score" : "Gestão"}</span></div><div className="project-screenshot"><Image src={project.images[0].src} alt={project.images[0].alt} fill sizes="(min-width: 900px) 550px, 90vw" className="object-cover object-top" /></div></div>}
                <span className="preview-open"><ArrowUpRight size={22} /></span>
              </div>
              <div className="featured-copy">
                <div className="project-meta"><span>{project.company}</span><span>{project.period}</span></div>
                <h3>{project.title}</h3><p>{project.summary}</p>
                <div className="featured-bottom"><div className="flex flex-wrap gap-2">{project.tags.slice(0, 3).map(tag => <Tag key={tag}>{tag}</Tag>)}</div><span className="case-link">Ver projeto <ArrowUpRight size={16} /></span></div>
              </div>
            </Link>
          </InteractiveSurface>
        ))}
      </div>
    </Section>
  )
}
