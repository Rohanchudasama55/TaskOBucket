// Test utilities exports
export * from './utils/navigation-test-utils';
export * from './mocks/localStorage.mock';
export * from './mocks/navigation.mock';
export * from './generators/auth.generators';

// Re-export commonly used testing libraries
export { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
export * as fc from 'fast-check';
export { test } from '@fast-check/vitest';