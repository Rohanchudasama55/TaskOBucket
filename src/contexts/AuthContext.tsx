import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const existingToken = authService.getToken();
    const existingUser = authService.getUser();
    console.log('Existing token on startup:', existingToken ? 'Found' : 'Not found');
    console.log('Existing user on startup:', existingUser ? 'Found' : 'Not found');
    
    if (existingToken) {
      setTokenState(existingToken);
      
      // Use stored user data if available, otherwise decode from token
      if (existingUser) {
        setUser(existingUser);
      } else {
        // Fallback to decoding from token
        const userInfo = authService.getUserFromToken(existingToken);
        console.log('Decoded user info:', userInfo);
        
        if (userInfo) {
          setUser(userInfo);
          // Store the decoded user info for future use
          authService.setUser(userInfo);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const setToken = (newToken: string | null) => {
    console.log('Setting token:', newToken ? 'New token' : 'Clearing token');
    setTokenState(newToken);
    if (newToken) {
      authService.setToken(newToken);
    } else {
      authService.removeToken();
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setToken(null);
    authService.removeToken();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    setUser,
    setToken,
    logout,
  };

  console.log('Auth context state:', { 
    hasUser: !!user, 
    hasToken: !!token, 
    isAuthenticated: !!token, 
    isLoading 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}