import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationManager } from '../../utils/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component that handles automatic redirects based on stored auth state
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only check auth state on public routes (auth pages)
    const isAuthRoute = location.pathname.startsWith('/auth/');
    
    if (isAuthRoute) {
      // Check if user is already authenticated and redirect if needed
      NavigationManager.handleAuthStateRedirect(navigate);
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
}

export default AuthGuard;