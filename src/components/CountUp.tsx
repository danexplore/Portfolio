"use client"

import { animate, useInView } from "motion/react"
import { useEffect, useRef } from "react"
import { useEffects } from "./ExperienceProvider"

type CountUpProps = { value: number; suffix?: string }
export function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const { paused, reduced } = useEffects()
  useEffect(() => {
    const element = ref.current
    if (!element || !inView || paused || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const controls = animate(0, value, { duration: 1.35, ease: [0.22, 1, 0.36, 1], onUpdate: latest => { element.textContent = `${Math.round(latest)}${suffix}` } })
    return () => { controls.stop(); element.textContent = `${value}${suffix}` }
  }, [inView, paused, reduced, value, suffix])
  return <span className="tabular-nums"><span className="sr-only">{value}{suffix}</span><span ref={ref} aria-hidden="true">{value}{suffix}</span></span>
}
