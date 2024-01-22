import { ProjectDisplay } from "@/types/project";
import { getCollection } from "astro:content";

export async function getProjects() {
  let projects = await getCollection("projects", ({ data }) => {
    return data.display !== ProjectDisplay.Hidden;
  });
  return projects
}
