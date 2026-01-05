interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left */}
      <div className="relative hidden lg:block">
        <img
          src="/auth-bg.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold">
            Manage projects effortlessly
          </h2>
          <p className="mt-2 max-w-md text-sm opacity-90">
            Join 10,000+ teams shipping faster with ProjectFlow.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
