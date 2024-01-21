export type SiteConfig = {
  name: string;
  author: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    twitter_username: string;
    github: string;
  };
  showDrafts: boolean;
};
