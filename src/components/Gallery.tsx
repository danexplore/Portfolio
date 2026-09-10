"use client"

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type GalleryImage = { src: string; alt: string }
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isOpen = active !== null
  const step = (delta: number) => setActive(current => current === null ? null : (current + delta + images.length) % images.length)
  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = "hidden"
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [isOpen])
  return <>
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image, index) => <button key={image.src} type="button" onClick={() => setActive(index)} className="card group relative aspect-video overflow-hidden p-0" aria-label={`Ampliar: ${image.alt}`}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 420px, (min-width: 640px) 45vw, 90vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="gallery-expand"><Expand size={16} /></span>
      </button>)}
    </div>
    <dialog ref={dialogRef} className="gallery-dialog" aria-label={active !== null ? images[active].alt : "Galeria de imagens dos projetos"} onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close() }} onKeyDown={event => {
      if (event.key === "Tab") {
        const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button")
        const first = buttons[0], last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1) }
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1) }
    }}>
      {active !== null ? <>
        <div className="gallery-toolbar"><p>{images[active].alt}</p><span aria-live="polite">{active + 1} / {images.length}</span><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar galeria"><X size={22} /></button></div>
        <div className="gallery-image"><Image src={images[active].src} alt={images[active].alt} fill sizes="(min-width: 1280px) 1152px, 90vw" className="object-contain" /></div>
        {images.length > 1 ? <div className="gallery-navigation"><button type="button" onClick={() => step(-1)} aria-label="Imagem anterior"><ChevronLeft size={22} /></button><span>Use as setas para navegar</span><button type="button" onClick={() => step(1)} aria-label="Próxima imagem"><ChevronRight size={22} /></button></div> : null}
      </> : null}
    </dialog>
  </>
}
