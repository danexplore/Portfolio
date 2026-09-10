"use client"

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { GithubIcon, LinkedinIcon } from "./BrandIcons"
import { site } from "@/content/site"

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const copyEmail = async () => {
    if (timer.current) clearTimeout(timer.current)
    try { await navigator.clipboard.writeText(site.email); setCopyState("copied") }
    catch { setCopyState("error") }
    timer.current = setTimeout(() => setCopyState("idle"), 3500)
  }
  return <section id="contato" className="contact-section" aria-labelledby="contact-heading">
    <div className="site-container contact-container">
      <p className="contact-invitation"><span className="status-dot" /> Aberto a novas conexões e oportunidades</p>
      <h2 id="contact-heading">Boas ideias merecem<br />uma boa conversa<span>.</span></h2>
      <p className="contact-description">Tem um desafio em desenvolvimento ou dados?<br />Vamos pensar no próximo passo juntos.</p>
      <div className="contact-actions"><a href={`mailto:${site.email}`} className="button-primary">Vamos conversar <ArrowUpRight size={19} /></a><button type="button" className="copy-email" onClick={copyEmail} aria-label="Copiar endereço de e-mail">{copyState === "copied" ? <Check size={16} /> : <Copy size={16} />}<span>{copyState === "copied" ? "E-mail copiado" : "Copiar e-mail"}</span></button></div>
      <p className="copy-feedback" role="status">{copyState === "error" ? `Não foi possível copiar. Use ${site.email}.` : copyState === "copied" ? "Endereço copiado para a área de transferência." : ""}</p>
      <div className="contact-links"><a href={`mailto:${site.email}`}><Mail size={17} /><span>{site.email}</span></a><a href={site.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon className="h-4 w-4" />LinkedIn <ArrowUpRight size={14} /></a><a href={site.github} target="_blank" rel="noreferrer"><GithubIcon className="h-4 w-4" />GitHub <ArrowUpRight size={14} /></a></div>
    </div>
  </section>
}
