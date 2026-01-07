import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { CreateOrganizationPage } from "../pages/CreateOrganizationPage";
import { DashboardPage } from "../pages/DashboardPage";
import { BoardPage } from "../pages/BoardPage";
import { NotFound } from "../pages/NotFound";
import SignupPage from "../pages/SignupPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/create-organization"
          element={<CreateOrganizationPage />}
        />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
