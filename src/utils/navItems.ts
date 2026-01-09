import type { ComponentType } from "react";
import {LayoutDashboard, FolderKanban, SquareKanban, FileBarChart , Users   } from "lucide-react";
export type NavIcon = ComponentType<any>;

interface SubNavItem {
  label: string;
  icon?:NavIcon;
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
    icon: LayoutDashboard,
    path: "/dashboard",
    matchPaths: ["/dashboard"],
  },
  {
    label: "Projects ",
    icon: FolderKanban,
    path: "/projects",
    matchPaths: ["/projects"],
  },
  {
    label: "Issues",
    icon: SquareKanban,
    path: "/issues",
    matchPaths: ["/issues"],
  },
  {
    label: "Analysis",
    path: "/reports",
    matchPaths: ["/teams", "/reports"],
    children: [
      {
        label: "Reports",
        icon: FileBarChart,
        path: "/reports",
        matchPaths: ["/reports"],
      },
      {
        label: "Teams",
        icon: Users,
        path: "/teams",
        matchPaths: ["/teams"],
      },
    ],
  },
];
