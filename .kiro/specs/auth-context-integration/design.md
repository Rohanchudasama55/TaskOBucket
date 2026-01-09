# Design Document: Auth Context Integration

## Overview

The Auth Context Integration system provides a centralized navigation management solution for handling user authentication flows based on setup completion states. The system uses a `NavigationManager` utility class to determine appropriate redirect paths and manage authentication state persistence across the application.

## Architecture

The system follows a utility-based architecture with the `NavigationManager` class serving as the central coordinator for authentication-related navigation logic. The design emphasizes:

- **Centralized Logic**: All navigation decisions are handled by a single utility class
- **State Management**: Authentication state is persisted in localStorage with proper error handling
- **Graceful Degradation**: Fallback mechanisms ensure the application remains functional even when errors occur
- **Separation of Concerns**: Navigation logic is separated from UI components

```mermaid
graph TD
    A[Login/Register Components] --> B[NavigationManager]
    B --> C[Route Determination Logic]
    B --> D[State Persistence]
    B --> E[Error Handling]
    
    C --> F[setupStep Analysis]
    F --> G{setupStep Value}
    G -->|1| H[/auth/register]
    G -->|2| I[/auth/create-organization]
    G -->|0 or undefined| J[/projects]
    
    D --> K[localStorage]
    K --> L[authState]
    K --> M[user]
    
    E --> N[Console Logging]
    E --> O[Fallback Navigation]
```

## Components and Interfaces

### NavigationManager Class

The core utility class that handles all authentication-related navigation logic.

**Static Methods:**
- `getRedirectPath(setupStep?: number): string` - Determines redirect path based on setupStep
- `getPostUpdateRedirectPath(setupStep?: number): string` - Simplified redirect logic for profile updates
- `handlePostLoginNavigation(response: LoginResponse, navigate: NavigateFunction): void` - Handles post-login navigation
- `handlePostUserUpdateNavigation(response: UserUpdateResponse, navigate: NavigateFunction): void` - Handles post-update navigation
- `handleAuthStateRedirect(navigate: NavigateFunction): boolean` - Checks and redirects authenticated users
- `clearAuthState(): void` - Clears authentication data from storage
- `getAuthState(): AuthState | null` - Retrieves current authentication state
- `getUserId(): string | null` - Extracts user ID from stored data
- `isAuthenticated(): boolean` - Checks authentication status

### Type Definitions

```typescript
interface AuthState {
  user: LoginResponse;
  setupStep?: number;
  isAuthenticated: boolean;
}

interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: {
    id: string;
    name: string;
    setupStep: number;
    token: string;
  };
}

interface UserUpdateResponse {
  success: boolean;
  result: {
    id: string;
    name: string;
    setupStep: number;
  };
}
```

## Data Models

### Setup Step States

The system recognizes three primary setup states:

1. **setupStep = 1**: User needs to complete profile registration
   - Redirect: `/auth/register`
   - Context: User has authenticated but hasn't filled out profile information

2. **setupStep = 2**: User needs to create or join an organization
   - Redirect: `/auth/create-organization`
   - Context: User has completed profile but needs organizational setup

3. **setupStep = 0 or undefined**: User has completed all setup steps
   - Redirect: `/projects`
   - Context: User is fully onboarded and can access main application

### Storage Schema

**localStorage Keys:**
- `authState`: Complete authentication state object
- `user`: User data from login response

**Data Persistence Strategy:**
- Dual storage approach for redundancy
- AuthState contains complete context
- User object provides fallback access
- JWT token stored for ID extraction fallback

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the requirements analysis and property reflection to eliminate redundancy, the following correctness properties must be validated:

### Property 1: Setup Step Routing Determinism
*For any* setupStep value (including undefined, null, or any number), calling getRedirectPath multiple times with the same input should always return the same route, following the mapping: 1→'/auth/register', 2→'/auth/create-organization', all others→'/projects'.
**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

### Property 2: Authentication State Round Trip Consistency
*For any* valid AuthState object, storing it to localStorage and then retrieving it should produce an equivalent object with all properties preserved.
**Validates: Requirements 2.2, 4.1, 7.4**

### Property 3: Post-Login Navigation Completeness
*For any* LoginResponse object, the handlePostLoginNavigation method should extract setupStep, persist state, navigate appropriately, and handle any errors by falling back to '/projects' without throwing exceptions.
**Validates: Requirements 2.1, 2.3, 2.4, 2.5, 7.1, 7.2, 7.3**

### Property 4: User ID Extraction Robustness
*For any* authentication data state (valid, corrupted, or missing), the getUserId method should follow the extraction hierarchy (AuthState → user storage → JWT decode) and either return a valid string ID or null, never throwing exceptions.
**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

### Property 5: Post-Update Navigation Simplification
*For any* UserUpdateResponse with any setupStep value, the handlePostUserUpdateNavigation should redirect to '/auth/create-organization' only when setupStep === 2, and to '/projects' for all other values, with error fallback to '/projects'.
**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

### Property 6: Error Handling Universal Fallback
*For any* error condition in any NavigationManager method, the system should log the error, continue execution without throwing exceptions, and use '/projects' as the fallback route when navigation is involved.
**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

### Property 7: Authentication State Management Consistency
*For any* authentication state checking or clearing operation, the methods should handle missing or invalid localStorage data gracefully, returning appropriate boolean/null values for checks and completely removing both 'authState' and 'user' keys for clearing.
**Validates: Requirements 4.2, 4.3, 4.4**

## Error Handling

### Error Categories and Responses

1. **Navigation Errors**
   - Catch all exceptions in navigation methods
   - Log errors to console for debugging
   - Fallback to '/projects' route
   - Use replace: true to prevent navigation loops

2. **Storage Errors**
   - Handle localStorage access failures
   - Return null/false for failed retrievals
   - Continue execution without throwing

3. **JWT Decoding Errors**
   - Catch malformed token exceptions
   - Log warnings for debugging
   - Return null for failed extractions
   - Continue with alternative ID sources

4. **Response Parsing Errors**
   - Handle missing or malformed API responses
   - Extract setupStep safely with optional chaining
   - Default to safe fallback values

### Resilience Patterns

- **Graceful Degradation**: System continues functioning even with partial failures
- **Safe Defaults**: Always provide safe fallback values and routes
- **Error Isolation**: Errors in one method don't affect others
- **Logging Strategy**: Comprehensive error logging for debugging without user impact

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests:**
- Specific examples demonstrating correct behavior
- Edge cases and error conditions
- Integration points between components
- Mock localStorage and navigation functions for isolated testing

**Property-Based Tests:**
- Universal properties across all inputs using fast-check
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: auth-context-integration, Property {number}: {property_text}**
- Comprehensive input coverage through randomization

### Testing Framework Configuration

- **Framework**: Vitest with @fast-check/vitest integration
- **Environment**: jsdom for DOM simulation
- **Mocking**: localStorage and react-router-dom navigation
- **Coverage**: Focus on NavigationManager class methods and error paths

### Test Categories

1. **Route Determination Tests**
   - Unit tests for specific setupStep values
   - Property tests for consistency across all inputs
   - Edge cases for undefined/null values

2. **State Management Tests**
   - localStorage persistence and retrieval
   - Round-trip property validation
   - Error handling for storage failures

3. **Navigation Flow Tests**
   - Post-login navigation scenarios
   - Post-update navigation scenarios
   - Authentication state checking

4. **Error Handling Tests**
   - Exception handling in all methods
   - Fallback behavior validation
   - Logging verification

5. **User ID Extraction Tests**
   - Multiple data source scenarios
   - JWT token decoding edge cases
   - Corrupted data handling