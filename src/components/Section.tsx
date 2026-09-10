import type { ReactNode } from "react"

type SectionProps = { id: string; eyebrow: string; title: string; description?: string; children: ReactNode }

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="portfolio-section" aria-labelledby={`${id}-heading`}>
      <div className="site-container">
        <div className="section-heading">
          <p className="section-label"><span aria-hidden="true" />{eyebrow}</p>
          <div><h2 id={`${id}-heading`}>{title}</h2>{description ? <p className="section-description">{description}</p> : null}</div>
        </div>
        <div className="section-content">{children}</div>
      </div>
    </section>
  )
}
