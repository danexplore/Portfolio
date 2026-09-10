import { skillGroups } from "@/content/skills"
import { Reveal } from "./Reveal"
import { Section } from "./Section"
import { Tag } from "./Tag"

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Ferramentas que uso no dia a dia.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={(index % 3) * 0.06} className="h-full">
            <div className="card h-full p-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
