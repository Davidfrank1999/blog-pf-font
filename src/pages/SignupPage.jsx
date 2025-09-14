import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const ok = await signup({ name, email, password }); // ✅ send object
      if (ok) {
        setSuccess("✅ Signup successful! Please login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("❌ Signup failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Signup failed:", err);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border border-border overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary">Create Account</h1>
        <p className="text-muted-foreground text-center mb-6">
          Sign up to start your blogging journey 🚀
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 text-sm p-2 rounded-md mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-border rounded-lg h-11 px-3 bg-background text-foreground focus:ring-2 focus:ring-chart-2"
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-chart-2 font-medium hover:opacity-80">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
