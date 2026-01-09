# Implementation Plan: Auth Context Integration

## Overview

This implementation plan focuses on creating comprehensive tests for the existing NavigationManager utility class to validate the setupStep navigation logic and ensure robust error handling. The existing implementation will be tested and any discovered bugs will be fixed to meet the correctness properties defined in the design.

## Tasks

- [x] 1. Set up testing infrastructure and utilities
  - Create test utilities for mocking localStorage and navigation
  - Set up fast-check generators for authentication data types
  - Configure test environment for NavigationManager testing
  - _Requirements: All requirements (testing foundation)_

- [x] 1.1 Write property test for setup step routing determinism

  - **Property 1: Setup Step Routing Determinism**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**

- [-] 2. Test core navigation path determination logic
  - [x] 2.1 Create unit tests for getRedirectPath method
    - Test specific setupStep values (1, 2, 0, undefined)
    - Test edge cases (negative numbers, non-integers, null)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [-] 2.2 Write property test for authentication state round trip consistency

    - **Property 2: Authentication State Round Trip Consistency**
    - **Validates: Requirements 2.2, 4.1, 7.4**

- [ ] 3. Test post-login navigation flow
  - [ ] 3.1 Create unit tests for handlePostLoginNavigation method
    - Test successful navigation with various setupStep values
    - Test error handling and fallback behavior
    - Mock navigate function and localStorage
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 3.2 Write property test for post-login navigation completeness
    - **Property 3: Post-Login Navigation Completeness**
    - **Validates: Requirements 2.1, 2.3, 2.4, 2.5, 7.1, 7.2, 7.3**

- [ ] 4. Test user ID extraction mechanisms
  - [ ] 4.1 Create unit tests for getUserId method
    - Test ID extraction from AuthState
    - Test fallback to user storage
    - Test JWT token decoding fallback
    - Test error handling for corrupted data
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 4.2 Write property test for user ID extraction robustness
    - **Property 4: User ID Extraction Robustness**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

- [ ] 5. Test post-user-update navigation flow
  - [ ] 5.1 Create unit tests for handlePostUserUpdateNavigation method
    - Test navigation with setupStep === 2
    - Test navigation with other setupStep values
    - Test error handling and fallback
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 5.2 Write property test for post-update navigation simplification
    - **Property 5: Post-Update Navigation Simplification**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**

- [ ] 6. Test authentication state management
  - [ ] 6.1 Create unit tests for authentication state methods
    - Test getAuthState retrieval
    - Test isAuthenticated checking
    - Test clearAuthState cleanup
    - Test handleAuthStateRedirect logic
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 6.2 Write property test for authentication state management consistency
    - **Property 7: Authentication State Management Consistency**
    - **Validates: Requirements 4.2, 4.3, 4.4**

- [ ] 7. Test comprehensive error handling
  - [ ] 7.1 Create unit tests for error scenarios
    - Test localStorage access failures
    - Test malformed JWT tokens
    - Test invalid API responses
    - Test navigation function failures
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 7.2 Write property test for error handling universal fallback
    - **Property 6: Error Handling Universal Fallback**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

- [ ] 8. Integration testing and bug fixes
  - [ ] 8.1 Run all tests and identify any failing scenarios
    - Execute complete test suite
    - Document any discovered bugs or inconsistencies
    - _Requirements: All requirements (validation)_

  - [ ] 8.2 Fix any discovered bugs in NavigationManager
    - Address failing test cases
    - Ensure all correctness properties pass
    - Maintain backward compatibility
    - _Requirements: All requirements (bug fixes)_

- [ ] 9. Final validation checkpoint
  - Ensure all tests pass with minimum 100 iterations for property tests
  - Verify error handling works correctly in all scenarios
  - Confirm navigation timing and state persistence work as expected
  - _Requirements: All requirements (final validation)_

## Notes

- Tasks marked with `*` are optional property-based tests that can be skipped for faster MVP
- Each property test should run minimum 100 iterations using fast-check
- Unit tests focus on specific examples and edge cases
- Property tests validate universal correctness across all inputs
- The existing NavigationManager implementation will be tested and fixed as needed
- All tests should mock localStorage and navigation functions for isolation