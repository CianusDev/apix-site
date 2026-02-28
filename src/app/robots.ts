import type { MetadataRoute } from "next";
import { clientEnv } from "@/config/env";

const BASE_URL = clientEnv.APP_URL ?? "https://apix.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
