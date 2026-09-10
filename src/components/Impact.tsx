import { site } from "@/content/site"
import { CountUp } from "./CountUp"

export function Impact() {
  return <div className="impact-strip"><dl className="site-container impact-grid">
    {site.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd><CountUp value={fact.value} suffix={fact.suffix} /></dd></div>)}
  </dl></div>
}
