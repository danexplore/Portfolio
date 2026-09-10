"use client"

import { ArrowUpRight, FileDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { site } from "@/content/site"

const navItems = [
  { label: "Trabalhos", id: "destaques" },
  { label: "Sobre", id: "sobre" },
  { label: "Experiência", id: "experiencia" },
  { label: "Contato", id: "contato" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus() }
    }
    const media = window.matchMedia("(min-width: 900px)")
    const onResize = () => { if (media.matches) setOpen(false) }
    window.addEventListener("scroll", onScroll, { passive: true })
    media.addEventListener("change", onResize)
    if (open) window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKey)
      media.removeEventListener("change", onResize)
    }
  }, [open])
  useEffect(() => {
    if (pathname !== "/") return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: "-18% 0px -60% 0px" })
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <Link href="/" className="wordmark" aria-label={`${site.shortName}, início`} onClick={() => setOpen(false)}><span className="brand-symbol" aria-hidden="true">d<span>m</span></span><span>daniel moreira<span className="text-accent">.</span></span></Link>
        <nav className="desktop-nav" aria-label="Seções principais">
          {navItems.map(item => <Link key={item.id} href={`/#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.label}</Link>)}
        </nav>
        <a href={site.resumePath} className="header-resume">Currículo <ArrowUpRight size={15} /></a>
        <button ref={toggleRef} type="button" className="mobile-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel" hidden={!open}>
        {navItems.map(item => <Link key={item.id} href={`/#${item.id}`} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} /></Link>)}
        <Link href="/#projetos" onClick={() => setOpen(false)}>Repositórios <ArrowUpRight size={18} /></Link>
        <a href={site.resumePath} onClick={() => setOpen(false)}>Currículo <FileDown size={18} /></a>
      </nav>
    </header>
  )
}
