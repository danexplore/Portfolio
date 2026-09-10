"use client"

import { FileDown, Menu, X } from "lucide-react"
import { GithubIcon } from "./BrandIcons"
import Link from "next/link"
import { useState } from "react"
import { site } from "@/content/site"

const navItems = [
  { label: "Destaques", href: "/#destaques" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Skills", href: "/#skills" },
  { label: "Contato", href: "/#contato" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-fg" onClick={() => setOpen(false)}>
          <span className="text-accent">~/</span>
          {site.githubHandle}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-muted transition-colors hover:text-fg"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={site.resumePath}
            className="inline-flex items-center gap-2 rounded-lg border border-accent/50 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
          >
            <FileDown className="h-4 w-4" />
            Currículo
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-muted hover:text-fg md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-line/60 bg-bg/95 md:hidden" aria-label="Seções">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm text-muted hover:bg-surface hover:text-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 px-3 pb-2">
              <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href={site.resumePath} className="inline-flex items-center gap-2 text-sm text-accent">
                <FileDown className="h-4 w-4" /> Currículo
              </a>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
