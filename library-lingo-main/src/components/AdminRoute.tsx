import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || userRole !== "admin") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};