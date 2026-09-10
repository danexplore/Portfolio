"use client"

import { useEffect, useRef } from "react"
import { MousePointer2, Pause, Play } from "lucide-react"
import { createOrbitParticles, displaceParticle, orbitScrollProgress, type OrbitParticle } from "@/lib/orbit"
import { useEffects } from "./ExperienceProvider"

export function ParticleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<OrbitParticle[] | null>(null)
  const clockRef = useRef({ time: 0, assembly: 1, scatter: 0 })
  const { paused, reduced, toggle } = useEffects()

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = sceneRef.current
    if (!canvas || !scene) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return
    const hero = canvas.closest<HTMLElement>(".hero-section")
    const stopped = paused || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const particles = particlesRef.current ?? (particlesRef.current = createOrbitParticles(2400))
    const clock = clockRef.current
    if (reduced) { clock.assembly = 0; clock.scatter = 0 }
    let width = 0, height = 0, frame = 0, last = 0, targetScatter = 0
    let visible = true, disposed = false
    const pointer = { x: 0, y: 0, active: false }
    const projected = particles.map(() => ({ x: 0, y: 0, z: 0, size: 0, hue: 0, light: 0, alpha: 0, glow: 0, previousX: 0, previousY: 0 }))

    const readScroll = () => {
      if (hero) targetScatter = orbitScrollProgress(hero.getBoundingClientRect().top, hero.offsetHeight)
      pointer.active = false
    }

    const draw = (delta = 0) => {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width, height) * 0.275
      const scatter = Math.max(clock.assembly, clock.scatter)
      // Restrained camera motion keeps the silhouette readable at every angle.
      const yaw = 0.25 + Math.sin(clock.time * 0.17) * 0.45
      const tilt = 0.55 + Math.cos(clock.time * 0.13) * 0.13
      const cy = Math.cos(yaw), sy = Math.sin(yaw)
      const cx = Math.cos(tilt), sx = Math.sin(tilt)
      const turn = clock.time * 0.07
      const ct = Math.cos(turn), st = Math.sin(turn)
      const radiusOfInfluence = Math.max(72, Math.min(width * 0.26, 145))
      const step = width < 400 ? 2 : 1
      let count = 0
      for (let i = 0; i < particles.length; i += step) {
        const particle = particles[i]
        const { u, v } = particle
        const tube = 0.36 + Math.sin(u * 3 + clock.time * 0.6) * 0.018
        const radius = 1 + tube * Math.cos(v)
        const x = radius * Math.cos(u) * (1 - scatter * 0.35) + particle.scatterX * scatter
        const y = radius * Math.sin(u) * (1 - scatter * 0.35) + particle.scatterY * scatter
        const z = tube * Math.sin(v) + particle.scatterZ * scatter
        const rx = x * cy + z * sy, rz = -x * sy + z * cy
        const ry = y * cx - rz * sx, depth = y * sx + rz * cx
        const perspective = 4.5 / Math.max(1.5, 4.5 - depth)
        const targetX = width / 2 + (rx * ct - ry * st) * scale * perspective
        const targetY = height / 2 + (rx * st + ry * ct) * scale * perspective
        const previousX = targetX + particle.offsetX
        const previousY = targetY + particle.offsetY
        const influence = delta > 0 ? displaceParticle(particle, targetX, targetY, pointer, radiusOfInfluence, delta) : 0
        const p = projected[count++]
        p.x = targetX + particle.offsetX
        p.y = targetY + particle.offsetY
        p.z = depth
        p.previousX = previousX
        p.previousY = previousY
        p.size = Math.max(0.5, (0.65 + (depth + 1.4) * 0.3) * perspective) + influence * 0.65
        p.hue = 174 + (Math.cos(u + turn) + 1) * 28
        p.light = 64 + depth * 10 + influence * 18
        p.alpha = Math.max(0.13, Math.min(0.95, (depth + 1.8) / 2.9)) * (1 - scatter * 0.28)
        p.glow = influence
      }
      // Reuse the projection records instead of allocating one object per point per frame.
      const ordered = projected.slice(0, count).sort((a, b) => a.z - b.z)
      for (const p of ordered) {
        if (p.x < -8 || p.x > width + 8 || p.y < -8 || p.y > height + 8) continue
        if (p.glow > 0.12) {
          ctx.strokeStyle = `hsla(${p.hue}, 85%, 78%, ${p.glow * 0.28})`
          ctx.lineWidth = p.size * 0.7
          ctx.beginPath()
          ctx.moveTo(p.previousX, p.previousY)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
        ctx.fillStyle = `hsla(${p.hue}, 78%, ${p.light}%, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      scene.style.setProperty("--orbit-scatter", scatter.toFixed(3))
    }

    const tick = (now: number) => {
      frame = 0
      if (disposed || !visible || document.hidden || stopped) return
      if (now - last >= 1000 / 30) {
        const delta = Math.min((now - (last || now - 33.3)) / 1000, 0.05)
        last = now
        clock.time += delta
        clock.assembly *= Math.exp(-delta * 3.6)
        if (clock.assembly < 0.001) clock.assembly = 0
        clock.scatter += (targetScatter - clock.scatter) * (1 - Math.exp(-delta * 9))
        draw(delta)
      }
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!frame && !stopped && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(tick) }
    }
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      readScroll()
      draw()
    }
    const move = (event: PointerEvent) => {
      if (stopped || event.pointerType !== "mouse") return
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const leave = () => { pointer.active = false }
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; leave() }
      else { readScroll(); start() }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) { readScroll(); start() }
      else { cancelAnimationFrame(frame); frame = 0; leave() }
    })
    const resizer = new ResizeObserver(resize)
    observer.observe(canvas)
    resizer.observe(canvas)
    canvas.addEventListener("pointermove", move, { passive: true })
    canvas.addEventListener("pointerleave", leave)
    window.addEventListener("scroll", readScroll, { passive: true })
    window.addEventListener("blur", leave)
    document.addEventListener("visibilitychange", onVisibility)
    resize()
    start()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizer.disconnect()
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerleave", leave)
      window.removeEventListener("scroll", readScroll)
      window.removeEventListener("blur", leave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [paused, reduced])

  return (
    <div ref={sceneRef} className="particle-scene">
      <div className="scene-orbit scene-orbit-outer" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-inner" aria-hidden="true" />
      <span className="scene-coordinate" aria-hidden="true">ideia → código → produção</span>
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      <div className="scene-controls">
        <span className="scene-interaction-hint"><MousePointer2 size={12} /><span className="hint-mouse">Explore com o mouse</span><span className="hint-touch">Explore ao rolar</span></span>
        <button type="button" className="effects-toggle" onClick={toggle} disabled={reduced} aria-label={reduced ? "Movimento reduzido ativado no sistema" : paused ? "Ativar efeitos" : "Pausar efeitos"} title={reduced ? "Movimento reduzido no sistema" : paused ? "Ativar efeitos" : "Pausar efeitos"} aria-pressed={paused || reduced}>
          {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>
    </div>
  )
}
