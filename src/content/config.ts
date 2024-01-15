import type { ProjectCategory, ProjectDisplay, ProjectStatus } from "@mytypes/project"
import { defineCollection, reference, z } from "astro:content"

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    draft: z.boolean().default(false),
    publishDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    relatedPosts: z.array(reference('blog')).optional(),
  }),
})

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    link: z.string(),
    description: z.string(),
    headerImage: z.string(),
    category: z.custom<ProjectCategory>(),
    status: z.custom<ProjectStatus>(),
    display: z.custom<ProjectDisplay>(),
  }),
})

export const collections = {
  blog, projects
}
