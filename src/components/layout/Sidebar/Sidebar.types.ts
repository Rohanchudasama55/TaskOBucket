export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  className?: string;
}

export interface NavItem {
  path: string;
  label: string;
}

export interface SidebarNavProps {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}