import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-chart-2 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but not admin → redirect to dashboard
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Admin → allow access
  return <Outlet />;
};

export default AdminRoute;
