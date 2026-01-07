# Reset Password Page Documentation

## Overview

The Reset Password page allows users to set a new password using a secure token received via email. It provides a complete password reset flow with validation, security checks, and user feedback.

## API Integration

**Endpoint:** `PUT https://70175e4a16c6.ngrok-free.app/api/auth/reset-password`

**Request Body:**
```json
{
  "token": "4f8c1b9e2a6d7c3e4f8c1b9e2a6d7c3e",
  "newPassword": "NewPassword@123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password reset successfully"
}
```

## Features

### 🎨 UI/UX Features
- **Consistent Design**: Matches login/register/forgot-password styling
- **Three-State Interface**: Invalid token, form state, and success state
- **Password Visibility Toggle**: Show/hide password functionality
- **Visual Feedback**: Success/error animations with appropriate icons
- **Responsive Layout**: Works on all screen sizes
- **Accessibility**: Proper labels, keyboard navigation, and screen reader support

### 🔧 Functional Features
- **Token Validation**: Extracts and validates reset token from URL parameters
- **Password Validation**: Comprehensive client-side password strength validation
- **Password Confirmation**: Ensures both password fields match
- **API Integration**: TanStack Query for secure API calls
- **Error Handling**: Comprehensive error states and user-friendly messages
- **Success State**: Clear confirmation with navigation to login
- **URL Parameter Handling**: Automatic token extraction from query parameters

### 🛡️ Security Features
- **Token-Based Reset**: Secure token validation before allowing password reset
- **Password Strength Requirements**: Enforces strong password policies
- **Input Sanitization**: Proper validation and error handling
- **Expired Token Handling**: Graceful handling of invalid/expired tokens
- **Secure Redirects**: Prevents authenticated users from accessing the page

## File Structure

```
src/pages/auth/reset-password/
├── ResetPassword.page.tsx       # Main page component
├── ResetPassword.hooks.ts       # Custom hooks for form logic
├── ResetPassword.constants.ts   # Constants and messages
├── index.ts                     # Module exports
└── README.md                    # This documentation
```

## Usage Examples

### Basic Usage
```tsx
import { ResetPasswordPage } from './pages/auth/reset-password';

// In your routes
<Route path="/reset-password" element={<ResetPasswordPage />} />
```

### URL with Token
```
https://yourapp.com/reset-password?token=4f8c1b9e2a6d7c3e4f8c1b9e2a6d7c3e
```

### Using the Hook Directly
```tsx
import { useResetPasswordForm } from './pages/auth/reset-password';

function CustomResetPassword() {
  const {
    formData,
    error,
    isLoading,
    isSuccess,
    isValidToken,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  } = useResetPasswordForm();

  if (!isValidToken) {
    return <div>Invalid token</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={formData.newPassword}
        onChange={handleNewPasswordChange}
        placeholder="New Password"
      />
      <input
        type="password"
        value={formData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm Password"
      />
      <button disabled={isLoading}>
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
      {error && <p>{error}</p>}
      {isSuccess && <p>Password reset successfully!</p>}
    </form>
  );
}
```

## Component States

### 1. Invalid Token State
- Error icon and message
- "Request New Reset Link" button
- "Back to Login" link
- Clear explanation of the issue

### 2. Form State
- New password input with visibility toggle
- Confirm password input with visibility toggle
- Password requirements display
- Reset Password button
- Back to Login link
- Error display area

### 3. Loading State
- Disabled form inputs
- Loading button text
- Spinner/loading indicator

### 4. Success State
- Success icon and animation
- Confirmation message
- "Sign In Now" button
- Automatic navigation option

## Password Validation

### Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### Validation Regex
```javascript
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

### Error Messages
- **Empty Password**: "Please enter a new password"
- **Too Short**: "Password must be at least 8 characters long"
- **Weak Password**: "Password must contain uppercase, lowercase, number, and special character"
- **Password Mismatch**: "Passwords do not match"

## Token Handling

### URL Parameter Extraction
The component automatically extracts the token from URL query parameters:
```
/reset-password?token=your-token-here
```

### Token Validation
- Checks if token exists in URL
- Validates token format
- Handles expired/invalid tokens
- Provides appropriate error messages

### Error Scenarios
- **Missing Token**: "Invalid or missing reset token"
- **Invalid Token**: "Invalid or expired reset token"
- **Expired Token**: "This reset link has expired"

## Customization

### Messages
Update `ResetPassword.constants.ts` to customize all text:

```typescript
export const RESET_PASSWORD_MESSAGES = {
  title: 'Custom Title',
  subtitle: 'Custom subtitle text',
  passwordRequirements: 'Custom password requirements',
  // ... other messages
};
```

### Styling
The component uses Tailwind CSS classes. Key styling areas:

- **Container**: `bg-gradient-to-br from-blue-50 via-white to-purple-50`
- **Card**: `rounded-2xl shadow-2xl overflow-hidden bg-white`
- **Button**: `bg-blue-600 hover:bg-blue-700 transition`
- **Success Icon**: `bg-green-100 text-green-600`
- **Error Icon**: `bg-red-100 text-red-600`

### API Configuration
Update the API endpoint in `src/services/authService.ts`:

```typescript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

## Integration with Auth Flow

The reset password page integrates seamlessly with the existing auth system:

1. **Route Protection**: Redirects authenticated users
2. **Token Validation**: Secure token-based authentication
3. **Navigation**: Links back to login and forgot password pages
4. **Error Handling**: Consistent with other auth pages
5. **Styling**: Matches existing auth page design

## Testing

### Manual Testing
1. Navigate to `/reset-password?token=demo-token`
2. Enter new password and confirmation
3. Submit form
4. Verify success state
5. Test various error scenarios

### API Testing
```bash
curl -X 'PUT' \
  'https://70175e4a16c6.ngrok-free.app/api/auth/reset-password' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "4f8c1b9e2a6d7c3e4f8c1b9e2a6d7c3e",
    "newPassword": "NewPassword@123"
  }'
```

### Demo Component
The dashboard includes a demo component with:
- Pre-configured demo token
- Copy URL functionality
- Direct navigation to reset page

## Error Scenarios

- **Missing Token**: "Invalid or missing reset token"
- **Invalid Token**: "Invalid or expired reset token"
- **Empty Password**: "Please enter a new password"
- **Weak Password**: "Password must contain uppercase, lowercase, number, and special character"
- **Password Mismatch**: "Passwords do not match"
- **API Error**: Server error message or generic fallback
- **Network Error**: "An unexpected error occurred"

## Security Considerations

- **Token Expiration**: Handles expired tokens gracefully
- **Password Strength**: Enforces strong password policies
- **Input Validation**: Client and server-side validation
- **Secure Transport**: HTTPS for all API communications
- **No Token Storage**: Token is only used for the reset operation
- **Single Use**: Tokens should be invalidated after successful reset

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order
- **Error Announcements**: Screen reader friendly error messages
- **High Contrast**: Sufficient color contrast ratios
- **Password Visibility**: Toggle for users with visual impairments