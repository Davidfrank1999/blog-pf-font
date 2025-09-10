import { Home, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/posts", label: "Posts", icon: FileText },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 border-r border-border bg-card p-6 flex flex-col shadow-md">
      {/* Branding */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-chart-2">MyBlog</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Control Center
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Button
              key={to}
              asChild
              variant="ghost"
              className={`w-full justify-start rounded-lg no-underline transition-all ${
                isActive
                  ? "bg-chart-2 text-primary-foreground font-semibold shadow"
                  : "hover:bg-chart-2/10 hover:text-chart-2"
              }`}
            >
              <Link to={to} className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        className="mt-auto justify-start text-red-600 hover:bg-red-100 rounded-lg no-underline"
      >
        <LogOut className="mr-2 h-5 w-5" /> Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
