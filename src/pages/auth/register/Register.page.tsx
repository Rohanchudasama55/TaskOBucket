import React, { useState } from "react";
import { Star, CheckCircle, EyeOff, Eye } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
  PREVIEW_USERS,
  TASKS,
  REGISTER_LABELS,
  REGISTER_PLACEHOLDERS,
  REGISTER_MESSAGES,
} from "./Register.constants";
import { useRegisterForm } from "./Register.hooks";

const RegisterPage: React.FC = () => {
  const {
    formData,
    acceptTerms,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
  } = useRegisterForm();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex justify-center items-center">
      <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center px-20 relative">
          <div className="max-w-xl space-y-8">
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
              Start managing projects{" "}
              <span className="text-blue-600">better today</span>
            </h1>

            <p className="text-lg text-gray-600">
              Join thousands of high-performing teams using ProjectFlow to ship
              faster.
            </p>

            {/* PRODUCT CARD */}
            <div className="relative mt-10">
              <div className="absolute -inset-6 bg-blue-200/40 blur-2xl rounded-3xl" />

              <div className="relative bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex gap-4 mb-6">
                  {PREVIEW_USERS.map((u) => (
                    <div key={u.name} className="text-center">
                      <img
                        src={u.img}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                      <p className="text-xs mt-1 text-gray-500">{u.name}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {TASKS.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <span className={`w-3 h-3 rounded-full ${t.color}`} />
                      <span className="flex-1 text-sm">{t.label}</span>
                      <img
                        src={PREVIEW_USERS[t.user].img}
                        className="w-6 h-6 rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <CheckCircle className="text-green-500" />
              <span className="font-medium text-gray-800">
                Boost productivity by 35%
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                Trusted by 2,000+ teams
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center px-6 lg:px-16">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-3xl shadow-2xl p-10 border">
              <h2 className="text-3xl font-bold mb-2">
                {REGISTER_MESSAGES.title}
              </h2>
              <p className="text-gray-600 mb-8">{REGISTER_MESSAGES.subtitle}</p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium">
                    {REGISTER_LABELS.fullName}
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-2 w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    placeholder={REGISTER_PLACEHOLDERS.fullName}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    {REGISTER_LABELS.companyName}
                  </label>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-2 w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    placeholder={REGISTER_PLACEHOLDERS.companyName}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    {REGISTER_LABELS.email}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    placeholder={REGISTER_PLACEHOLDERS.email}
                  />
                </div>

                <div className="w-full">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
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

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={handleTermsChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-600"
                  >
                    {REGISTER_MESSAGES.agreeToTerms}{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {REGISTER_MESSAGES.termsOfService}
                    </span>{" "}
                    {REGISTER_MESSAGES.and}{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {REGISTER_MESSAGES.privacyPolicy}
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={!acceptTerms || isLoading}
                  className="w-full h-12 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading
                    ? REGISTER_MESSAGES.creatingAccount
                    : REGISTER_MESSAGES.createAccount}
                </Button>
              </form>

              <p className="text-center text-sm mt-6 text-gray-600">
                {REGISTER_MESSAGES.alreadyHaveAccount}{" "}
                <span className="text-blue-600 font-medium cursor-pointer">
                  {REGISTER_MESSAGES.logIn}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { RegisterPage };
