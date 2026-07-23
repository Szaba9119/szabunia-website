import type { MetadataRoute } from "next";
import { portfolioCategories, isPortfolioDraft } from "@/data/portfolio";
import { serviceCategories } from "@/data/services";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://szabunia.pl";

  const portfolioPages = portfolioCategories
    .filter((c) => !c.externalUrl && !isPortfolioDraft(c.slug))
    .map((c) => ({
      url: `${baseUrl}/portfolio/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const servicePages = serviceCategories.map((s) => ({
    url: `${baseUrl}/uslugi/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/uslugi`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${baseUrl}/kontakt`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/galeria`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...portfolioPages,
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPages,
    {
      url: `${baseUrl}/poradnik`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
