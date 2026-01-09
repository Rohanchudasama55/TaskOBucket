import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { test } from '@fast-check/vitest';
import { NavigationManager } from './navigation';
import { NavigationTestUtils } from '../test/utils/navigation-test-utils';
import { 
  setupStepArb,
  validSetupStepArb,
  loginResponseArb,
  authenticatedAuthStateArb
} from '../test/generators/auth.generators';

describe('NavigationManager Testing Infrastructure Validation', () => {
  let testUtils: NavigationTestUtils;

  beforeEach(() => {
    testUtils = new NavigationTestUtils();
    testUtils.setup();
  });

  afterEach(() => {
    if (testUtils) {
      testUtils.cleanup();
    }
  });

  describe('Infrastructure Validation', () => {
    it('should validate testing infrastructure is working', () => {
      // Basic infrastructure validation
      expect(testUtils).toBeDefined();
      expect(testUtils.mockNavigate).toBeDefined();
      expect(testUtils.mockLocalStorage).toBeDefined();
      
      // Test basic navigation mock
      const navigate = testUtils.mockNavigate.mockFn;
      navigate('/test', { replace: true });
      expect(testUtils.mockNavigate.getCallCount()).toBe(1);
      
      // Test basic localStorage mock
      testUtils.mockLocalStorage.setItem('test', 'value');
      expect(testUtils.mockLocalStorage.getItem('test')).toBe('value');
      
      // Test auth state setup
      const authState = testUtils.createValidAuthState(1);
      testUtils.setAuthState(authState);
      const retrieved = NavigationManager.getAuthState();
      expect(retrieved?.setupStep).toBe(1);
    });

    test.prop([setupStepArb])('should handle all setupStep values', (setupStep) => {
      const result = NavigationManager.getRedirectPath(setupStep);
      expect(typeof result).toBe('string');
      expect(result.startsWith('/')).toBe(true);
    });

    test.prop([validSetupStepArb])('should generate valid setupStep values', (setupStep) => {
      expect([0, 1, 2, undefined].includes(setupStep)).toBe(true);
    });

    test.prop([loginResponseArb])('should generate valid LoginResponse objects', (loginResponse) => {
      expect(typeof loginResponse.success).toBe('boolean');
      expect(typeof loginResponse.statusCode).toBe('number');
      expect(typeof loginResponse.message).toBe('string');
      expect(typeof loginResponse.result).toBe('object');
    });
  });

  describe('getRedirectPath Unit Tests', () => {
    describe('Specific setupStep values', () => {
      it('should redirect to /auth/register when setupStep is 1', () => {
        const result = NavigationManager.getRedirectPath(1);
        expect(result).toBe('/auth/register');
      });

      it('should redirect to /auth/create-organization when setupStep is 2', () => {
        const result = NavigationManager.getRedirectPath(2);
        expect(result).toBe('/auth/create-organization');
      });

      it('should redirect to /projects when setupStep is 0', () => {
        const result = NavigationManager.getRedirectPath(0);
        expect(result).toBe('/projects');
      });

      it('should redirect to /projects when setupStep is undefined', () => {
        const result = NavigationManager.getRedirectPath(undefined);
        expect(result).toBe('/projects');
      });
    });

    describe('Edge cases', () => {
      it('should redirect to /projects for negative numbers', () => {
        expect(NavigationManager.getRedirectPath(-1)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(-5)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(-100)).toBe('/projects');
      });

      it('should redirect to /projects for non-integers', () => {
        expect(NavigationManager.getRedirectPath(1.5)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(2.7)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(0.1)).toBe('/projects');
      });

      it('should redirect to /projects for null (when cast to number)', () => {
        // TypeScript prevents passing null directly, but testing the behavior
        // if null somehow gets passed (e.g., through JavaScript interop)
        const result = NavigationManager.getRedirectPath(null as any);
        expect(result).toBe('/projects');
      });

      it('should redirect to /projects for large numbers', () => {
        expect(NavigationManager.getRedirectPath(3)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(10)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(999)).toBe('/projects');
      });

      it('should redirect to /projects for NaN', () => {
        expect(NavigationManager.getRedirectPath(NaN)).toBe('/projects');
      });

      it('should redirect to /projects for Infinity', () => {
        expect(NavigationManager.getRedirectPath(Infinity)).toBe('/projects');
        expect(NavigationManager.getRedirectPath(-Infinity)).toBe('/projects');
      });
    });

    describe('Consistency tests', () => {
      it('should return the same result for multiple calls with the same input', () => {
        const testValues = [1, 2, 0, undefined, -1, 1.5, 3, NaN, Infinity];
        
        testValues.forEach(value => {
          const firstCall = NavigationManager.getRedirectPath(value);
          const secondCall = NavigationManager.getRedirectPath(value);
          const thirdCall = NavigationManager.getRedirectPath(value);
          
          expect(firstCall).toBe(secondCall);
          expect(secondCall).toBe(thirdCall);
        });
      });

      it('should always return a valid route string', () => {
        const testValues = [1, 2, 0, undefined, -1, 1.5, 3, NaN, Infinity, null as any];
        
        testValues.forEach(value => {
          const result = NavigationManager.getRedirectPath(value);
          expect(typeof result).toBe('string');
          expect(result.startsWith('/')).toBe(true);
          expect(result.length).toBeGreaterThan(1);
        });
      });
    });
  });

  describe('Property 1: Setup Step Routing Determinism', () => {
    /**
     * Feature: auth-context-integration, Property 1: Setup Step Routing Determinism
     * Validates: Requirements 1.1, 1.2, 1.3, 1.4
     * 
     * For any setupStep value (including undefined, null, or any number), 
     * calling getRedirectPath multiple times with the same input should always 
     * return the same route, following the mapping: 
     * 1→'/auth/register', 2→'/auth/create-organization', all others→'/projects'.
     */
    test.prop([setupStepArb], { numRuns: 1 })('should return consistent routes for any setupStep value', (setupStep) => {
      // Call getRedirectPath multiple times with the same input
      const firstCall = NavigationManager.getRedirectPath(setupStep as any);
      const secondCall = NavigationManager.getRedirectPath(setupStep as any);
      const thirdCall = NavigationManager.getRedirectPath(setupStep as any);
      
      // All calls should return the same result (determinism)
      expect(firstCall).toBe(secondCall);
      expect(secondCall).toBe(thirdCall);
      
      // Verify the correct mapping based on setupStep value
      if (setupStep === 1) {
        expect(firstCall).toBe('/auth/register');
      } else if (setupStep === 2) {
        expect(firstCall).toBe('/auth/create-organization');
      } else {
        // All other values (0, undefined, null, negative numbers, floats, etc.) should go to /projects
        expect(firstCall).toBe('/projects');
      }
      
      // Ensure result is always a valid route string
      expect(typeof firstCall).toBe('string');
      expect(firstCall.startsWith('/')).toBe(true);
    });
  });

  describe('Property 2: Authentication State Round Trip Consistency', () => {
    /**
     * Feature: auth-context-integration, Property 2: Authentication State Round Trip Consistency
     * Validates: Requirements 2.2, 4.1, 7.4
     * 
     * For any valid AuthState object, storing it to localStorage and then retrieving it 
     * should produce an equivalent object with all properties preserved.
     */
    test.prop([authenticatedAuthStateArb], { numRuns: 10 })('should preserve AuthState through localStorage round trip', (authState) => {
      // Clear any existing state
      testUtils.mockLocalStorage.clear();
      
      // Store the AuthState using NavigationManager's storage mechanism
      // We need to simulate what handlePostLoginNavigation does
      testUtils.setAuthState(authState);
      
      // Retrieve the AuthState using NavigationManager's getAuthState method
      const retrievedAuthState = NavigationManager.getAuthState();
      
      // The retrieved state should not be null
      expect(retrievedAuthState).not.toBeNull();
      
      if (retrievedAuthState) {
        // All properties should be preserved
        expect(retrievedAuthState.isAuthenticated).toBe(authState.isAuthenticated);
        expect(retrievedAuthState.setupStep).toBe(authState.setupStep);
        
        // User object should be preserved
        expect(retrievedAuthState.user).toBeDefined();
        expect(retrievedAuthState.user.success).toBe(authState.user.success);
        expect(retrievedAuthState.user.statusCode).toBe(authState.user.statusCode);
        expect(retrievedAuthState.user.message).toBe(authState.user.message);
        
        // User result should be preserved
        expect(retrievedAuthState.user.result).toBeDefined();
        expect(retrievedAuthState.user.result.id).toBe(authState.user.result.id);
        expect(retrievedAuthState.user.result.token).toBe(authState.user.result.token);
        expect(retrievedAuthState.user.result.name).toBe(authState.user.result.name);
        expect(retrievedAuthState.user.result.setupStep).toBe(authState.user.result.setupStep);
      }
    });
  });
});