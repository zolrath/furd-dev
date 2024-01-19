export enum ProjectCategory {
  Game = "game",
  Website = "website",
  Tool = "tool",
  Art = "art",
}

export enum ProjectStatus {
  InProgress = "in-progress",
  OnHold = "on-hold",
  Finished = "finished",
}

export enum ProjectDisplay {
  Hero = "hero",
  List = "list",
  Hidden = "hidden",
}

export type Project = {
  name: string;
  slug: string;
  link: string;
  description: string;
  headerImage: string;
  category: ProjectCategory;
  status: ProjectStatus;
  display: ProjectDisplay;
}
