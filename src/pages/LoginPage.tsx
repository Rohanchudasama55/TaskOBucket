import { useState } from "react";
import { RegisterForm } from "../features/auth/RegisterForm";
import LoginForm from "../features/auth/LoginForm";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return <section>{isLogin ? <LoginForm /> : <RegisterForm />}</section>;
}
