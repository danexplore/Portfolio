import Image from "next/image"
import { site } from "@/content/site"
import { Reveal } from "./Reveal"
import { Section } from "./Section"

export function About() {
  return (
    <Section id="sobre" eyebrow="Sobre" title="Dados por trás, software na ponta.">
      <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {site.about.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.16} className="justify-self-center md:justify-self-end">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-line shadow-[0_0_60px_-20px_rgba(34,211,238,0.5)] sm:h-48 sm:w-48">
            <Image src="/images/profile-2026.jpg" alt={`Foto de ${site.name}`} fill sizes="192px" className="object-cover" priority />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
