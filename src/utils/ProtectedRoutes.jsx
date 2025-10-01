import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // jangan langsung redirect

  if (!user) return <Navigate to="/login" />;

  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
}
