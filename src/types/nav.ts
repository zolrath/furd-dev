export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MenuItem = NavItem & {
  description?: string;
  launched?: boolean;
  external?: boolean;
};

export type MainNavItem = NavItem;

export type NavConfig = {
  mainNav: MainNavItem[];
};


export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: MenuItem[];
    }
);

export type NavMenuConfig = {
  infosNav: SidebarNavItem[];
  examplesNav: SidebarNavItem[];
  links: MenuItem[];
};
