import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://scaleup.gg"
  const lastModified = new Date()

  return [
    { url: `${base}/`, lastModified },
    { url: `${base}/privacidade`, lastModified },
    { url: `${base}/termos`, lastModified },
  ]
}
