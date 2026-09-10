"use client"

import { ArrowDown } from "lucide-react"
import { GithubIcon } from "./BrandIcons"
import Link from "next/link"
import type { MouseEvent } from "react"
import { useRef } from "react"
import { site } from "@/content/site"
import { CountUp } from "./CountUp"
import { Reveal } from "./Reveal"

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const glow = glowRef.current
    if (!glow) return
    const rect = event.currentTarget.getBoundingClientRect()
    glow.style.setProperty("--mx", `${event.clientX - rect.left}px`)
    glow.style.setProperty("--my", `${event.clientY - rect.top}px`)
  }

  return (
    <section
      id="inicio"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-16"
    >
      <div className="dot-grid absolute inset-0" aria-hidden />
      <div ref={glowRef} className="hero-glow absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
            {site.role} · {site.company}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {site.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">{site.intro}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#destaques"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              Ver destaques
              <ArrowDown className="h-4 w-4" />
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/60"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {site.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-sm text-muted">{fact.label}</dt>
                <dd className="order-1 font-mono text-3xl font-semibold text-fg">
                  <CountUp value={fact.value} suffix={fact.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
