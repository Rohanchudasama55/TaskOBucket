import { Button } from "../../ui/Button";
import { Avatar } from "../../ui/Avatar";
import type { HeaderProps } from './Header.types';
import { 
  DEFAULT_SHOW_MOBILE_MENU, 
  DEFAULT_CLASS_NAME, 
  MOBILE_MENU_ICON,
  DEFAULT_USER 
} from './Header.constants';
import {
  getHeaderStyles,
  MOBILE_MENU_BUTTON_STYLES,
  SEARCH_CONTAINER_STYLES,
  SEARCH_INPUT_STYLES,
  RIGHT_SECTION_STYLES,
  USER_INFO_STYLES,
  USER_DETAILS_STYLES,
  USER_NAME_STYLES,
  USER_EMAIL_STYLES
} from './Header.styles';

export function Header({ 
  onMenuToggle, 
  showMobileMenu = DEFAULT_SHOW_MOBILE_MENU,
  className = DEFAULT_CLASS_NAME 
}: HeaderProps) {
  const headerStyles = getHeaderStyles(className);

  return (
    <header className={headerStyles}>
      {/* Mobile Menu Button */}
      {showMobileMenu && (
        <button
          onClick={onMenuToggle}
          className={MOBILE_MENU_BUTTON_STYLES}
        >
          {MOBILE_MENU_ICON}
        </button>
      )}

      {/* Search */}
      <div className={SEARCH_CONTAINER_STYLES}>
        <input
          placeholder="Search..."
          className={SEARCH_INPUT_STYLES}
        />
      </div>

      {/* Right Section */}
      <div className={RIGHT_SECTION_STYLES}>
        <Button className="text-gray-500" variant="secondary">
          🔔
        </Button>
        <div className={USER_INFO_STYLES}>
          <Avatar
            src={DEFAULT_USER.avatar}
            size={32}
          />
          <div className={USER_DETAILS_STYLES}>
            <div className={USER_NAME_STYLES}>{DEFAULT_USER.name}</div>
            <div className={USER_EMAIL_STYLES}>{DEFAULT_USER.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}