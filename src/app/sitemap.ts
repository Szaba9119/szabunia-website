import type { MetadataRoute } from "next";
import { portfolioCategories, isPortfolioDraft } from "@/data/portfolio";
import { serviceCategories } from "@/data/services";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://szabunia.pl";

  // Data ostatniej istotnej zmiany treści statycznych tras i stron usług.
  // Podnosić RĘCZNIE przy realnej zmianie treści — `new Date()` przy każdym
  // buildzie byłoby fałszywym sygnałem świeżości (audyt PELNY2907-29).
  //
  // 12.09.2026: wdrożenie MASTER — treści usług, kontaktu i realizacji.
  // 14.09.2026: dopracowanie czterech podstron usług, strona główna, stopka z usługami.
  // 22-23.09.2026: eventy pierwsze w całym serwisie, przebudowa czterech podstron usług,
  // galeria i strona główna (commity 0bbbdd9..5709bb9), audyt 23.09.
  const SITE_UPDATED = new Date("2026-09-23");

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
    lastModified: new Date(p.updated ?? p.date),
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
      lastModified: new Date("2026-08-11"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
