import { User } from 'lucide-react';
import { useAuthState } from '../../hooks/useAuth';
import { LogoutButton } from './LogoutButton';

export function UserProfile() {
  const { user, token, isAuthenticated, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg ring-1 ring-slate-200/50">
      {/* Avatar */}
      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white text-sm font-semibold">
        {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
      </div>
      
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">
          {user?.name || 'User'}
        </p>
        <p className="text-xs text-slate-500 truncate">
          {user?.email}
        </p>
      </div>

      {/* Logout Button */}
      <LogoutButton showText={false} className="p-1" />
      
      {/* Token Info (for demo) */}
      {token && (
        <div className="text-xs text-slate-400 font-mono">
          Token: {token.substring(0, 10)}...
        </div>
      )}
    </div>
  );
}