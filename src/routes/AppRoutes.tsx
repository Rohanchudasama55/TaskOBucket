<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  BoardPage,
  IssuesPage,
  CreateOrganizationPage,
  NotFoundPage,
  TeamsMember,
} from "../pages";
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { 
  LoginPage, 
  RegisterPage, 
  ForgotPasswordPage,
  ResetPasswordPage,
  DashboardPage, 
  BoardPage, 
  IssuesPage, 
  TeamsPage, 
  CreateOrganizationPage, 
  NotFoundPage 
} from '../pages'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { MainLayout } from '../layouts/MainLayout'
>>>>>>> cc51885918e2d8b038fc4c58f45561fe27fb59e2

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/auth/register" element={<RegisterPage />} />

        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<RegisterPage />} />
<<<<<<< HEAD
        <Route
          path="/create-organization"
          element={<CreateOrganizationPage />}
        />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/projects" element={<BoardPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/teams" element={<TeamsMember />} />
        <Route path="/dashboard" element={<DashboardPage />} />
=======

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
             <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/board" element={
          <ProtectedRoute>
             <MainLayout>
               <BoardPage />
             </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/projects" element={
          <ProtectedRoute>
             <MainLayout>
               <BoardPage />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/issues" element={
          <ProtectedRoute>
             <MainLayout>
              <IssuesPage />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/teams" element={
          <ProtectedRoute>
            <MainLayout>
              <TeamsPage />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/create-organization" element={
          <ProtectedRoute>
              <CreateOrganizationPage />
          </ProtectedRoute>
        } />
        
        {/* 404 */}
>>>>>>> cc51885918e2d8b038fc4c58f45561fe27fb59e2
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
