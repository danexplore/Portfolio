import Image from "next/image"
import { ArrowUpRight, MapPin } from "lucide-react"
import { site } from "@/content/site"
import { InteractiveSurface } from "./InteractiveSurface"
import { Section } from "./Section"

export function About() {
  return (
    <Section id="sobre" eyebrow="Prazer, Daniel" title="Curiosidade como ponto de partida.">
      <div className="about-layout">
        <InteractiveSurface className="portrait-card">
          <div className="portrait-image"><Image src="/images/profile-2026.jpg" alt={`Foto de ${site.name}`} fill sizes="(min-width: 900px) 370px, 85vw" className="object-cover" /></div>
          <div className="portrait-caption"><span>{site.shortName}</span><span><MapPin size={13} />{site.location}</span></div>
          <span className="portrait-corner" aria-hidden="true">&lt;dev /&gt;</span>
        </InteractiveSurface>
        <div className="about-copy">
          <p className="about-lead">Minha matéria-prima são dados.<br />Meu jeito de construir é com código.</p>
          {site.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-footnote"><span className="status-dot" /><span>Hoje, construindo na <strong>{site.company}</strong></span><a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="Perfil no LinkedIn"><ArrowUpRight size={20} /></a></div>
        </div>
      </div>
    </Section>
  )
}
