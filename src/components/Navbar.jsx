// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header className="flex justify-between items-center h-16 border-b border-border px-6 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <a href="/" className="text-xl font-bold text-primary hover:opacity-80 transition">
        MyBlog
      </a>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <a href="/explore" className="text-muted-foreground hover:text-foreground transition">
          Explore
        </a>
        <a href="/user" className="text-muted-foreground hover:text-foreground transition">
          Dashboard
        </a>
        <a
          href="/creatblog"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/80 transition"
        >
          New Blog
        </a>
      </nav>
    </header>
  )
}
