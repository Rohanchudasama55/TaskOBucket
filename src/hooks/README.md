# Authentication Hook Documentation

## Overview

The `useAuth` hook provides authentication functionality using TanStack Query for API calls and React Context for state management.

## API Endpoint

The authentication service connects to:
```
POST https://70175e4a16c6.ngrok-free.app/api/auth/login
```

## Usage

### 1. Login Hook

```tsx
import { useLogin } from '../hooks/useAuth';

function LoginComponent() {
  const loginMutation = useLogin();

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email: 'user@example.com',
        password: 'Password@123'
      });
      // User will be automatically redirected to /dashboard
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <button 
      onClick={handleLogin}
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

### 2. Auth State Hook

```tsx
import { useAuthState } from '../hooks/useAuth';

function UserComponent() {
  const { user, token, isAuthenticated, isLoading } = useAuthState();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <p>Token: {token?.substring(0, 10)}...</p>
    </div>
  );
}
```

### 3. Logout Hook

```tsx
import { useLogout } from '../hooks/useAuth';

function LogoutComponent() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
    // User will be automatically redirected to /auth/login
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

### 4. Protected Routes

```tsx
import { ProtectedRoute } from '../components/auth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
```

## Features

- ✅ **TanStack Query Integration**: Optimistic updates and caching
- ✅ **Automatic Token Management**: Stores/retrieves from localStorage
- ✅ **Route Protection**: Automatic redirect to login for unauthenticated users
- ✅ **Context State Management**: Global auth state across the app
- ✅ **TypeScript Support**: Full type safety
- ✅ **Error Handling**: Proper error states and messages
- ✅ **Loading States**: Built-in loading indicators

## API Response Format

Expected login response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Components Included

- `ProtectedRoute`: Wraps routes that require authentication
- `LogoutButton`: Pre-built logout button component
- `UserProfile`: Displays user info with logout functionality

## Configuration

Update the API base URL in `src/services/authService.ts`:
```typescript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

## Error Handling

The hook automatically handles:
- Network errors
- Invalid credentials
- Token expiration
- API response errors

All errors are properly typed and can be caught in your components.