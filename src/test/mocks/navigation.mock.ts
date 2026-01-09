import { vi } from 'vitest';
import type { NavigateFunction } from 'react-router-dom';

/**
 * Mock implementation of react-router-dom's navigate function
 */
export interface MockNavigateCall {
  path: string;
  options?: {
    replace?: boolean;
    state?: any;
  };
}

export class MockNavigate {
  private calls: MockNavigateCall[] = [];
  public mockFn: NavigateFunction;

  constructor() {
    this.mockFn = vi.fn((path: string, options?: { replace?: boolean; state?: any }) => {
      this.calls.push({ path, options });
    }) as NavigateFunction;
  }

  /**
   * Get all navigation calls made
   */
  getCalls(): MockNavigateCall[] {
    return [...this.calls];
  }

  /**
   * Get the last navigation call
   */
  getLastCall(): MockNavigateCall | undefined {
    return this.calls[this.calls.length - 1];
  }

  /**
   * Get the number of navigation calls
   */
  getCallCount(): number {
    return this.calls.length;
  }

  /**
   * Clear all recorded calls
   */
  clearCalls(): void {
    this.calls = [];
    vi.clearAllMocks();
  }

  /**
   * Check if navigate was called with specific path
   */
  wasCalledWith(path: string, options?: { replace?: boolean }): boolean {
    return this.calls.some(call => 
      call.path === path && 
      (!options || call.options?.replace === options.replace)
    );
  }

  /**
   * Get all paths that were navigated to
   */
  getNavigatedPaths(): string[] {
    return this.calls.map(call => call.path);
  }
}

/**
 * Creates a fresh mock navigate function
 */
export const createMockNavigate = (): MockNavigate => {
  return new MockNavigate();
};

/**
 * Mock react-router-dom module
 */
export const mockReactRouterDom = () => {
  const mockNavigate = createMockNavigate();
  
  vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate.mockFn,
  }));

  return mockNavigate;
};