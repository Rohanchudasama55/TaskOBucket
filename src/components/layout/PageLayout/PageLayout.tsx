import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import type { PageLayoutProps, AuthLayoutProps, MainLayoutProps } from './PageLayout.types';
import { 
  DEFAULT_CLASS_NAME, 
  DEFAULT_SHOW_HEADER, 
  DEFAULT_SHOW_SIDEBAR 
} from './PageLayout.constants';
import {
  getMainLayoutStyles,
  getAuthLayoutStyles,
  MAIN_CONTENT_AREA_STYLES,
  MAIN_CONTENT_STYLES
} from './PageLayout.styles';

export function PageLayout({ 
  children, 
  className = DEFAULT_CLASS_NAME,
  showHeader = DEFAULT_SHOW_HEADER,
  showSidebar = DEFAULT_SHOW_SIDEBAR
}: PageLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const layoutStyles = getMainLayoutStyles(className);

  return (
    <div className={layoutStyles}>
      {/* Sidebar */}
      {showSidebar && (
        <>
          <Sidebar />
          <Sidebar 
            isMobile 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        </>
      )}

      {/* Main Area */}
      <div className={MAIN_CONTENT_AREA_STYLES}>
        {/* Header */}
        {showHeader && (
          <Header 
            onMenuToggle={() => setIsSidebarOpen(true)}
            showMobileMenu={showSidebar}
          />
        )}
        
        {/* Content */}
        <main className={MAIN_CONTENT_STYLES}>
          {children}
        </main>
      </div>
    </div>
  );
}

export function AuthLayout({ children, className = DEFAULT_CLASS_NAME }: AuthLayoutProps) {
  const layoutStyles = getAuthLayoutStyles(className);
  
  return (
    <div className={layoutStyles}>
      {children}
    </div>
  );
}

export function MainLayout({ children, className = DEFAULT_CLASS_NAME }: MainLayoutProps) {
  return (
    <PageLayout className={className}>
      {children || <Outlet />}
    </PageLayout>
  );
}