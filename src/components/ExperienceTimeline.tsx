import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { experiences } from "@/content/experience"
import { Section } from "./Section"

export function ExperienceTimeline() {
  return (
    <Section id="experiencia" eyebrow="A trajetória" title="Cada etapa, uma nova perspectiva." description="Da primeira automação à engenharia de produtos. Sempre conectando o que aprendi ao próximo desafio.">
      <div className="experience-list">
        {experiences.map(experience => <details key={`${experience.company}-${experience.role}`} className="experience-item" open={experience.current}>
          <summary><span className="experience-period">{experience.period}{experience.current ? <span className="current-badge"><span className="status-dot" /> Agora</span> : null}</span><span className="experience-title"><strong>{experience.company}</strong><span>{experience.role}</span></span><span className="experience-expand"><ArrowDownRight size={23} /></span></summary>
          <div className="experience-detail"><ul>{experience.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><p className="experience-stack">{experience.stack.join(" / ")}</p></div>
        </details>)}
      </div>
      <a href="/curriculo-daniel-moreira.pdf" className="all-repositories">Ver currículo completo <ArrowUpRight size={17} /></a>
    </Section>
  )
}
