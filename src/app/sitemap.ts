import type { MetadataRoute } from "next";
import { portfolioCategories, isPortfolioDraft } from "@/data/portfolio";
import { serviceCategories } from "@/data/services";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://szabunia.pl";

  // Data ostatniej istotnej zmiany treści statycznych tras i stron usług.
  // Podnosić RĘCZNIE przy realnej zmianie treści — `new Date()` przy każdym
  // buildzie byłoby fałszywym sygnałem świeżości (audyt PELNY2907-29).
  const SITE_UPDATED = new Date("2026-07-29");

  const portfolioPages = portfolioCategories
    .filter((c) => !c.externalUrl && !isPortfolioDraft(c.slug))
    .map((c) => ({
      url: `${baseUrl}/portfolio/${c.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const servicePages = serviceCategories.map((s) => ({
    url: `${baseUrl}/uslugi/${s.slug}`,
    lastModified: SITE_UPDATED,
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
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/uslugi`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${baseUrl}/kontakt`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...portfolioPages,
    {
      url: `${baseUrl}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPages,
    {
      url: `${baseUrl}/poradnik`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
