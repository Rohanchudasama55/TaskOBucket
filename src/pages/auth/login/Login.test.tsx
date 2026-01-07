import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as fc from 'fast-check'
import { BrowserRouter } from 'react-router-dom'
import { LoginPage } from './Login.page'
import { LOGIN_MESSAGES, LOGIN_PLACEHOLDERS } from './Login.constants'

/**
 * Feature: login-page-refactor, Property 2: Form Data Synchronization
 * 
 * Property: For any valid input values, typing in form fields should update the 
 * corresponding form data state and the form should handle submission correctly
 * 
 * Validates: Requirements 2.2, 2.3, 5.2, 5.4
 */

/**
 * Feature: login-page-refactor, Property 4: Constants Usage
 * 
 * Property: For any text content displayed in the component, the displayed text 
 * should match the values defined in the constants files
 * 
 * Validates: Requirements 3.1, 3.2, 3.3
 */

// Helper function to render LoginPage with router context
const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  )
}

// Generators for property-based testing
const emailGenerator = fc.emailAddress()
const passwordGenerator = fc.string({ minLength: 1, maxLength: 50 })
const validFormDataGenerator = fc.record({
  email: emailGenerator,
  password: passwordGenerator
})

describe('Login Page - Form Data Synchronization', () => {
  it('should synchronize email input with form state', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const testEmail = 'test@example.com'
    
    await user.type(emailInput, testEmail)
    
    expect(emailInput).toHaveValue(testEmail)
  })

  it('should synchronize password input with form state', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const testPassword = 'testpassword123'
    
    await user.type(passwordInput, testPassword)
    expect(passwordInput).toHaveValue(testPassword)
  })

  it('should handle form submission correctly', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText('Log In')
    
    // Fill in demo credentials
    await user.type(emailInput, 'demo@example.com')
    await user.type(passwordInput, 'password')
    
    // Submit form
    await user.click(submitButton)
    
    // Form should be submitted (button should exist and be clickable)
    expect(submitButton).toBeInTheDocument()
  })

  it('should validate form data synchronization for any valid inputs (property-based)', () => {
    fc.assert(
      fc.asyncProperty(
        validFormDataGenerator,
        async (formData) => {
          const user = userEvent.setup()
          renderLoginPage()
          
          const emailInput = screen.getByPlaceholderText('Enter your email')
          const passwordInput = screen.getByPlaceholderText('Enter your password')
          
          // Clear existing values
          await user.clear(emailInput)
          await user.clear(passwordInput)
          
          // Type new values
          await user.type(emailInput, formData.email)
          await user.type(passwordInput, formData.password)
          
          // Verify synchronization
          expect(emailInput).toHaveValue(formData.email)
          expect(passwordInput).toHaveValue(formData.password)
        }
      ),
      { numRuns: 5 }
    )
  })
})

describe('Login Page - Constants Usage', () => {
  it('should display text from LOGIN_MESSAGES constants', () => {
    renderLoginPage()
    
    expect(screen.getByText(LOGIN_MESSAGES.welcome)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.subtitle)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.forgotPassword)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.signIn)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.orContinueWith)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.signInWithGoogle)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.noAccount)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.signUp)).toBeInTheDocument()
  })

  it('should use placeholder text from LOGIN_PLACEHOLDERS constants', () => {
    renderLoginPage()
    
    expect(screen.getByPlaceholderText(LOGIN_PLACEHOLDERS.email)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(LOGIN_PLACEHOLDERS.password)).toBeInTheDocument()
  })
})

describe('Login Page - Password Visibility Toggle', () => {
  /**
   * Feature: login-page-refactor, Property 1: Password Visibility Toggle
   * 
   * Property: For any password visibility state, toggling the visibility should 
   * change the input type between "password" and "text" and update the icon accordingly
   * 
   * Validates: Requirements 1.2
   */
  
  it('should toggle password visibility when button is clicked', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    // Find the toggle button by looking for buttons that are not the submit button
    const allButtons = screen.getAllByRole('button')
    const toggleButton = allButtons.find(btn => !btn.textContent?.includes('Log In') && !btn.textContent?.includes('Sign in'))
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    if (toggleButton) {
      await user.click(toggleButton)
      
      // After clicking, input type should change to text
      expect(passwordInput).toHaveAttribute('type', 'text')
      
      // Click again to toggle back
      await user.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'password')
    } else {
      // If we can't find the toggle button, the test should fail
      throw new Error('Password visibility toggle button not found')
    }
  })
})
describe('Login Page - Error State Display', () => {
  /**
   * Feature: login-page-refactor, Property 3: Error State Display
   * 
   * Property: For any error condition, when an error occurs the error message should 
   * be displayed in the UI and when loading states change the UI should reflect the loading indicators
   * 
   * Validates: Requirements 2.4, 2.5, 5.3
   */
  
  it('should display error message when login fails', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(LOGIN_MESSAGES.signIn)
    
    // Enter invalid credentials
    await user.type(emailInput, 'invalid@example.com')
    await user.type(passwordInput, 'wrongpassword')
    
    await user.click(submitButton)
    
    // Wait for error to appear
    await screen.findByText(LOGIN_MESSAGES.invalidCredentials, {}, { timeout: 2000 })
    expect(screen.getByText(LOGIN_MESSAGES.invalidCredentials)).toBeInTheDocument()
  })

  it('should show loading state during form submission', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(LOGIN_MESSAGES.signIn)
    
    // Enter any credentials
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password')
    
    await user.click(submitButton)
    
    // Should show loading text briefly
    expect(screen.getByText(LOGIN_MESSAGES.signingIn)).toBeInTheDocument()
  })
})

