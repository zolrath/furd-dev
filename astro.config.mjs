import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkReadingTime, remarkFlatSectionize } from '/src/remark';
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import latte from '@catppuccin/vscode/themes/latte.json'
import macchiato from '@catppuccin/vscode/themes/macchiato.json'

const astroExpressiveCodeOptions = {
  themes: [latte, macchiato],
  themeCssRoot: ":root",
  themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
  styleOverrides: {
    frames: {
      shadowColor: '#00000',
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://furd.dev',
  integrations: [
    expressiveCode(astroExpressiveCodeOptions),
    mdx(), sitemap(), react(),
    tailwind({ applyBaseStyles: false }),
    icon({
    include: {
      lucide: ["*"],
      ri: ["*"],
    }
    }),
  ],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkFlatSectionize,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: "no-underline" } }],
      [rehypeExternalLinks, { target: '_blank' }],
    ]
  }
});
