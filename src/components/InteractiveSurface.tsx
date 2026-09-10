"use client"

import { useRef, type PointerEvent, type ReactNode } from "react"
import { useEffects } from "./ExperienceProvider"

export function InteractiveSurface({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { paused, reduced } = useEffects()
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (paused || reduced || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height
    const style = event.currentTarget.style
    style.setProperty("--spot-x", `${x * 100}%`)
    style.setProperty("--spot-y", `${y * 100}%`)
    style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`)
    style.setProperty("--tilt-y", `${(x - 0.5) * 4}deg`)
  }
  const reset = () => {
    ref.current?.style.setProperty("--tilt-x", "0deg")
    ref.current?.style.setProperty("--tilt-y", "0deg")
  }
  return <div ref={ref} className={`interactive-surface ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>
}
