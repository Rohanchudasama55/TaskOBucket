import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { CreateOrganizationPage } from '../pages/CreateOrganizationPage'
import { DashboardPage } from '../pages/DashboardPage'
import { BoardPage } from '../pages/BoardPage'
import { NotFound } from '../pages/NotFound'
import Project from '../pages/Projects'
import Issues from '../pages/Issues'
import Teams from '../pages/Teams/index.tsx'
import Deshbord from '../pages/Dashbord'
import { MainLayout } from '../layouts/MainLayout.tsx'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-organization" element={<CreateOrganizationPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<MainLayout />}>
        <Route path="/Projects" element={<> <Project /> </>} />
        <Route path="/issues" element={<> <Issues /> </>} />
        <Route path="/teams" element={<> <Teams /> </>} />
        <Route path="/dashboard" element={<> <Deshbord /> </>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
