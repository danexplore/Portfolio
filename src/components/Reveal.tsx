"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useEffects } from "./ExperienceProvider"

type RevealProps = { children: ReactNode; delay?: number; className?: string }
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { paused, reduced } = useEffects()
  useEffect(() => {
    const element = ref.current
    if (!element || paused || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let animation: Animation | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      animation = element.animate([{ opacity: 0.45, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, delay: delay * 1000, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" })
      observer.disconnect()
    }, { threshold: 0.08 })
    observer.observe(element)
    return () => { observer.disconnect(); animation?.cancel() }
  }, [delay, paused, reduced])
  return <div ref={ref} className={className}>{children}</div>
}
