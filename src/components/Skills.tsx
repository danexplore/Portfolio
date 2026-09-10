import { Bot, Braces, Database, Layers3, Plug, Rocket } from "lucide-react"
import { skillGroups } from "@/content/skills"
import { Section } from "./Section"

const icons = [Database, Braces, Layers3, Bot, Plug, Rocket]
export function Skills() {
  return <Section id="skills" eyebrow="Meu repertório" title="A ferramenta certa para cada ideia.">
    <div className="skills-grid">{skillGroups.map((group, index) => {
      const Icon = icons[index]
      return <div key={group.title} className="skill-group"><Icon size={24} strokeWidth={1.4} /><h3>{group.title}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
    })}</div>
  </Section>
}
