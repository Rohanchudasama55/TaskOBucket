import { useState } from "react";
import type { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../components/ui/Avatar";
import { navItems } from "../utils/navItems";
import { Button } from "../components/ui/Button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LogoutButton } from "../components/auth";

interface MainLayoutProps {
  children?: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };
  const isPathActive = (matchPaths: string[], pathname: string) => {
    return matchPaths.some((path) => pathname.startsWith(path));
  };
  return (
    <div className="flex max-h-screen overflow-hidden bg-gray-50">
      {/* ================= Sidebar (Desktop) ================= */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        {/* Logo */}
        <div className="min-h-16 flex items-center px-6 border-b">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="ml-2 text-xl font-bold">TaskoBucket</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isParentActive = isPathActive(
              item.matchPaths,
              location.pathname
            );

            const ParentIcon = item.icon;

            return (
              <div key={item.path}>
                {/* ===== Parent Item ===== */}
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition
                              ${
                                isParentActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-600 hover:bg-gray-100"
                              }
                            `}
                >
                  <div className="flex items-center gap-3">
                    {ParentIcon && <ParentIcon className="w-4 h-4 shrink-0" />}
                    <span>{item.label}</span>
                  </div>

                  {item.children && (
                    <span className="text-xs">
                      {isParentActive ? <ChevronDown /> : <ChevronRight />}
                    </span>
                  )}
                </button>

                {/* ===== Child Items ===== */}
                {item.children && isParentActive && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = isPathActive(
                        child.matchPaths,
                        location.pathname
                      );

                      const ChildIcon = child.icon;

                      return (
                        <button
                          key={child.path}
                          onClick={() => handleNavigate(child.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                                      ${
                                        isChildActive
                                          ? "bg-blue-100 text-blue-700"
                                          : "text-gray-600 hover:bg-gray-100"
                                      }
                                    `}
                        >
                          {ChildIcon && (
                            <ChildIcon className="w-4 h-4 shrink-0" />
                          )}
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="flex justify-center w-full px-3 py-2  items-center" ><LogoutButton /></div>
      </aside>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsSidebarOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-64 bg-white flex flex-col shadow-lg">
            <div className="min-h-16 flex items-center justify-between px-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>
            {/* <div className="flex justify-between flex-col h-auto"> */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isParentActive = isPathActive(
                  item.matchPaths,
                  location.pathname
                );

                const ParentIcon = item.icon;

                return (
                  <div key={item.path}>
                    {/* ===== Parent Item ===== */}
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition
                                  ${
                                    isParentActive
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }
                                `}
                    >
                      <div className="flex items-center gap-3">
                        {ParentIcon && (
                          <ParentIcon className="w-4 h-4 shrink-0" />
                        )}
                        <span>{item.label}</span>
                      </div>

                      {item.children && (
                        <span className="text-xs">
                          {isParentActive ? <ChevronDown /> : <ChevronRight />}
                        </span>
                      )}
                    </button>

                    {/* ===== Child Items ===== */}
                    {item.children && isParentActive && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const isChildActive = isPathActive(
                            child.matchPaths,
                            location.pathname
                          );

                          const ChildIcon = child.icon;

                          return (
                            <button
                              key={child.path}
                              onClick={() => handleNavigate(child.path)}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                                          ${
                                            isChildActive
                                              ? "bg-blue-100 text-blue-700"
                                              : "text-gray-600 hover:bg-gray-100"
                                          }
                                        `}
                            >
                              {ChildIcon && (
                                <ChildIcon className="w-4 h-4 shrink-0" />
                              )}
                              <span>{child.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="flex justify-center w-full px-3 py-2  items-center" ><LogoutButton /></div>
            {/* </div> */}
          </aside>
        </div>
      )}

      {/* ================= Main Area ================= */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="min-h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-500"
          >
            ☰
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <input
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button className="text-gray-500" variant="secondary">
              🔔
            </Button>
            <div className="flex items-center gap-2">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                size={32}
              />
              <div className="hidden sm:block">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-500">john@example.com</div>
              </div>
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 min-h-screen">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
