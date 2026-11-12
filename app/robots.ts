import type { MetadataRoute } from "next";
import { getAppUrl } from "@/src/lib/utils/env";

export default function robots(): MetadataRoute.Robots {
  const base = getAppUrl().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/", "/api/", "/login"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
