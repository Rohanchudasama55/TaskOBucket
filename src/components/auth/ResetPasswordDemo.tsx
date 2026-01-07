import { Link } from 'react-router-dom';
import { Key, Copy } from 'lucide-react';
import { useState } from 'react';

export function ResetPasswordDemo() {
  const [copied, setCopied] = useState(false);
  
  // Demo token for testing
  const demoToken = '4f8c1b9e2a6d7c3e4f8c1b9e2a6d7c3e';
  const resetUrl = `/auth/reset-password?token=${demoToken}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + resetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <Key className="h-5 w-5 text-purple-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-purple-900 mb-1">Test Reset Password</h3>
          <p className="text-xs text-purple-700 mb-2">
            Try the reset password flow with a demo token
          </p>
          <div className="flex items-center gap-2 text-xs">
            <code className="bg-purple-100 px-2 py-1 rounded text-purple-800 font-mono">
              token: {demoToken.substring(0, 16)}...
            </code>
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-purple-200 rounded transition-colors"
              title="Copy reset URL"
            >
              <Copy className="h-3 w-3 text-purple-600" />
            </button>
            {copied && <span className="text-purple-600">Copied!</span>}
          </div>
        </div>
        <Link
          to={resetUrl}
          className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
        >
          Test Now
        </Link>
      </div>
    </div>
  );
}