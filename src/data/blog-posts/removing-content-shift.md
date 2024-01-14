---
title: Removing content shift caused by scrollbars
publishDate: 24 May 2021
description: It's gotten easy to remove content shift when a scrollbar appears with `scrollbar-gutter`
tags: [webdev, css]
---

For some reason whenever a site's content shifts when a scrollbar appears a little part of me feels the need to fix it.

Usually it's a passing desire but I've been trying various *Personal Knowledge Management* solutions and it's extremely apparent in that type of application as you dive into nodes and expand or collapse them.

In my war against content shift I've applied this fix to [Logseq](https://github.com/logseq/logseq/pull/1972), [Athens](https://github.com/athensresearch/athens/pull/1212) and most importantly the [Phoenix Framework](https://github.com/phoenixframework/phoenix/pull/5101) for Elixir, solving this issue to an untold number of sites built in the framework.

![Video displaying content shift before and after using scrollbar-gutter](@assets/blog/scrollbar-gutter/logseq-fix.webp)

Luckily this has been made fairly easy in modern browsers with the `scrollbar-gutter{:css}` property. (RIP `overflow-y: overlay{:css}`)
By simply adding `scrollbar-gutter: stable{:css}` to the `html{:html}` element the space for the scrollbar will always be reserved, even if the content doesn't overflow.

```css
@supports (scrollbar-gutter: stable) {
  html {
      overflow-y: auto;
      scrollbar-gutter: stable;
  }
}
```

Please add this to your site and save me from the content shift.
