import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CheckCircle2, CheckCircle, AlertTriangle } from "lucide-react";
import { useAuthState } from "../../hooks/useAuth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { ACCEPT_INVITE_MESSAGES, ACCEPT_INVITE_PLACEHOLDERS } from "./Constant";
import { useAcceptInviteForm } from "./AcceptInvite.hooks";

export function AcceptInvitePage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuthState();
  const {
    formData,
    error,
    isLoading,
    isSuccess,
    successMessage,
    isValidToken,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useAcceptInviteForm();

  useEffect(() => {
    if (!isSuccess) return;

    const timeoutId = window.setTimeout(() => {
      navigate("/auth/user", { replace: true });
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [isSuccess, navigate]);

  // Redirect if already authenticated
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log("User already authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex h-full w-full items-center justify-center p-4">
        {/* Center Card */}
        <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden bg-white">
          {/* Left Side - Image */}
          <div className="relative hidden lg:flex w-1/2">
            <img
              src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1600"
              alt="Password security"
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
                  Secure your account with a new password
                </h1>
                <p className="text-base text-gray-200 leading-relaxed">
                  Choose a strong password to keep your account safe and secure.
                  Make sure it's something you'll remember but others can't
                  guess.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {!isValidToken ? (
                <>
                  {/* Invalid Token State */}
                  <div className="text-center">
                    <div className="mx-auto mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Invalid Reset Link
                    </h2>

                    <p className="text-gray-600 mb-8">
                      This password reset link is invalid or has expired. Please
                      request a new one.
                    </p>

                    <div className="space-y-3">
                      <Link
                        to="/auth/forgot-password"
                        className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Request New Reset Link
                      </Link>

                      <Link
                        to="/auth/login"
                        className="block w-full text-center py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Back to login
                      </Link>
                    </div>
                  </div>
                </>
              ) : !isSuccess ? (
                <>
                  {/* Form State */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {ACCEPT_INVITE_MESSAGES.title}
                    </h2>
                    <p className="text-gray-500">
                      {ACCEPT_INVITE_MESSAGES.subtitle}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Error Display */}
                    {error && <Alert variant="error">{error}</Alert>}

                    {/* New Password */}
                    <div className="text-left">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {ACCEPT_INVITE_MESSAGES.newPassword}
                      </label>
                      <div className="relative">
                        <Input
                          type="password"
                          value={formData.newPassword}
                          showPasswordToggle
                          onChange={handleNewPasswordChange}
                          placeholder={ACCEPT_INVITE_PLACEHOLDERS.newPassword}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="text-left">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {ACCEPT_INVITE_MESSAGES.confirmPassword}
                      </label>
                      <div className="relative">
                        <Input
                          showPasswordToggle
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          placeholder={
                            ACCEPT_INVITE_PLACEHOLDERS.confirmPassword
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      {ACCEPT_INVITE_MESSAGES.passwordRequirements}
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full rounded-xl bg-blue-600 py-4 text-white font-bold hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading
                        ? ACCEPT_INVITE_MESSAGES.acceptingInvite
                        : ACCEPT_INVITE_MESSAGES.acceptInvite}
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
                      {ACCEPT_INVITE_MESSAGES.invitationAccepted}
                    </h2>

                    <p className="text-gray-600 mb-8">
                      {successMessage ||
                        ACCEPT_INVITE_MESSAGES.invitationAcceptedSuccess}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
