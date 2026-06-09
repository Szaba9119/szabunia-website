import { blogPosts } from "@/data/blog";

const BASE_URL = "https://szabunia.pl";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const CATEGORY_LABELS: Record<string, string> = {
  poradnik: "Poradnik",
  realizacja: "Realizacja",
  "branża": "Branża",
};

export async function GET() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(CATEGORY_LABELS[post.category] ?? post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = sorted.length
    ? new Date(sorted[0].date).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Marcin Szabunia | Fotografia i wideo B2B</title>
    <link>${BASE_URL}/blog</link>
    <description>Poradniki, realizacje i wiedza branżowa: fotografia biznesowa, eventowa, produktowa i wideo marketing dla firm.</description>
    <language>pl-PL</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
