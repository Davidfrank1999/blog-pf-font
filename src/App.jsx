import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import "./App.css"
import { useAuth } from "./context/AuthContext"
import DashboardPage from "./pages/DashboardPage"
import CreateBlog from "./components/creatBlog"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PrivateRoute from "./routes/PrivateRoutes"
import { AnimatePresence, motion } from "framer-motion"


function App() {
  const { user, loading } = useAuth()
  const location = useLocation()

  // ✅ Prevent flashing login by waiting until auth state is restored
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname} // animate route changes
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <Routes location={location} key={location.pathname}>
          {/* Default route → go to dashboard if logged in, otherwise login */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <SignupPage />}
          />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/creatblog" element={<CreateBlog />} /> */}
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/creatblog" element={<CreateBlog />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default App
