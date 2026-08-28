import type { MetadataRoute } from "next";
import { BUSINESSES } from "@/lib/business";
import { SITE } from "@/lib/site";

/**
 * sitemap.xml — 기획서 7.4
 *
 * /news 는 Phase 2 이므로 포함하지 않는다 (보안 체크리스트 C-1).
 * 운영을 시작하면 여기에 추가하고 app/news/page.tsx 의 noindex 를 제거한다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "yearly" },
    { path: "/careers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...BUSINESSES.map((business) => ({
      url: `${SITE.url}/business/${business.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
