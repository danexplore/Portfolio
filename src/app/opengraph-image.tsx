import { ImageResponse } from "next/og"
import { site } from "@/content/site"
import { OgCard } from "@/components/OgCard"

export const alt = `${site.name} · ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(<OgCard eyebrow={`${site.role} · ${site.company}`} title={site.headline} footer={site.name} />, size)
}
