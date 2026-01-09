import type { NavigateFunction } from 'react-router-dom';
import { storage } from './localStorage';
import type { LoginResponse, UserUpdateResponse } from '../types/auth';

export interface AuthState {
  user: LoginResponse;
  setupStep?: number;
  isAuthenticated: boolean;
}

/**
 * Navigation utility for handling post-login redirects
 */
export class NavigationManager {
  /**
   * Determines the correct redirect path based on setupStep value
   * Requirements:
   * - If setupStep === 1 → redirect to /auth/register
   * - If setupStep === 2 → redirect to /auth/create-organization  
   * - If setupStep is undefined or 0 → redirect to /projects
   */
  static getRedirectPath(setupStep?: number): string {
    switch (setupStep) {
      case 1:
        return '/auth/register';
      case 2:
        return '/auth/create-organization';
      default:
        return '/projects';
    }
  }

  /**
   * Simplified redirect logic for user profile updates
   * If setupStep === 2 → redirect to /auth/create-organization
   * Else → redirect to /projects
   */
  static getPostUpdateRedirectPath(setupStep?: number): string {
    if (setupStep === 2) {
      return '/auth/create-organization';
    }
    
    // Default to projects for all other cases
    return '/projects';
  }

  /**
   * Handles post-login navigation and state persistence
   */
  static handlePostLoginNavigation(
    response: LoginResponse,
    navigate: NavigateFunction
  ): void {
    try {
      // Extract setupStep value safely
      const setupStep = response?.result?.setupStep;
      
      

      // Add timeout to ensure state is persisted before navigation
      setTimeout(() => {
        // Navigate to appropriate route
        const redirectPath = this.getRedirectPath(setupStep);
        navigate(redirectPath, { replace: true });

        console.log(`User redirected to: ${redirectPath} (setupStep: ${setupStep})`);
      }, 100); // Small delay to ensure state persistence

    } catch (error) {
      console.error('Error handling post-login navigation:', error);
      // Fallback to default route on error
      setTimeout(() => {
        navigate('/projects', { replace: true });
      }, 100);
    }}

  /**
   * Handles post-user-update navigation based on setupStep
   * If setupStep === 2 → redirect to /auth/create-organization
   * Else → redirect to /projects
   */
  static handlePostUserUpdateNavigation(
    response: UserUpdateResponse,
    navigate: NavigateFunction
  ): void {
    try {
      // Extract setupStep value safely
      const setupStep = response?.result?.setupStep;
      
      // Use specific logic for user updates
      const redirectPath = this.getPostUpdateRedirectPath(setupStep);
      navigate(redirectPath, { replace: true });

      console.log(`User redirected after profile update to: ${redirectPath} (setupStep: ${setupStep})`);
    } catch (error) {
      console.error('Error handling post-user-update navigation:', error);
      // Fallback to default route on error
      navigate('/projects', { replace: true });
    }
  }

  /**
   * Checks stored auth state and redirects if user is already logged in
   */
  static handleAuthStateRedirect(navigate: NavigateFunction): boolean {
    try {
      const authState = storage.get<AuthState>('authState');
      
      if (authState?.isAuthenticated) {
        const redirectPath = this.getRedirectPath(authState.setupStep);
        navigate(redirectPath, { replace: true });
        console.log(`Auto-redirected authenticated user to: ${redirectPath}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking auth state:', error);
      return false;
    }
  }

  /**
   * Clears authentication state from storage
   */
  static clearAuthState(): void {
    storage.remove('authState');
    storage.remove('user');
  }

  /**
   * Gets current authentication state
   */
  static getAuthState(): AuthState | null {
    return storage.get<AuthState>('authState');
  }

  /**
   * Gets user ID from stored authentication data
   */
  static getUserId(): string | null {
    try {
      // Try to get from authState first
      const authState = this.getAuthState();
      if (authState?.user?.result?.id) {
        return authState.user.result.id;
      }

      // Fallback to direct user storage
      const storedUser = storage.get<LoginResponse>('user');
      if (storedUser?.result?.id) {
        return storedUser.result.id;
      }

      // If no ID found, try to decode from token (if needed)
      const token = storedUser?.result?.token;
      if (token) {
        try {
          // Basic JWT decode (just for ID extraction, not verification)
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload._id || payload.id || payload.userId || payload.sub || null;
        } catch (error) {
          console.warn('Could not decode token for user ID:', error);
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting user ID from storage:', error);
      return null;
    }
  }

  /**
   * Checks if user is authenticated
   */
  static isAuthenticated(): boolean {
    const authState = this.getAuthState();
    return authState?.isAuthenticated ?? false;
  }
}

export default NavigationManager;

/**
 * Example usage for logout functionality:
 * 
 * const handleLogout = () => {
 *   NavigationManager.clearAuthState();
 *   navigate('/auth/login', { replace: true });
 * };
 * 
 * Example API response structure:
 * {
 *   "success": true,
 *   "statusCode": 200,
 *   "message": "Login successful",
 *   "result": {
 *     "id": "6960c4245a194cd921becbec",
 *     "name": "",
 *     "setupStep": 1,
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 * }
 */