import { useState, useEffect } from 'react';
import { NavigationManager, type AuthState } from '../utils/navigation';

/**
 * Hook to manage and monitor authentication state
 */
export function useAuthState() {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial auth state
    const loadAuthState = () => {
      try {
        const state = NavigationManager.getAuthState();
        setAuthState(state);
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const isAuthenticated = authState?.isAuthenticated ?? false;
  const user = authState?.user;
  const setupStep = authState?.setupStep;

  const clearAuth = () => {
    NavigationManager.clearAuthState();
    setAuthState(null);
  };

  return {
    authState,
    isAuthenticated,
    user,
    setupStep,
    isLoading,
    clearAuth
  };
}

export default useAuthState;