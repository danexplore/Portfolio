import { ArrowDown, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { site } from "@/content/site"
import { ParticleScene } from "./ParticleScene"
import { GithubIcon } from "./BrandIcons"
import { Impact } from "./Impact"
import { PointerEffects } from "./PointerEffects"

export function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <PointerEffects />
      <div className="hero-grid" aria-hidden="true" />
      <div className="site-container hero-layout">
        <div className="hero-copy">
          <div className="hero-introduction hero-enter"><span className="status-dot" /><span>{site.role} na <strong>{site.company}</strong></span></div>
          <h1 className="hero-name hero-enter">Daniel<br />Moreira<span className="name-period">.</span><span className="sr-only"> Batista</span></h1>
          <p className="hero-statement hero-enter">Transformo dados e ideias<br className="hidden sm:block" /> em software que acontece.</p>
          <p className="hero-description hero-enter">Full stack, integrações e inteligência artificial.<br />Do primeiro insight ao produto em produção.</p>
          <div className="hero-actions hero-enter">
            <Link href="/#destaques" className="button-primary">Explorar projetos <ArrowDown size={17} /></Link>
            <a href={site.github} target="_blank" rel="noreferrer" className="button-text"><GithubIcon className="h-4 w-4" /> GitHub <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="hero-art hero-enter"><ParticleScene /></div>
        <div className="hero-bottom">
          <span>{site.location}<span className="hero-bottom-separator"> / </span>Conectado ao mundo</span>
          <a href="#destaques" className="scroll-cue">Continue explorando <span><ArrowDown size={13} /></span></a>
        </div>
      </div>
      <Impact />
    </section>
  )
}
