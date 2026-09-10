"use client"

import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  value: number
  suffix?: string
}

export function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  )
}
