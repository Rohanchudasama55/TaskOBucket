import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from '../../hooks/useAuth';



export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthState();
  const location = useLocation();

  console.log('ProtectedRoute check:', { isAuthenticated, isLoading, path: location.pathname });

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}