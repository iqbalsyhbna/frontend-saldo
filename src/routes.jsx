import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SaldoList from "./pages/SaldoList";
import SaldoInput from "./pages/SaldoInput";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/saldo" element={<SaldoList />} />
      <Route path="/saldo/input" element={<SaldoInput />} />
      <Route path="/users-crud" element={<UserPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
