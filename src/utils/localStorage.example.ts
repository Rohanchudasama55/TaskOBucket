import { storage, SecureStorage } from './localStorage';

// Example usage of the encrypted localStorage helper

// 1. Basic usage with default encryption
const userToken = 'jwt-token-here';
storage.set('authToken', userToken);
const retrievedToken = storage.get<string>('authToken');

// 2. Store complex objects
const userProfile = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

storage.set('userProfile', userProfile);
const profile = storage.get<typeof userProfile>('userProfile');

// 3. Unencrypted storage for non-sensitive data
storage.setPlain('appSettings', { language: 'en', version: '1.0.0' });
const settings = storage.getPlain<{ language: string; version: string }>('appSettings');

// 4. Using custom encryption key
SecureStorage.setItem('sensitiveData', { secret: 'top-secret' }, {
  encrypt: true,
  secretKey: 'custom-encryption-key'
});

const sensitiveData = SecureStorage.getItem<{ secret: string }>('sensitiveData', {
  encrypt: true,
  secretKey: 'custom-encryption-key'
});

// 5. Check if item exists
if (storage.has('authToken')) {
  console.log('User is authenticated');
}

// 6. Remove specific item
storage.remove('authToken');

// 7. Get all keys
const allKeys = storage.keys();
console.log('All localStorage keys:', allKeys);

// 8. Clear all data (use with caution)
// storage.clear();

export {};