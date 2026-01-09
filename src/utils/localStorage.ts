import CryptoJS from 'crypto-js';

// Default encryption key - in production, this should come from environment variables
const DEFAULT_SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

interface StorageOptions {
  encrypt?: boolean;
  secretKey?: string;
}

/**
 * Encrypted localStorage utility functions
 */
export class SecureStorage {
  private static encrypt(data: string, secretKey: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  private static decrypt(encryptedData: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Store data in localStorage with optional encryption
   */
  static setItem<T>(
    key: string, 
    value: T, 
    options: StorageOptions = { encrypt: true }
  ): void {
    try {
      const stringValue = JSON.stringify(value);
      const secretKey = options.secretKey || DEFAULT_SECRET_KEY;
      
      if (options.encrypt) {
        const encryptedValue = this.encrypt(stringValue, secretKey);
        localStorage.setItem(key, encryptedValue);
      } else {
        localStorage.setItem(key, stringValue);
      }
    } catch (error) {
      console.error('Error storing data to localStorage:', error);
      throw new Error('Failed to store data');
    }
  }

  /**
   * Retrieve data from localStorage with optional decryption
   */
  static getItem<T>(
    key: string, 
    options: StorageOptions = { encrypt: true }
  ): T | null {
    try {
      const storedValue = localStorage.getItem(key);
      
      if (!storedValue) {
        return null;
      }

      const secretKey = options.secretKey || DEFAULT_SECRET_KEY;
      let parsedValue: string;

      if (options.encrypt) {
        parsedValue = this.decrypt(storedValue, secretKey);
        if (!parsedValue) {
          console.warn('Failed to decrypt data, possibly corrupted or wrong key');
          return null;
        }
      } else {
        parsedValue = storedValue;
      }

      return JSON.parse(parsedValue) as T;
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
    }
  }

  /**
   * Clear all localStorage data
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if a key exists in localStorage
   */
  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Get all keys from localStorage
   */
  static getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }
}

// Convenience functions for common use cases
export const storage = {
  // Encrypted storage (default)
  set: <T>(key: string, value: T) => SecureStorage.setItem(key, value),
  get: <T>(key: string) => SecureStorage.getItem<T>(key),
  
  // Unencrypted storage
  setPlain: <T>(key: string, value: T) => SecureStorage.setItem(key, value, { encrypt: false }),
  getPlain: <T>(key: string) => SecureStorage.getItem<T>(key, { encrypt: false }),
  
  // Common operations
  remove: (key: string) => SecureStorage.removeItem(key),
  clear: () => SecureStorage.clear(),
  has: (key: string) => SecureStorage.hasItem(key),
  keys: () => SecureStorage.getAllKeys(),
};

export default storage;