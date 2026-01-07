export interface HeaderProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
  className?: string;
}

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}