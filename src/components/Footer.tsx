import { ArrowUp } from "lucide-react"
import { site } from "@/content/site"

export function Footer() {
  return <footer className="site-footer"><div className="site-container footer-inner"><p>© {new Date().getFullYear()} {site.shortName}</p><p>Feito com curiosidade, código e café.</p><a href="#" aria-label="Voltar ao topo">De volta ao topo <ArrowUp size={15} /></a></div></footer>
}
