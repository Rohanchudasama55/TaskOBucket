import { LogOut } from 'lucide-react';
import { useLogout, useAuthState } from '../../hooks/useAuth';

interface LogoutButtonProps {
  className?: string;
  showText?: boolean;
}

export function LogoutButton({ className = '', showText = true }: LogoutButtonProps) {
  const { user } = useAuthState();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200 disabled:opacity-50 ${className}`}
      title={`Logout ${user?.email || ''}`}
    >
      <LogOut className="h-4 w-4" />
      {showText && (
        <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
      )}
    </button>
  );
}