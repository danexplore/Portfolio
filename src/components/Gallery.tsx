"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

type GalleryImage = { src: string; alt: string }

type GalleryProps = {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (delta: number) => {
      setActive((current) => (current === null ? null : (current + delta + images.length) % images.length))
    },
    [images.length],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active, close, step])

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            className="card group relative aspect-video overflow-hidden p-0"
            aria-label={`Ampliar: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[active].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button type="button" onClick={close} aria-label="Fechar" className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:text-fg">
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  step(-1)
                }}
                aria-label="Anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted hover:text-fg sm:left-6"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  step(1)
                }}
                aria-label="Próxima"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted hover:text-fg sm:right-6"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          ) : null}
          <div className="relative h-[80vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" priority />
          </div>
        </div>
      ) : null}
    </>
  )
}
