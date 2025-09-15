import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import CreateBlog from "./components/creatBlog";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./routes/PrivateRoutes";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogView from "./pages/AdminBlogView";
import { AnimatePresence, motion } from "framer-motion";
import UserBlogView from "./pages/UserBlogView";


function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-chart-2 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🔹 Decide where to go if logged in
  const redirectAfterLogin = () => {
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    if (user) return <Navigate to="/dashboard" replace />;
    return <Navigate to="/login" replace />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <Routes location={location} key={location.pathname}>
          {/* Root */}
          <Route path="/" element={redirectAfterLogin()} />

          {/* Login / Signup */}
          <Route
            path="/login"
            element={user ? redirectAfterLogin() : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? redirectAfterLogin() : <SignupPage />}
          />

          {/* User Routes */}
          <Route element={<PrivateRoute />}>
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/creatblog" element={<CreateBlog />} /> */}
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/creatblog" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<UserBlogView />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/blog/:id" element={<AdminBlogView />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
