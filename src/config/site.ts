import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Furd.dev",
  description: "Musings about programming, art, and game dev.",
  url: "https://furd.dev",
  ogImage: "https://furd.dev/og.jpg",
  links: {
    twitter: "https://twitter.com/zolrath",
    github: "https://github.com/zolrath",
  },
  showDrafts: import.meta.env.DEV ? true : false,
  // showDrafts: false,
};
