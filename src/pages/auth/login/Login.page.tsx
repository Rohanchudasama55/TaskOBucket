import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import { useLoginForm } from './Login.hooks'
import { useAuthState } from '../../../hooks/useAuth'
import { LOGIN_MESSAGES, LOGIN_PLACEHOLDERS } from './Login.constants'

export function LoginPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthState();
  const {
    formData,
    error,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useLoginForm()
  const [showPassword, setShowPassword] = useState(false)

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
  <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
       <div className="flex h-full w-full items-center justify-center p-4">
         {/* Center Card */}
         <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden bg-white">
           {/* Left Side - Image */}
           <div className="relative hidden lg:flex w-1/2">
             <img
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600"
               alt="Team collaboration"
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
                   Manage projects effortlessly
                 </h1>
                 <p className="text-base text-gray-200 leading-relaxed">
                   Join 10,000+ teams shipping faster with ProjectFlow.
                   Streamline your workflow, collaborate in real-time, and hit
                   every deadline.
                 </p>
               </div>
             </div>
           </div>
 
           {/* Right Side - Form */}
           <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-12">
             <div className="w-full max-w-md">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">
                 {LOGIN_MESSAGES.welcome}
               </h2>
               <p className="text-gray-500 mb-8">
                 {LOGIN_MESSAGES.subtitle}
               </p>
 
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
                     placeholder={LOGIN_PLACEHOLDERS.email}
                     className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                   />
                 </div>
 
                 {/* Password */}
                 <div>
                   <div className="flex justify-between mb-2">
                     <label className="text-sm font-semibold text-gray-700">
                       Password
                     </label>
                     <Link
                       to="/auth/forgot-password"
                       className="text-sm font-semibold text-blue-600 hover:underline"
                     >
                       {LOGIN_MESSAGES.forgotPassword}
                     </Link>
                   </div>
                   <div className="relative">
                     <Input
                       type="password"                                                                 
                       value={formData.password}
                       showPasswordToggle
                       onChange={handlePasswordChange}
                       placeholder={LOGIN_PLACEHOLDERS.password}
                       className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                     />
                   </div>
                 </div>
 
                 {/* Login Button */}
                 <Button
                   onClick={handleSubmit}
                   disabled={isLoading}
                   className="w-full rounded-xl bg-blue-600 py-4 text-white font-bold hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isLoading ? LOGIN_MESSAGES.signingIn : LOGIN_MESSAGES.signIn}
                 </Button>
 
                 {/* Divider */}
                 <div className="flex items-center my-6">
                   <div className="flex-1 border-t border-gray-200" />
                   <span className="px-4 text-xs font-bold text-gray-400 uppercase">
                     {LOGIN_MESSAGES.orContinueWith}
                   </span>
                   <div className="flex-1 border-t border-gray-200" />
                 </div>
 
                 {/*
                 <a
                   href="/auth/google"
                   className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 hover:bg-gray-50 transition"
                 >
                   <img
                     src="https://www.svgrepo.com/show/475656/google-color.svg"
                     alt="Google"
                     className="h-5 w-5"
                   />
                   <span className="text-sm font-semibold text-gray-700">
                     {LOGIN_MESSAGES.signInWithGoogle}
                   </span>
                 </a> */}
               </div>
 
               <p className="mt-8 text-center text-sm text-gray-500">
                 {LOGIN_MESSAGES.noAccount}{" "}
                 <Link
                   to="/signup"
                   className="font-bold text-blue-600 hover:underline"
                 >
                   {LOGIN_MESSAGES.signUp}
                 </Link>
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
  )
}