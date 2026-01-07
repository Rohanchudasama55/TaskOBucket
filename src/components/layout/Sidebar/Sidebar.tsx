import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../../utils/navItems";
import type { SidebarProps, SidebarNavProps } from './Sidebar.types';
import { 
  DEFAULT_IS_OPEN, 
  DEFAULT_IS_MOBILE, 
  DEFAULT_CLASS_NAME,
  CLOSE_ICON,
  BRAND_CONFIG
} from './Sidebar.constants';
import {
  getSidebarStyles,
  getNavButtonStyles,
  MOBILE_OVERLAY_STYLES,
  MOBILE_BACKDROP_STYLES,
  LOGO_CONTAINER_STYLES,
  LOGO_ICON_STYLES,
  LOGO_ICON_TEXT_STYLES,
  LOGO_TEXT_STYLES,
  MOBILE_HEADER_STYLES,
  MOBILE_TITLE_STYLES,
  NAV_CONTAINER_STYLES
} from './Sidebar.styles';

function SidebarNav({ items, currentPath, onNavigate }: SidebarNavProps) {
  return (
    <nav className={NAV_CONTAINER_STYLES}>
      {items.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={getNavButtonStyles(isActive)}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function DesktopSidebar({ className }: { className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <aside className={getSidebarStyles(false, className)}>
      {/* Logo */}
      <div className={LOGO_CONTAINER_STYLES}>
        <div className={LOGO_ICON_STYLES}>
          <span className={LOGO_ICON_TEXT_STYLES}>{BRAND_CONFIG.icon}</span>
        </div>
        <span className={LOGO_TEXT_STYLES}>{BRAND_CONFIG.name}</span>
      </div>

      {/* Nav Items */}
      <SidebarNav 
        items={navItems}
        currentPath={location.pathname}
        onNavigate={handleNavigate}
      />
    </aside>
  );
}

function MobileSidebar({ isOpen, onClose, className }: { isOpen: boolean; onClose?: () => void; className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className={MOBILE_OVERLAY_STYLES}>
      <div
        className={MOBILE_BACKDROP_STYLES}
        onClick={onClose}
      />
      <aside className={getSidebarStyles(true, className)}>
        <div className={MOBILE_HEADER_STYLES}>
          <span className={MOBILE_TITLE_STYLES}>Menu</span>
          <button onClick={onClose}>{CLOSE_ICON}</button>
        </div>

        <SidebarNav 
          items={navItems}
          currentPath={location.pathname}
          onNavigate={handleNavigate}
        />
      </aside>
    </div>
  );
}

export function Sidebar({ 
  isOpen = DEFAULT_IS_OPEN, 
  onClose, 
  isMobile = DEFAULT_IS_MOBILE,
  className = DEFAULT_CLASS_NAME 
}: SidebarProps) {
  if (isMobile) {
    return <MobileSidebar isOpen={isOpen} onClose={onClose} className={className} />;
  }

  return <DesktopSidebar className={className} />;
}