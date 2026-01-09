# NavigationManager Testing Infrastructure

This directory contains comprehensive testing utilities for the NavigationManager authentication context integration system.

## Overview

The testing infrastructure provides:

- **Mock implementations** for localStorage and react-router-dom navigation
- **Fast-check generators** for authentication data types and edge cases
- **Test utilities** for setting up and managing test environments
- **Property-based testing** support with @fast-check/vitest integration

## Directory Structure

```
src/test/
├── README.md                     # This file
├── index.ts                      # Main exports
├── setup.ts                      # Global test setup
├── mocks/
│   ├── localStorage.mock.ts      # Mock localStorage implementation
│   └── navigation.mock.ts        # Mock react-router navigation
├── generators/
│   └── auth.generators.ts        # Fast-check generators for auth types
└── utils/
    └── navigation-test-utils.ts  # Comprehensive test utilities
```

## Key Components

### 1. Mock Implementations

#### localStorage Mock (`mocks/localStorage.mock.ts`)
- Full localStorage API implementation
- In-memory storage for isolated testing
- Helper methods for test setup and verification

#### Navigation Mock (`mocks/navigation.mock.ts`)
- Mock NavigateFunction from react-router-dom
- Call tracking and verification utilities
- Support for navigation options (replace, state)

### 2. Fast-check Generators (`generators/auth.generators.ts`)

Provides property-based testing generators for:

- **setupStep values**: Including edge cases (undefined, null, negative numbers, floats)
- **LoginResponse objects**: Valid and invalid API responses
- **UserUpdateResponse objects**: Profile update responses
- **AuthState objects**: Authentication state with various configurations
- **JWT tokens**: Mock JWT format with proper structure
- **Corrupted data**: For testing error handling scenarios

### 3. Test Utilities (`utils/navigation-test-utils.ts`)

The `NavigationTestUtils` class provides:

- **Environment setup/cleanup**: Automatic mock initialization and cleanup
- **State management**: Easy auth state setup and manipulation
- **Error simulation**: localStorage failures and corrupted data scenarios
- **Assertion helpers**: Navigation and console output verification
- **Async utilities**: Timeout handling for NavigationManager's delayed operations

## Usage Examples

### Basic Unit Testing

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NavigationManager } from './navigation';
import { NavigationTestUtils } from '../test/utils/navigation-test-utils';

describe('NavigationManager', () => {
  let testUtils: NavigationTestUtils;

  beforeEach(() => {
    testUtils = new NavigationTestUtils();
    testUtils.setup();
  });

  afterEach(() => {
    testUtils.cleanup();
  });

  it('should redirect based on setupStep', async () => {
    const authState = testUtils.createValidAuthState(1);
    testUtils.setAuthState(authState);

    const result = NavigationManager.handleAuthStateRedirect(testUtils.mockNavigate.mockFn);

    expect(result).toBe(true);
    await testUtils.waitForAsyncOperations();
    testUtils.assertNavigationCalled('/auth/register', { replace: true });
  });
});
```

### Property-Based Testing

```typescript
import { test } from '@fast-check/vitest';
import * as fc from 'fast-check';
import { setupStepArb, loginResponseArb } from '../test/generators/auth.generators';

describe('NavigationManager Properties', () => {
  test.prop([setupStepArb])('should always return a valid path', (setupStep) => {
    const result = NavigationManager.getRedirectPath(setupStep);
    expect(typeof result).toBe('string');
    expect(result.startsWith('/')).toBe(true);
  });

  test.prop([loginResponseArb])('should handle any LoginResponse safely', async (loginResponse) => {
    const testUtils = new NavigationTestUtils();
    testUtils.setup();

    // Should not throw regardless of input
    expect(() => {
      NavigationManager.handlePostLoginNavigation(loginResponse, testUtils.mockNavigate.mockFn);
    }).not.toThrow();

    testUtils.cleanup();
  });
});
```

### Error Handling Testing

```typescript
it('should handle localStorage failures gracefully', () => {
  testUtils.simulateLocalStorageFailure();
  
  const result = NavigationManager.getAuthState();
  expect(result).toBeNull();
  
  testUtils.assertConsoleErrorCalled('localStorage access failed');
});
```

## Configuration

### Environment Variables

The test environment requires:
- `VITE_ENCRYPTION_KEY`: Set in vitest.config.ts for localStorage encryption testing

### Fast-check Configuration

Property-based tests run with:
- **Minimum 100 iterations** per property (as specified in design document)
- **Seed-based reproducibility** for consistent test results
- **Edge case generation** for comprehensive coverage

## Best Practices

1. **Always use testUtils.setup() and cleanup()** in beforeEach/afterEach
2. **Wait for async operations** using `testUtils.waitForAsyncOperations()`
3. **Test both success and error paths** using generators and error simulation
4. **Verify console output** for error handling validation
5. **Use property-based tests** for universal correctness properties
6. **Use unit tests** for specific examples and edge cases

## Integration with NavigationManager

This testing infrastructure is specifically designed to validate the correctness properties defined in the design document:

1. **Setup Step Routing Determinism**
2. **Authentication State Round Trip Consistency**
3. **Post-Login Navigation Completeness**
4. **User ID Extraction Robustness**
5. **Post-Update Navigation Simplification**
6. **Error Handling Universal Fallback**
7. **Authentication State Management Consistency**

Each property can be tested using the appropriate generators and utilities provided in this infrastructure.