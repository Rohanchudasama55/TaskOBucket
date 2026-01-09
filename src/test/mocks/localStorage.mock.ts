/**
 * Mock implementation of localStorage for testing
 */
export class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  // Helper methods for testing
  getStore(): Record<string, string> {
    return { ...this.store };
  }

  setStore(store: Record<string, string>): void {
    this.store = { ...store };
  }
}

/**
 * Creates a fresh mock localStorage instance
 */
export const createMockLocalStorage = (): MockLocalStorage => {
  return new MockLocalStorage();
};

/**
 * Sets up localStorage mock for the global object
 */
export const setupLocalStorageMock = (): MockLocalStorage => {
  const mockStorage = createMockLocalStorage();
  
  // Mock the global localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  });

  return mockStorage;
};

/**
 * Clears localStorage mock
 */
export const clearLocalStorageMock = (): void => {
  if (window.localStorage) {
    window.localStorage.clear();
  }
};