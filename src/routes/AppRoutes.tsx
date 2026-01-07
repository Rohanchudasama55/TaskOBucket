import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { 
  LoginPage, 
  RegisterPage, 
  DashboardPage, 
  BoardPage, 
  IssuesPage, 
  TeamsPage, 
  CreateOrganizationPage, 
  NotFoundPage 
} from '../pages'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/create-organization" element={<CreateOrganizationPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/projects" element={<BoardPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
