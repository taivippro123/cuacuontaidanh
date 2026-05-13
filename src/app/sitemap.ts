import type { MetadataRoute } from "next";
import { SITE_PRIMARY_ORIGIN } from "@/lib/site";
import { getProductSlugsStatic } from "@/lib/products-data";

function baseUrl(): string {
  return SITE_PRIMARY_ORIGIN.replace(/\/$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = baseUrl();
  const now = new Date();
  const slugs = await getProductSlugsStatic();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/shop-with-sidebar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/shop-without-sidebar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/mail-success`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const productEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/shop-details/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...productEntries];
}
