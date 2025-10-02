import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const ok = await login({ email, password }); // ✅ ensure object sent
      if (ok) {
        navigate("/dashboard");
      } else {
        setError("❌ Invalid email or password");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border border-border overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary">MyBlog</h1>
        <p className="text-muted-foreground text-center mb-6">
          Sign in to continue to your dashboard
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-border rounded-lg h-11 px-3 bg-background text-foreground focus:ring-2 focus:ring-chart-2"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-border rounded-lg h-11 px-3 bg-background text-foreground focus:ring-2 focus:ring-chart-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-chart-2 text-primary-foreground py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-chart-2 font-medium hover:opacity-80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
