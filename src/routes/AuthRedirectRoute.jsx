import { AuthContext} from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


const AuthRedirectRoute = () => {
  const { user, loading } =useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthRedirectRoute;
