import { Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center h-16 border-b border-border px-6 bg-chart-2/80 backdrop-blur-md sticky top-0 z-50">
      {/* Brand */}
      <a
        href="/"
        className="text-xl font-bold text-primary-foreground hover:opacity-80 transition no-underline"
      >
        MyBlog
      </a>

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        <a
          href="/explore"
          className="text-primary-foreground hover:opacity-80 transition no-underline"
        >
          Explore
        </a>
        <a
          href="/user"
          className="text-primary-foreground hover:opacity-80 transition no-underline"
        >
          Dashboard
        </a>

        {/* New Blog button */}
        <a
          href="/creatblog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-chart-3 text-primary-foreground rounded-lg shadow hover:bg-primary/80 transition no-underline"
        >
          <Plus className="h-4 w-4" /> New Blog
        </a>
      </nav>
    </header>
  );
}
