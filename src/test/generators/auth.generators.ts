import * as fc from 'fast-check';
import type { LoginResponse, UserUpdateResponse } from '../../types/auth';
import type { AuthState } from '../../utils/navigation';

/**
 * Generator for valid user IDs
 */
export const userIdArb = fc.string({ minLength: 24, maxLength: 24 }).map(s => 
  s.replace(/[^a-f0-9]/g, 'a') // Ensure valid hex characters for MongoDB ObjectId format
);

/**
 * Generator for JWT tokens (mock format)
 */
export const jwtTokenArb = fc.record({
  header: fc.record({
    alg: fc.constant('HS256'),
    typ: fc.constant('JWT')
  }),
  payload: fc.record({
    id: userIdArb,
    _id: userIdArb,
    userId: userIdArb,
    sub: userIdArb,
    exp: fc.integer({ min: Math.floor(Date.now() / 1000), max: Math.floor(Date.now() / 1000) + 3600 })
  }),
  signature: fc.string({ minLength: 43, maxLength: 43 })
}).map(({ header, payload, signature }) => {
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  return `${encodedHeader}.${encodedPayload}.${signature}`;
});

/**
 * Generator for setup step values
 */
export const setupStepArb = fc.oneof(
  fc.constant(undefined),
  fc.constant(null),
  fc.constant(0),
  fc.constant(1),
  fc.constant(2),
  fc.integer({ min: -10, max: 10 }), // Include edge cases
  fc.float(), // Include non-integer values
);

/**
 * Generator for valid setup step values (0, 1, 2, undefined)
 */
export const validSetupStepArb = fc.oneof(
  fc.constant(undefined),
  fc.constant(0),
  fc.constant(1),
  fc.constant(2)
);

/**
 * Generator for user names
 */
export const userNameArb = fc.oneof(
  fc.constant(''), // Empty name case
  fc.string({ minLength: 1, maxLength: 50 })
);

/**
 * Generator for LoginResponse objects
 */
export const loginResponseArb = fc.record({
  success: fc.boolean(),
  statusCode: fc.integer({ min: 200, max: 500 }),
  message: fc.string(),
  result: fc.record({
    id: userIdArb,
    token: jwtTokenArb,
    name: userNameArb,
    setupStep: setupStepArb
  })
});

/**
 * Generator for successful LoginResponse objects
 */
export const successfulLoginResponseArb = fc.record({
  success: fc.constant(true),
  statusCode: fc.constant(200),
  message: fc.string(),
  result: fc.record({
    id: userIdArb,
    token: jwtTokenArb,
    name: userNameArb,
    setupStep: validSetupStepArb
  })
});

/**
 * Generator for UserUpdateResponse objects
 */
export const userUpdateResponseArb = fc.record({
  success: fc.boolean(),
  statusCode: fc.integer({ min: 200, max: 500 }),
  message: fc.string(),
  result: fc.option(fc.record({
    id: userIdArb,
    name: userNameArb,
    jobTitle: fc.string(),
    avatarUrl: fc.webUrl(),
    isActive: fc.boolean(),
    setupStep: setupStepArb
  }))
});

/**
 * Generator for successful UserUpdateResponse objects
 */
export const successfulUserUpdateResponseArb = fc.record({
  success: fc.constant(true),
  statusCode: fc.constant(200),
  message: fc.string(),
  result: fc.record({
    id: userIdArb,
    name: userNameArb,
    jobTitle: fc.string(),
    avatarUrl: fc.webUrl(),
    isActive: fc.boolean(),
    setupStep: validSetupStepArb
  })
});

/**
 * Generator for AuthState objects
 */
export const authStateArb = fc.record({
  user: loginResponseArb,
  setupStep: setupStepArb,
  isAuthenticated: fc.boolean()
});

/**
 * Generator for valid authenticated AuthState objects
 */
export const authenticatedAuthStateArb = fc.record({
  user: successfulLoginResponseArb,
  setupStep: validSetupStepArb,
  isAuthenticated: fc.constant(true)
});

/**
 * Generator for malformed/corrupted data that might be in localStorage
 */
export const corruptedDataArb = fc.oneof(
  fc.constant(null),
  fc.constant(undefined),
  fc.constant(''),
  fc.constant('invalid-json'),
  fc.constant('{}'),
  fc.constant('{"incomplete": true}'),
  fc.record({
    // Missing required fields
    someField: fc.string()
  }),
  fc.record({
    // Wrong field types
    success: fc.string(),
    result: fc.string()
  })
);

/**
 * Generator for localStorage key-value pairs
 */
export const localStorageEntryArb = fc.record({
  key: fc.oneof(
    fc.constant('authState'),
    fc.constant('user'),
    fc.string({ minLength: 1, maxLength: 20 })
  ),
  value: fc.oneof(
    authStateArb.map(JSON.stringify),
    loginResponseArb.map(JSON.stringify),
    corruptedDataArb.map(v => typeof v === 'string' ? v : JSON.stringify(v))
  )
});

/**
 * Generator for complete localStorage state
 */
export const localStorageStateArb = fc.dictionary(
  fc.string({ minLength: 1, maxLength: 20 }),
  fc.string()
);

/**
 * Helper function to create a LoginResponse with specific setupStep
 */
export const createLoginResponseWithSetupStep = (setupStep?: number): fc.Arbitrary<LoginResponse> => {
  return fc.record({
    success: fc.constant(true),
    statusCode: fc.constant(200),
    message: fc.string(),
    result: fc.record({
      id: userIdArb,
      token: jwtTokenArb,
      name: userNameArb,
      setupStep: fc.constant(setupStep)
    })
  });
};

/**
 * Helper function to create a UserUpdateResponse with specific setupStep
 */
export const createUserUpdateResponseWithSetupStep = (setupStep?: number): fc.Arbitrary<UserUpdateResponse> => {
  return fc.record({
    success: fc.constant(true),
    statusCode: fc.constant(200),
    message: fc.string(),
    result: fc.record({
      id: userIdArb,
      name: userNameArb,
      jobTitle: fc.string(),
      avatarUrl: fc.webUrl(),
      isActive: fc.boolean(),
      setupStep: fc.constant(setupStep)
    })
  });
};