import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

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
                Welcome back
              </h2>
              <p className="text-gray-500 mb-8">
                Enter your details to access your workspace.
              </p>

              <div className="space-y-5">
                {/* Email */}
                <div className="text-left">
                  <Input
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                  />
                </div>

                {/* Password */}
                <div className="w-full">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Input wrapper */}
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="
        w-full
        rounded-lg
        border border-gray-200
        bg-gray-50
        px-4 py-3
        pr-12
        text-sm
        text-gray-900
        placeholder-gray-400
        focus:bg-white
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100
        focus:outline-none
        transition
      "
                    />

                    {/* Show / Hide button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        hover:text-gray-600
        focus:outline-none
      "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full rounded-xl bg-blue-600 py-4 text-white font-bold hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-600/30"
                >
                  Log In
                </Button>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-200" />
                  <span className="px-4 text-xs font-bold text-gray-400 uppercase">
                    Or continue with
                  </span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>

                {/* Google */}
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
                    Sign in with Google
                  </span>
                </a>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
