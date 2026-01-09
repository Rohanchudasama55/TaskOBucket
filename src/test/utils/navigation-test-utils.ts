import { vi, beforeEach, afterEach } from 'vitest';
import { setupLocalStorageMock, clearLocalStorageMock, type MockLocalStorage } from '../mocks/localStorage.mock';
import { createMockNavigate, type MockNavigate } from '../mocks/navigation.mock';
import { storage } from '../../utils/localStorage';
import type { AuthState } from '../../utils/navigation';
import type { LoginResponse } from '../../types/auth';

/**
 * Test utilities for NavigationManager testing
 */
export class NavigationTestUtils {
  public mockLocalStorage: MockLocalStorage;
  public mockNavigate: MockNavigate;
  private originalConsoleError: typeof console.error;
  private originalConsoleWarn: typeof console.warn;
  private originalConsoleLog: typeof console.log;

  constructor() {
    this.mockLocalStorage = setupLocalStorageMock();
    this.mockNavigate = createMockNavigate();
    
    // Store original console methods
    this.originalConsoleError = console.error;
    this.originalConsoleWarn = console.warn;
    this.originalConsoleLog = console.log;
  }

  /**
   * Set up the test environment
   */
  setup(): void {
    // Clear any existing state
    this.mockLocalStorage.clear();
    this.mockNavigate.clearCalls();
    
    // Mock console methods to avoid noise in tests
    console.error = vi.fn();
    console.warn = vi.fn();
    console.log = vi.fn();
  }

  /**
   * Clean up after tests
   */
  cleanup(): void {
    clearLocalStorageMock();
    this.mockNavigate.clearCalls();
    
    // Restore original console methods
    console.error = this.originalConsoleError;
    console.warn = this.originalConsoleWarn;
    console.log = this.originalConsoleLog;
    
    vi.clearAllMocks();
  }

  /**
   * Set up localStorage with specific auth state
   */
  setAuthState(authState: AuthState): void {
    // Use the actual storage utility to ensure proper encryption/decryption
    // For testing, we'll use unencrypted storage to avoid encryption key issues
    try {
      storage.set('authState', authState);
      if (authState.user) {
        storage.set('user', authState.user);
      }
    } catch (error) {
      // Fallback to plain storage if encryption fails
      console.warn('Encryption failed in test, using plain storage');
      storage.setPlain('authState', authState);
      if (authState.user) {
        storage.setPlain('user', authState.user);
      }
    }
  }

  /**
   * Set up localStorage with raw data (for testing corrupted scenarios)
   */
  setRawLocalStorageData(key: string, value: string): void {
    this.mockLocalStorage.setItem(key, value);
  }

  /**
   * Get the current localStorage state
   */
  getLocalStorageState(): Record<string, string> {
    return this.mockLocalStorage.getStore();
  }

  /**
   * Simulate localStorage access failure
   */
  simulateLocalStorageFailure(): void {
    const originalGetItem = this.mockLocalStorage.getItem;
    const originalSetItem = this.mockLocalStorage.setItem;
    
    this.mockLocalStorage.getItem = vi.fn(() => {
      throw new Error('localStorage access failed');
    });
    
    this.mockLocalStorage.setItem = vi.fn(() => {
      throw new Error('localStorage access failed');
    });

    // Restore after a short delay (for async operations)
    setTimeout(() => {
      this.mockLocalStorage.getItem = originalGetItem;
      this.mockLocalStorage.setItem = originalSetItem;
    }, 100);
  }

  /**
   * Create a valid AuthState for testing
   */
  createValidAuthState(setupStep?: number, isAuthenticated: boolean = true): AuthState {
    const loginResponse: LoginResponse = {
      success: true,
      statusCode: 200,
      message: 'Login successful',
      result: {
        id: '6960c4245a194cd921becbec',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjBjNDI0NWExOTRjZDkyMWJlY2JlYyIsImlhdCI6MTYzMjQ4NzIwMCwiZXhwIjoxNjMyNDkwODAwfQ.signature',
        name: 'Test User',
        setupStep: setupStep ?? 0
      }
    };

    return {
      user: loginResponse,
      setupStep,
      isAuthenticated
    };
  }

  /**
   * Create a corrupted AuthState for testing error handling
   */
  createCorruptedAuthState(): Partial<AuthState> {
    return {
      // Missing required fields
      isAuthenticated: true
    };
  }

  /**
   * Assert that navigation was called with expected parameters
   */
  assertNavigationCalled(expectedPath: string, expectedOptions?: { replace?: boolean }): void {
    const calls = this.mockNavigate.getCalls();
    const matchingCall = calls.find(call => 
      call.path === expectedPath && 
      (!expectedOptions || call.options?.replace === expectedOptions.replace)
    );
    
    if (!matchingCall) {
      throw new Error(
        `Expected navigation to ${expectedPath} with options ${JSON.stringify(expectedOptions)}, ` +
        `but got calls: ${JSON.stringify(calls)}`
      );
    }
  }

  /**
   * Assert that console.error was called with specific message
   */
  assertConsoleErrorCalled(expectedMessage?: string): void {
    const errorCalls = (console.error as any).mock.calls;
    if (errorCalls.length === 0) {
      throw new Error('Expected console.error to be called, but it was not');
    }
    
    if (expectedMessage) {
      const matchingCall = errorCalls.find((call: any[]) => 
        call.some(arg => typeof arg === 'string' && arg.includes(expectedMessage))
      );
      
      if (!matchingCall) {
        throw new Error(
          `Expected console.error to be called with message containing "${expectedMessage}", ` +
          `but got calls: ${JSON.stringify(errorCalls)}`
        );
      }
    }
  }

  /**
   * Wait for async operations to complete (useful for setTimeout in NavigationManager)
   */
  async waitForAsyncOperations(timeout: number = 150): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  /**
   * Create a mock environment for property-based testing
   */
  createPropertyTestEnvironment() {
    return {
      mockNavigate: this.mockNavigate.mockFn,
      setAuthState: this.setAuthState.bind(this),
      setRawData: this.setRawLocalStorageData.bind(this),
      getNavigationCalls: () => this.mockNavigate.getCalls(),
      clearState: () => {
        this.mockLocalStorage.clear();
        this.mockNavigate.clearCalls();
      }
    };
  }
}

/**
 * Global test utilities instance
 */
let testUtils: NavigationTestUtils;

/**
 * Set up test utilities for each test
 */
export const setupNavigationTests = (): NavigationTestUtils => {
  beforeEach(() => {
    testUtils = new NavigationTestUtils();
    testUtils.setup();
  });

  afterEach(() => {
    if (testUtils) {
      testUtils.cleanup();
    }
  });

  return testUtils;
};

/**
 * Get the current test utilities instance
 */
export const getTestUtils = (): NavigationTestUtils => {
  if (!testUtils) {
    throw new Error('Test utilities not initialized. Call setupNavigationTests() first.');
  }
  return testUtils;
};