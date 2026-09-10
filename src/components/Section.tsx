import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {description ? <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{description}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
