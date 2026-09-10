import type { MetadataRoute } from "next"
import { featuredProjects } from "@/content/projects"
import { site } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((project) => ({
      url: `${site.url}/projetos/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
