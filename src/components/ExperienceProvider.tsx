"use client"

import { MotionConfig } from "motion/react"
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react"

const EffectsContext = createContext({ paused: false, reduced: false, toggle: () => {} })
export const useEffects = () => useContext(EffectsContext)

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"
const subscribeReducedMotion = (callback: () => void) => {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches
const getServerReducedMotion = () => false

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)
  const progress = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.documentElement.dataset.effects = paused || reduced ? "paused" : "running"
    return () => { delete document.documentElement.dataset.effects }
  }, [paused, reduced])
  useEffect(() => {
    let frame = 0
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`
      frame = 0
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(onScroll)
    observer.observe(document.body)
    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", onScroll) }
  }, [])
  return (
    <EffectsContext.Provider value={{ paused, reduced, toggle: () => setPaused(value => !value) }}>
      <MotionConfig reducedMotion={paused ? "always" : "user"}>
        <div ref={progress} className="reading-progress" aria-hidden="true" />
        {children}
      </MotionConfig>
    </EffectsContext.Provider>
  )
}
