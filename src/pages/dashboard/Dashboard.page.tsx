import { UserProfile, ForgotPasswordDemo, ResetPasswordDemo } from '../../components/auth'

export function DashboardPage() {
  return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Dashboard</h1>
          
          <div className="mb-6 space-y-4">
            <ForgotPasswordDemo />
            <ResetPasswordDemo />
            <UserProfile />
          </div>
          
          <p className="text-slate-600">Welcome to your dashboard!</p>
        </div>
  )
}