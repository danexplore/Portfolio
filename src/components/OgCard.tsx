type OgCardProps = {
  eyebrow: string
  title: string
  footer: string
}

export function OgCard({ eyebrow, title, footer }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #0b1220 0%, #0f1c33 100%)",
        color: "#e2e8f0",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -120,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 65%)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#22d3ee" }}>
        <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#22d3ee" }} />
        {eyebrow}
      </div>
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 980 }}>{title}</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#94a3b8" }}>
        <span>{footer}</span>
        <span>portfolio-daniel-moreira.vercel.app</span>
      </div>
    </div>
  )
}
