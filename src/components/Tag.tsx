type TagProps = {
  children: string
  accent?: boolean
}

export function Tag({ children, accent = false }: TagProps) {
  const tone = accent
    ? "border-accent/40 bg-accent-soft text-accent"
    : "border-line bg-bg/60 text-muted"

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none ${tone}`}>
      {children}
    </span>
  )
}
