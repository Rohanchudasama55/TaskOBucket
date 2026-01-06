import type { ComponentType } from "react";

export type NavIcon =ComponentType<any>;


 interface SubNavItem {
  label: string;
  path: string;
  matchPaths: string[];
  children?: NavItem[];
}
    
 interface NavItem {
  label: string;
  icon?: NavIcon;
  path: string;
  matchPaths: string[];
  children?: SubNavItem[];
}
export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    // icon: SpaceDashboardIcon,
    path: "/dashboard", 
    matchPaths: ["/dashboard"],
  },
  {
    label: "Projects ",
    // icon: CategoryIcon,
    path: "/Projects",
    matchPaths: [
        "/Projects"
    ],
    // children: [
    //   {
    //     label: "Categories",
    //     path: "/categories",
    //     matchPaths: [
    //       "/categories",
    //     ],
    //   },
    //   {
    //     label: "Sub categories",
    //     path: "/sub_categories",
    //     matchPaths: [
    //       "/sub_categories",
    //     ],
    //   },
    // ],
  },
   {
    label: "Issues",
    // icon: HomeIcon,
    path: "/issues",
    matchPaths: ["/issues"],
  },
  {
    label: "Teams",
    // icon: DnsIcon,
    path: "/teams",
    matchPaths: ["/teams"],
  },
];
