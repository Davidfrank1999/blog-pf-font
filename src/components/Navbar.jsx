import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, User, FileText, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="flex justify-between items-center h-16 border-b border-border px-6 bg-chart-2/80 backdrop-blur-md sticky top-0 z-50">
      {/* Brand */}
      <Link
        to="/"
        className="text-xl font-bold text-primary-foreground hover:opacity-80 transition no-underline"
      >
        MyBlog
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-sm font-medium relative">
        {/* Explore link */}
        <Link
          to="/explore"
          className="text-primary-foreground hover:opacity-80 transition no-underline"
        >
          Explore
        </Link>

        {/* User Dropdown */}
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 text-primary-foreground hover:opacity-80 transition no-underline bg-transparent border-none focus:outline-none"
            >
              <span className="text-sm font-medium">
                {user.name || user.email}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                <Link
                  to="/account"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="h-4 w-4" /> Account Info
                </Link>
                <Link
                  to="/myposts"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileText className="h-4 w-4" /> Posts
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-primary-foreground hover:opacity-80 transition no-underline"
          >
            Login
          </Link>
        )}

        {/* New Blog button */}
        <Link
          to="/creatblog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-chart-3 text-primary-foreground rounded-lg shadow hover:bg-primary/80 transition no-underline"
        >
          <Plus className="h-4 w-4" /> New Blog
        </Link>
      </nav>
    </header>
  );
}
