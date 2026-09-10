export type OrbitParticle = {
  u: number
  v: number
  scatterX: number
  scatterY: number
  scatterZ: number
  offsetX: number
  offsetY: number
  velocityX: number
  velocityY: number
}

export function createOrbitParticles(count: number): OrbitParticle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = index * 2.3999632297
    const height = 1 - 2 * (index + 0.5) / count
    const radius = Math.sqrt(1 - height * height)
    return {
      u: index / count * Math.PI * 2,
      v: angle,
      scatterX: Math.cos(angle) * radius * (1.7 + (index % 7) * 0.16),
      scatterY: Math.sin(angle) * radius * (1.7 + (index % 11) * 0.1),
      scatterZ: height * 1.6,
      offsetX: 0,
      offsetY: 0,
      velocityX: 0,
      velocityY: 0,
    }
  })
}

// Screen-space springs let individual particles move independently of the orbit.
export function displaceParticle(
  particle: OrbitParticle,
  x: number,
  y: number,
  pointer: { x: number; y: number; active: boolean },
  radius: number,
  delta: number,
) {
  const step = Math.min(delta * 60, 2)
  const dx = x + particle.offsetX - pointer.x
  const dy = y + particle.offsetY - pointer.y
  const distance = Math.hypot(dx, dy)
  const influence = pointer.active ? Math.max(0, 1 - distance / radius) : 0
  const force = influence * influence * 5.5
  const normalX = distance > 0.01 ? dx / distance : Math.cos(particle.v)
  const normalY = distance > 0.01 ? dy / distance : Math.sin(particle.v)
  // A little tangential force curls the particles around the pointer.
  const forceX = (normalX - normalY * 0.4) * force
  const forceY = (normalY + normalX * 0.4) * force
  const damping = Math.pow(0.84, step)
  particle.velocityX = (particle.velocityX + (forceX - particle.offsetX * 0.035) * step) * damping
  particle.velocityY = (particle.velocityY + (forceY - particle.offsetY * 0.035) * step) * damping
  particle.offsetX += particle.velocityX * step
  particle.offsetY += particle.velocityY * step
  return influence
}

export function orbitScrollProgress(top: number, height: number) {
  const progress = Math.min(1, Math.max(0, -top / Math.max(1, height * 0.65)))
  return progress * progress * (3 - 2 * progress)
}
