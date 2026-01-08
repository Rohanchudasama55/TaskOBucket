import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  BoardPage,
  IssuesPage,
  CreateOrganizationPage,
  NotFoundPage,
} from "../pages";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import { ForgotPasswordPage, ResetPasswordPage } from "../pages/auth";
import TeamsPage from "../pages/team/Teams.page";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/auth/register" element={<RegisterPage />} />

        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<RegisterPage />} /> */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />

            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/board" element={<BoardPage />} />

            <Route path="/projects" element={<BoardPage />} />

            <Route path="/issues" element={<IssuesPage />} />

            <Route path="/teams" element={<TeamsPage />} />
          </Route>
          <Route
            path="/auth/create-organization"
            element={<CreateOrganizationPage />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
