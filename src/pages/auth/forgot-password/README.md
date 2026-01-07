# Forgot Password Page Documentation

## Overview

The Forgot Password page provides a secure way for users to reset their passwords by sending a reset link to their email address.

## API Integration

**Endpoint:** `POST https://70175e4a16c6.ngrok-free.app/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password reset link sent successfully"
}
```

## Features

### 🎨 UI/UX Features
- **Consistent Design**: Matches login/register page styling
- **Two-State Interface**: Form state and success state
- **Visual Feedback**: Success animation with checkmark icon
- **Responsive Layout**: Works on all screen sizes
- **Accessibility**: Proper labels and keyboard navigation

### 🔧 Functional Features
- **Email Validation**: Client-side email format validation
- **API Integration**: TanStack Query for API calls
- **Error Handling**: Comprehensive error states and messages
- **Success State**: Clear confirmation with sent email display
- **Navigation**: Easy return to login page
- **Form Reset**: Ability to try again with different email

### 🛡️ Security Features
- **Input Sanitization**: Proper email validation
- **Error Messages**: Generic messages to prevent email enumeration
- **Rate Limiting**: Handled by backend API
- **Secure Redirects**: Prevents authenticated users from accessing

## File Structure

```
src/pages/auth/forgot-password/
├── ForgotPassword.page.tsx      # Main page component
├── ForgotPassword.hooks.ts      # Custom hooks for form logic
├── ForgotPassword.constants.ts  # Constants and messages
├── index.ts                     # Module exports
└── README.md                    # This documentation
```

## Usage Examples

### Basic Usage
```tsx
import { ForgotPasswordPage } from './pages/auth/forgot-password';

// In your routes
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
```

### Using the Hook Directly
```tsx
import { useForgotPasswordForm } from './pages/auth/forgot-password';

function CustomForgotPassword() {
  const {
    formData,
    error,
    isLoading,
    isSuccess,
    handleEmailChange,
    handleSubmit
  } = useForgotPasswordForm();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={handleEmailChange}
      />
      <button disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>
      {error && <p>{error}</p>}
      {isSuccess && <p>Check your email!</p>}
    </form>
  );
}
```

## Component States

### 1. Initial Form State
- Email input field
- Send Reset Link button
- Back to Login link
- Error display area

### 2. Loading State
- Disabled form inputs
- Loading button text
- Spinner/loading indicator

### 3. Success State
- Success icon and animation
- Confirmation message
- Email address display
- Try Again button
- Back to Login link

### 4. Error State
- Error message display
- Form remains interactive
- Clear error on input change

## Customization

### Messages
Update `ForgotPassword.constants.ts` to customize all text:

```typescript
export const FORGOT_PASSWORD_MESSAGES = {
  title: 'Custom Title',
  subtitle: 'Custom subtitle text',
  // ... other messages
};
```

### Styling
The component uses Tailwind CSS classes. Key styling areas:

- **Container**: `bg-gradient-to-br from-blue-50 via-white to-purple-50`
- **Card**: `rounded-2xl shadow-2xl overflow-hidden bg-white`
- **Button**: `bg-blue-600 hover:bg-blue-700 transition`
- **Success Icon**: `bg-green-100 text-green-600`

### API Configuration
Update the API endpoint in `src/services/authService.ts`:

```typescript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

## Integration with Auth Flow

The forgot password page integrates seamlessly with the existing auth system:

1. **Route Protection**: Redirects authenticated users
2. **Navigation**: Links back to login page
3. **Error Handling**: Consistent with login/register pages
4. **Styling**: Matches existing auth page design

## Testing

### Manual Testing
1. Navigate to `/forgot-password`
2. Enter valid email address
3. Submit form
4. Verify success state
5. Test error scenarios

### API Testing
```bash
curl -X 'POST' \
  'https://70175e4a16c6.ngrok-free.app/api/auth/forgot-password' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"email": "test@example.com"}'
```

## Error Scenarios

- **Empty Email**: "Please enter your email address"
- **Invalid Email**: "Please enter a valid email address"
- **API Error**: Server error message or generic fallback
- **Network Error**: "An unexpected error occurred"

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order
- **Error Announcements**: Screen reader friendly error messages
- **High Contrast**: Sufficient color contrast ratios