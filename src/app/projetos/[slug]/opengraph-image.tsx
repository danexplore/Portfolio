import { ImageResponse } from "next/og"
import { OgCard } from "@/components/OgCard"
import { featuredProjects, getFeaturedProject } from "@/content/projects"
import { site } from "@/content/site"

export const alt = "Estudo de caso"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getFeaturedProject(slug)
  const eyebrow = project ? `${project.company} · estudo de caso` : "Estudo de caso"
  const title = project ? project.title : site.headline

  return new ImageResponse(<OgCard eyebrow={eyebrow} title={title} footer={site.name} />, size)
}
