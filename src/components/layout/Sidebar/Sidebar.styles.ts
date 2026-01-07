// Desktop Sidebar Styles
export const DESKTOP_SIDEBAR_STYLES = 'hidden md:flex w-64 flex-col border-r bg-white';

// Mobile Sidebar Styles
export const MOBILE_OVERLAY_STYLES = 'fixed inset-0 z-50 md:hidden';
export const MOBILE_BACKDROP_STYLES = 'absolute inset-0 bg-black/30';
export const MOBILE_SIDEBAR_STYLES = 'absolute left-0 top-0 h-full w-64 bg-white shadow-lg';

// Logo Styles
export const LOGO_CONTAINER_STYLES = 'h-16 flex items-center px-6 border-b';
export const LOGO_ICON_STYLES = 'w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center';
export const LOGO_ICON_TEXT_STYLES = 'text-white font-bold text-sm';
export const LOGO_TEXT_STYLES = 'ml-2 text-xl font-bold';

// Mobile Header Styles
export const MOBILE_HEADER_STYLES = 'h-16 flex items-center justify-between px-4 border-b';
export const MOBILE_TITLE_STYLES = 'text-lg font-semibold';

// Navigation Styles
export const NAV_CONTAINER_STYLES = 'flex-1 p-4 space-y-2';
export const NAV_BUTTON_BASE_STYLES = 'w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition';
export const NAV_BUTTON_ACTIVE_STYLES = 'bg-blue-50 text-blue-600';
export const NAV_BUTTON_INACTIVE_STYLES = 'text-gray-600 hover:bg-gray-100';
export const NAV_BUTTON_MOBILE_INACTIVE_STYLES = 'text-gray-700 hover:bg-gray-100';

export const getSidebarStyles = (isMobile: boolean, className?: string): string => {
  const baseStyles = isMobile ? MOBILE_SIDEBAR_STYLES : DESKTOP_SIDEBAR_STYLES;
  return [baseStyles, className].filter(Boolean).join(' ');
};

export const getNavButtonStyles = (isActive: boolean, isMobile: boolean = false): string => {
  const activeStyles = isActive ? NAV_BUTTON_ACTIVE_STYLES : 
    (isMobile ? NAV_BUTTON_MOBILE_INACTIVE_STYLES : NAV_BUTTON_INACTIVE_STYLES);
  
  return [NAV_BUTTON_BASE_STYLES, activeStyles].join(' ');
};