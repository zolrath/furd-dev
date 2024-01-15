declare enum ProjectCategory {
  Game = "game",
  Website = "website",
  Tool = "tool",
  Art = "art",
}

declare enum ProjectStatus {
  InProgress = "in-progress",
  OnHold = "on-hold",
  Finished = "finished",
}

declare enum ProjectDisplay {
  Hero = "hero",
  Card = "card",
  List = "list",
  Hidden = "hidden",
}

declare interface Project {
  name: string;
  slug: string;
  link: string;
  description: string;
  background: string;
  category: ProjectCategory;
  status: ProjectStatus;
  display: ProjectDisplay;
}
