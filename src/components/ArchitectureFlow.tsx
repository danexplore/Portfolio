import { ArrowRight } from "lucide-react"

type ArchitectureFlowProps = {
  steps: string[]
}

export function ArchitectureFlow({ steps }: ArchitectureFlowProps) {
  return (
    <ol className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Fluxo de arquitetura">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2 sm:gap-3">
          <span className="rounded-lg border border-line bg-surface px-3 py-2 font-mono text-xs text-fg sm:text-sm">{step}</span>
          {index < steps.length - 1 ? <ArrowRight className="h-4 w-4 shrink-0 text-accent" aria-hidden /> : null}
        </li>
      ))}
    </ol>
  )
}
