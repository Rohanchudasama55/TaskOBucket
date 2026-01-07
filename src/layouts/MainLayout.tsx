import { useState } from "react";
import type { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../components/ui/Avatar";
import { navItems } from "../utils/navItems";
import { Button } from "../components/ui/Button";

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ================= Sidebar (Desktop) ================= */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="ml-2 text-xl font-bold">TaskoBucket</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ================= Mobile Sidebar ================= */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full text-left px-4 py-2 rounded-lg
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ================= Main Area ================= */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">
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
            <Button className="text-gray-500" variant="secondary">🔔</Button>
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
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
