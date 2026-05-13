import type { MetadataRoute } from "next";
import { SITE_PRIMARY_ORIGIN } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_PRIMARY_ORIGIN.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: new URL(SITE_PRIMARY_ORIGIN).host,
  };
}
