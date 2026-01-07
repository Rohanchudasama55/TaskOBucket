import { Link, Navigate } from 'react-router-dom'
import { CheckCircle2, ArrowLeft, CheckCircle } from 'lucide-react'
import { AuthLayout } from '../../../layouts/AuthLayout'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import { useForgotPasswordForm } from './ForgotPassword.hooks'
import { useAuthState } from '../../../hooks/useAuth'
import { FORGOT_PASSWORD_MESSAGES, FORGOT_PASSWORD_PLACEHOLDERS } from './ForgotPassword.constants'

export function ForgotPasswordPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthState();
  const {
    formData,
    error,
    isLoading,
    isSuccess,
    successMessage,
    handleEmailChange,
    handleSubmit,
    resetForm
  } = useForgotPasswordForm()

  // Redirect if already authenticated
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('User already authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex h-full w-full items-center justify-center p-4">
          {/* Center Card */}
          <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden bg-white">
            {/* Left Side - Image */}
            <div className="relative hidden lg:flex w-1/2">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600"
                alt="Password reset"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/55" />

              <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>

                <div className="max-w-md">
                  <h1 className="text-4xl font-extrabold leading-tight mb-4">
                    Reset your password securely
                  </h1>
                  <p className="text-base text-gray-200 leading-relaxed">
                    Don't worry, it happens to the best of us. Enter your email 
                    and we'll send you a link to reset your password.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md">
                {!isSuccess ? (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <Link
                        to="/auth/login"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {FORGOT_PASSWORD_MESSAGES.backToLogin}
                      </Link>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {FORGOT_PASSWORD_MESSAGES.title}
                      </h2>
                      <p className="text-gray-500">
                        {FORGOT_PASSWORD_MESSAGES.subtitle}
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Error Display */}
                      {error && (
                        <Alert variant="error">
                          {error}
                        </Alert>
                      )}

                      {/* Email */}
                      <div className="text-left">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                          placeholder={FORGOT_PASSWORD_PLACEHOLDERS.email}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full rounded-xl bg-blue-600 py-4 text-white font-bold hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? FORGOT_PASSWORD_MESSAGES.sendingResetLink : FORGOT_PASSWORD_MESSAGES.sendResetLink}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Success State */}
                    <div className="text-center">
                      <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {FORGOT_PASSWORD_MESSAGES.checkEmail}
                      </h2>
                      
                      <p className="text-gray-600 mb-2">
                        {successMessage || FORGOT_PASSWORD_MESSAGES.resetLinkSent}
                      </p>
                      
                      <p className="text-sm text-gray-500 mb-8">
                        Sent to: <span className="font-medium text-gray-700">{formData.email}</span>
                      </p>

                      <div className="space-y-3">
                        <Button
                          onClick={resetForm}
                          className="w-full rounded-xl bg-gray-100 py-3 text-gray-700 font-semibold hover:bg-gray-200 transition"
                        >
                          {FORGOT_PASSWORD_MESSAGES.tryAgain}
                        </Button>
                        
                        <Link
                          to="/auth/login"
                          className="block w-full text-center py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                          {FORGOT_PASSWORD_MESSAGES.backToLogin}
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {/* Footer */}
                {!isSuccess && (
                  <p className="mt-8 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <Link
                      to="/auth/login"
                      className="font-bold text-blue-600 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}