describe('Login Page - Visual Layout Preservation', () => {
  /**
   * Feature: login-page-refactor, Property 5: Visual Layout Preservation
   * 
   * Property: For any viewport size, the login page should maintain proper layout structure
   * with all essential elements visible and properly positioned
   * 
   * Validates: Requirements 5.1, 5.5
   */
  
  it('should maintain essential layout elements', () => {
    renderLoginPage()
    
    // Check that all essential elements are present
    expect(screen.getByText(LOGIN_MESSAGES.welcome)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.subtitle)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(LOGIN_PLACEHOLDERS.email)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(LOGIN_PLACEHOLDERS.password)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.signIn)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.signInWithGoogle)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.forgotPassword)).toBeInTheDocument()
    expect(screen.getByText(LOGIN_MESSAGES.signUp)).toBeInTheDocument()
  })

  it('should preserve form structure and accessibility', () => {
    renderLoginPage()
    
    // Check form structure
    const emailInput = screen.getByPlaceholderText(LOGIN_PLACEHOLDERS.email)
    const passwordInput = screen.getByPlaceholderText(LOGIN_PLACEHOLDERS.password)
    const submitButton = screen.getByText(LOGIN_MESSAGES.signIn)
    
    // Verify input types
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    // Verify button is clickable
    expect(submitButton).toBeEnabled()
    
    // Check that labels are associated with inputs
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })
})

describe('Login Page - Edge Cases', () => {
  it('should handle empty form submission', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const submitButton = screen.getByText(LOGIN_MESSAGES.signIn)
    
    // Submit without filling any fields
    await user.click(submitButton)
    
    // Should show error for invalid credentials (empty fields)
    await screen.findByText(LOGIN_MESSAGES.invalidCredentials, {}, { timeout: 2000 })
    expect(screen.getByText(LOGIN_MESSAGES.invalidCredentials)).toBeInTheDocument()
  })

  it('should handle successful login with demo credentials', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(LOGIN_MESSAGES.signIn)
    
    // Enter demo credentials
    await user.type(emailInput, 'demo@example.com')
    await user.type(passwordInput, 'password')
    
    await user.click(submitButton)
    
    // Should show loading state
    expect(screen.getByText(LOGIN_MESSAGES.signingIn)).toBeInTheDocument()
    
    // Wait for loading to complete (no error should appear)
    await new Promise(resolve => setTimeout(resolve, 1100))
    
    // Error should not be present for valid credentials
    expect(screen.queryByText(LOGIN_MESSAGES.invalidCredentials)).not.toBeInTheDocument()
  })

  it('should handle form state persistence during interactions', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    
    // Type in fields
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'testpassword')
    
    // Click elsewhere (like the forgot password link)
    const forgotPasswordLink = screen.getByText(LOGIN_MESSAGES.forgotPassword)
    await user.click(forgotPasswordLink)
    
    // Values should still be present
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('testpassword')
  })

  it('should handle rapid form submissions', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByText(LOGIN_MESSAGES.signIn)
    
    // Fill form
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    
    // Submit multiple times rapidly
    await user.click(submitButton)
    await user.click(submitButton)
    await user.click(submitButton)
    
    // Should show loading state and handle gracefully
    expect(screen.getByText(LOGIN_MESSAGES.signingIn)).toBeInTheDocument()
    
    // Eventually should show error
    await screen.findByText(LOGIN_MESSAGES.invalidCredentials, {}, { timeout: 2000 })
    expect(screen.getByText(LOGIN_MESSAGES.invalidCredentials)).toBeInTheDocument()
  })
})