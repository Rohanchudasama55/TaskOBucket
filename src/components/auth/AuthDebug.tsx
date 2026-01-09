import { useAuthState } from '../../hooks/useAuth';

export function AuthDebug() {
  const { user, token, isAuthenticated, isLoading } = useAuthState();

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Loading: {isLoading ? 'true' : 'false'}</div>
        <div>Authenticated: {isAuthenticated ? 'true' : 'false'}</div>
        <div>User: {user ? user.email : 'null'}</div>
        <div>Token: {token ? `${token.substring(0, 20)}...` : 'null'}</div>
        <div>LocalStorage Token: {localStorage.getItem('auth_token') ? 'exists' : 'null'}</div>
      </div>
    </div>
  );
}