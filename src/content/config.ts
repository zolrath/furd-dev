import type { ProjectCategory, ProjectDisplay, ProjectStatus } from "@/types/project"
import { defineCollection, reference, z } from "astro:content"

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string(),
    coverImageAlt: z.string(),
    draft: z.boolean().default(false),
    publishDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .or(z.date())
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()),
    category: z.string(),
    relatedPosts: z.array(reference('blog')).optional(),
  }),
})

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    link: z.string(),
    external: z.boolean().default(false),
    description: z.string(),
    coverImage: z.string(),
    coverImageAlt: z.string(),
    projectStart: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    projectEnd: z
      .string()
      .or(z.date())
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    category: z.custom<ProjectCategory>(),
    status: z.custom<ProjectStatus>(),
    display: z.custom<ProjectDisplay>(),
    technologies: z.array(z.string()),
  }),
})

export const collections = {
  blog, projects
}
