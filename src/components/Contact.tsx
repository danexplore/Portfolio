import { FileDown, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "./BrandIcons"
import { site } from "@/content/site"
import { Reveal } from "./Reveal"
import { Section } from "./Section"

const channels = [
  { label: "E-mail", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "LinkedIn", value: "daniel-moreira", href: site.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: site.githubHandle, href: site.github, icon: GithubIcon },
  { label: "Currículo", value: "PDF, uma página", href: site.resumePath, icon: FileDown },
]

export function Contact() {
  return (
    <Section
      id="contato"
      eyebrow="Contato"
      title="Vamos conversar."
      description="Aberto a oportunidades em desenvolvimento e dados, presencial, híbrido ou remoto, a partir de Brasília."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel, index) => (
          <Reveal key={channel.label} delay={index * 0.06}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              className="card flex items-center gap-4 p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <channel.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-[0.18em] text-muted">{channel.label}</span>
                <span className="block truncate text-base font-medium text-fg">{channel.value}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
