import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkSectionize from 'remark-sectionize';
import icon from "astro-icon";
// import { transformerNotationDiff } from "shikiji-transformers";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
const prettyCodeOptions = {
  theme: {
    light: "dark-plus",
    dark: "catppuccin-macchiato"
  },
  defaultLang: "plaintext",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{
        type: "text",
        value: " "
      }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {}
};


// https://astro.build/config
export default defineConfig({
  site: 'https://furd.dev',
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false
    }),
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
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkSectionize],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], [rehypeExternalLinks, {
      target: '_blank'
    }]]
  }
});
