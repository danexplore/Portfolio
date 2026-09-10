import { experiences } from "@/content/experience"
import { Reveal } from "./Reveal"
import { Section } from "./Section"

export function ExperienceTimeline() {
  return (
    <Section id="experiencia" eyebrow="Experiência" title="De aprendiz a desenvolvedor, passando por dados.">
      <ol className="relative border-l border-line pl-8">
        {experiences.map((experience, index) => (
          <li key={`${experience.company}-${experience.role}`} className="relative pb-12 last:pb-0">
            <span
              className={`absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 ${
                experience.current
                  ? "border-accent bg-accent shadow-[0_0_16px_2px_rgba(34,211,238,0.5)]"
                  : "border-line bg-bg"
              }`}
              aria-hidden
            />
            <Reveal delay={index * 0.05}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-fg">{experience.company}</h3>
                  <p className="text-sm font-medium text-accent">{experience.role}</p>
                </div>
                <p className="font-mono text-xs text-muted">{experience.period}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {experience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-xs text-muted">
                <span className="text-fg">stack:</span> {experience.stack.join(" · ")}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
