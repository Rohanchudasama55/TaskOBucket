import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export function ForgotPasswordDemo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-blue-600" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900">Test Forgot Password</h3>
          <p className="text-xs text-blue-700">
            Try the forgot password flow with any email address
          </p>
        </div>
        <Link
          to="/auth/forgot-password"
          className="ml-auto px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
        >
          Test Now
        </Link>
      </div>
    </div>
  );
}