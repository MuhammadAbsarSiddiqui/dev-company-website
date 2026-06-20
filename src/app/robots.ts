import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual domain when deploying
  const baseUrl = "https://devstudio.example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
