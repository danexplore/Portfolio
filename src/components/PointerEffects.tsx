"use client"

import { useEffect } from "react"
import { useEffects } from "./ExperienceProvider"

const magneticSelector = ".button-primary, .button-text, .header-resume, .copy-email, .contact-links a"
const spotlightSelector = ".repository-card, .skill-group, .impact-grid > div"

export function PointerEffects() {
  const { paused, reduced } = useEffects()

  useEffect(() => {
    if (paused || reduced) return
    let frame = 0
    let magnetic: HTMLElement | null = null
    let surface: HTMLElement | null = null
    let bounds: DOMRect | null = null
    let clientX = 0, clientY = 0
    const resetMagnetic = () => {
      magnetic?.style.removeProperty("--magnet-x")
      magnetic?.style.removeProperty("--magnet-y")
      magnetic = null
      bounds = null
    }
    const resetSurface = () => {
      surface?.style.removeProperty("--spot-x")
      surface?.style.removeProperty("--spot-y")
      surface = null
    }
    const update = () => {
      frame = 0
      if (magnetic && bounds) {
        magnetic.style.setProperty("--magnet-x", `${(clientX - bounds.left - bounds.width / 2) * 0.16}px`)
        magnetic.style.setProperty("--magnet-y", `${(clientY - bounds.top - bounds.height / 2) * 0.25}px`)
      }
      if (surface) {
        const rect = surface.getBoundingClientRect()
        surface.style.setProperty("--spot-x", `${clientX - rect.left}px`)
        surface.style.setProperty("--spot-y", `${clientY - rect.top}px`)
      }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return
      clientX = event.clientX
      clientY = event.clientY
      const nextMagnetic = event.target.closest<HTMLElement>(magneticSelector)
      const nextSurface = event.target.closest<HTMLElement>(spotlightSelector)
      if (magnetic !== nextMagnetic) {
        resetMagnetic()
        magnetic = nextMagnetic
        bounds = magnetic?.getBoundingClientRect() ?? null
      }
      if (surface !== nextSurface) { resetSurface(); surface = nextSurface }
      if (!frame && (magnetic || surface)) frame = requestAnimationFrame(update)
    }
    const reset = () => { resetMagnetic(); resetSurface() }
    document.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", reset)
    window.addEventListener("blur", reset)
    window.addEventListener("scroll", reset, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      reset()
      document.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", reset)
      window.removeEventListener("blur", reset)
      window.removeEventListener("scroll", reset)
    }
  }, [paused, reduced])

  return null
}
